-- Add unsubscribe columns to newsletter table
alter table public.newsletter
  add column if not exists unsubscribed boolean not null default false,
  add column if not exists unsubscribed_at timestamptz;

-- Add email opt-out flag to profiles
alter table public.profiles
  add column if not exists email_opt_out boolean not null default false;

-- Allow profiles to be deleted by the user (for account deletion)
create policy "Users can delete own profile" on public.profiles
  for delete using (auth.uid() = id);
