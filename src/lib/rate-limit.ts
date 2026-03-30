/**
 * Rate limiting with Upstash Redis (production) or in-memory fallback (dev).
 *
 * Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your Vercel
 * environment to enable Redis-backed rate limiting that persists across
 * serverless cold starts.
 */

type RateLimitResult = { success: boolean }

// ---------- In-memory fallback (dev / missing env vars) ----------
const memoryStore = new Map<string, { count: number; resetTime: number }>()

function memoryRateLimit(
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()
  const entry = memoryStore.get(key)

  if (entry && now < entry.resetTime) {
    if (entry.count >= max) return { success: false }
    entry.count++
    return { success: true }
  }

  memoryStore.set(key, { count: 1, resetTime: now + windowMs })

  // Periodic cleanup
  if (memoryStore.size > 10000) {
    memoryStore.forEach((v, k) => {
      if (now > v.resetTime) memoryStore.delete(k)
    })
  }

  return { success: true }
}

// ---------- Upstash Redis ----------
let redisRateLimiter: {
  limit: (key: string, opts: { max: number; window: string }) => Promise<RateLimitResult>
} | null = null
let redisInitAttempted = false

async function getRedisLimiter() {
  if (redisInitAttempted) return redisRateLimiter
  redisInitAttempted = true

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  try {
    const { Redis } = await import('@upstash/redis')
    const { Ratelimit } = await import('@upstash/ratelimit')
    const redis = new Redis({ url, token })

    // We create a generic wrapper that creates rate limiters on the fly
    redisRateLimiter = {
      async limit(key: string, opts: { max: number; window: string }) {
        const limiter = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(opts.max, opts.window as Parameters<typeof Ratelimit.slidingWindow>[1]),
          prefix: 'snapops_rl',
        })
        const result = await limiter.limit(key)
        return { success: result.success }
      },
    }
    return redisRateLimiter
  } catch {
    return null
  }
}

function msToWindow(ms: number): string {
  if (ms >= 3600000) return `${Math.round(ms / 3600000)} h`
  if (ms >= 60000) return `${Math.round(ms / 60000)} m`
  return `${Math.round(ms / 1000)} s`
}

/**
 * Rate limit a request by key.
 * Uses Upstash Redis if configured, otherwise falls back to in-memory.
 */
export async function rateLimit(
  key: string,
  max: number,
  windowMs: number
): Promise<RateLimitResult> {
  const redis = await getRedisLimiter()
  if (redis) {
    return redis.limit(key, { max, window: msToWindow(windowMs) })
  }
  return memoryRateLimit(key, max, windowMs)
}
