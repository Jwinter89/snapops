-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  plan text not null default 'free' check (plan in ('free', 'pro', 'business')),
  sops_this_month integer not null default 0,
  stripe_customer_id text,
  stripe_subscription_id text,
  email_opt_out boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- SOPs table
create table if not exists public.sops (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  raw_input text not null,
  industry text,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Newsletter subscribers
create table if not exists public.newsletter (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  source text default 'website',
  unsubscribed boolean not null default false,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists sops_user_id_idx on public.sops(user_id);
create index if not exists sops_created_at_idx on public.sops(created_at desc);
create index if not exists sops_industry_idx on public.sops(industry);

-- RLS
alter table public.profiles enable row level security;
alter table public.sops enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- SOPs: users can CRUD their own SOPs
create policy "Users can view own SOPs" on public.sops
  for select using (auth.uid() = user_id);
create policy "Users can create SOPs" on public.sops
  for insert with check (auth.uid() = user_id);
create policy "Users can update own SOPs" on public.sops
  for update using (auth.uid() = user_id);
create policy "Users can delete own SOPs" on public.sops
  for delete using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Reset monthly counts (run via cron)
create or replace function public.reset_monthly_counts()
returns void as $$
begin
  update public.profiles set sops_this_month = 0;
end;
$$ language plpgsql security definer;
