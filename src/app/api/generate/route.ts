import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateSOP } from '@/lib/anthropic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const FREE_LIMIT = 5

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ).auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, sops_this_month')
      .eq('id', user.id)
      .single()

    if (profile?.plan === 'free' && (profile?.sops_this_month ?? 0) >= FREE_LIMIT) {
      return NextResponse.json({
        error: 'Monthly limit reached. Upgrade to Pro for unlimited SOPs.',
        upgrade: true,
      }, { status: 429 })
    }

    const { input, industry } = await req.json()
    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 })
    }

    if (input.length > 10000) {
      return NextResponse.json({ error: 'Input too long (max 10,000 characters)' }, { status: 400 })
    }

    const content = await generateSOP(input, industry)

    const titleMatch = content.match(/\*\*Title\*\*:\s*(.+?)(?:\n|$)/) ||
                       content.match(/^#\s+(.+?)(?:\n|$)/m)
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled SOP'

    const { data: sop, error: insertError } = await supabase
      .from('sops')
      .insert({
        user_id: user.id,
        title,
        content,
        raw_input: input,
        industry: industry || null,
        tags: [],
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save SOP' }, { status: 500 })
    }

    await supabase
      .from('profiles')
      .update({ sops_this_month: (profile?.sops_this_month ?? 0) + 1 })
      .eq('id', user.id)

    return NextResponse.json({ sop })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json({ error: 'Failed to generate SOP' }, { status: 500 })
  }
}
