import Stripe from 'stripe'

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    maxNetworkRetries: 3,
  })
}

export const PLANS = {
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    name: 'Pro',
    price: 19,
  },
  business: {
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
    name: 'Business',
    price: 49,
  },
} as const
