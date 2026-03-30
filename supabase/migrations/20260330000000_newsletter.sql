create table if not exists public.newsletter (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  source text default 'website',
  created_at timestamptz not null default now()
);
alter table public.newsletter enable row level security;
