-- VRNT Student Portal Database Schema
-- Run this in your Supabase SQL Editor

-- Create the main students table
create table public.students_vrnt (
  id uuid default gen_random_uuid() primary key,
  uid text,
  email_address text,
  name_aadhar text,
  mobile_number text,
  email_id text,
  aadhaar_number text,
  address text,
  year_of_certification text,
  certified_in text,
  school text,
  veda_adhyapakar_name text,
  certificate_url text,
  passport_photo_url text,
  aadhaar_card_url text,
  vedham text,
  date_of_birth date,
  father_name text,
  shaka text,
  gothram text,
  soothram text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add indexes for search performance
create index idx_students_name on public.students_vrnt(name_aadhar);
create index idx_students_mobile on public.students_vrnt(mobile_number);
create index idx_students_uid on public.students_vrnt(uid);
create index idx_students_aadhaar on public.students_vrnt(aadhaar_number);

-- Enable Row Level Security (optional - for future auth)
alter table public.students_vrnt enable row level security;

-- Create a policy that allows all operations for now (update this later with auth)
create policy "Allow all operations for now"
  on public.students_vrnt
  for all
  using (true)
  with check (true);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.students_vrnt
  for each row
  execute function public.handle_updated_at();

-- Storage bucket setup (run via Supabase Dashboard or API)
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create a new bucket named: vrnt-uploads
-- 3. Set it to Public (for public URLs) or configure policies for private access
-- 4. Folder structure will be: {student_id}/{filetype}/{filename}

-- Storage policies for vrnt-uploads bucket (if you want granular control)
-- You'll need to create these in the Storage section of Supabase Dashboard
