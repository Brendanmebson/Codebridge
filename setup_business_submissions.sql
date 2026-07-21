create extension if not exists pgcrypto;

create table if not exists public.business_submissions (
  id uuid not null default gen_random_uuid() primary key,
  business_name text not null,
  owner_name text not null,
  email text not null,
  phone text,
  category text,
  website text,
  description text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.business_submissions enable row level security;

drop policy if exists "business submissions insert public" on public.business_submissions;
create policy "business submissions insert public"
  on public.business_submissions
  for insert
  with check (true);

drop policy if exists "business submissions read admin only" on public.business_submissions;
create policy "business submissions read admin only"
  on public.business_submissions
  for select
  using (auth.role() = 'authenticated');

drop policy if exists "business submissions update admin only" on public.business_submissions;
create policy "business submissions update admin only"
  on public.business_submissions
  for update
  using (auth.role() = 'authenticated');
