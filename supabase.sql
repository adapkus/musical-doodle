create extension if not exists pgcrypto;

create table profiles (
  id uuid primary key,
  email text not null,
  role text check (role in ('student','grandparent')) not null,
  full_name text,
  community text,
  created_at timestamptz default now()
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  location text not null,
  posted_by uuid not null references profiles(id),
  created_at timestamptz default now()
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  applicant_id uuid not null references profiles(id),
  message text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;

-- Profiles policies
create policy "Select own profile" on profiles
  for select using (auth.uid() = id);
create policy "Insert own profile" on profiles
  for insert with check (auth.uid() = id);
create policy "Update own profile" on profiles
  for update using (auth.uid() = id);

-- Jobs policies
create policy "Select jobs" on jobs
  for select using (auth.role() = 'authenticated');
create policy "Insert own jobs" on jobs
  for insert with check (auth.uid() = posted_by);
create policy "Update own jobs" on jobs
  for update using (auth.uid() = posted_by);
create policy "Delete own jobs" on jobs
  for delete using (auth.uid() = posted_by);

-- Applications policies
create policy "Select applications for owner or applicant" on applications
  for select using (
    auth.uid() = applicant_id or
    auth.uid() in (select posted_by from jobs where jobs.id = job_id)
  );
create policy "Insert own applications" on applications
  for insert with check (auth.uid() = applicant_id);
create policy "Update own applications" on applications
  for update using (auth.uid() = applicant_id);
create policy "Delete own applications" on applications
  for delete using (auth.uid() = applicant_id);
