create table if not exists public.credit_records (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  qty integer not null check (qty > 0),
  total numeric(10,2) not null check (total >= 0),
  paid boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.credit_records
add column if not exists paid boolean not null default false;

alter table public.credit_records enable row level security;

drop policy if exists "allow read all" on public.credit_records;
create policy "allow read all"
on public.credit_records
for select
to anon
using (true);

drop policy if exists "allow insert all" on public.credit_records;
drop policy if exists "allow insert for authenticated" on public.credit_records;
create policy "allow insert for authenticated"
on public.credit_records
for insert
to authenticated
with check (auth.uid() is not null);

drop policy if exists "allow delete all" on public.credit_records;
drop policy if exists "allow delete for authenticated" on public.credit_records;
create policy "allow delete for authenticated"
on public.credit_records
for delete
to authenticated
using (auth.uid() is not null);

drop policy if exists "allow update for authenticated" on public.credit_records;
create policy "allow update for authenticated"
on public.credit_records
for update
to authenticated
using (auth.uid() is not null)
with check (auth.uid() is not null);
