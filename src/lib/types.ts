export interface SOP {
  id: string
  user_id: string
  title: string
  content: string
  raw_input: string
  industry: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  email: string
  plan: 'free' | 'pro' | 'business'
  sops_this_month: number
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
}
