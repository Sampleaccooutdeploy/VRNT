-- =====================================================
-- FIX: Storage RLS Policy Error
-- =====================================================
-- Run this in Supabase SQL Editor to fix upload errors
-- Error: "new row violates row-level security policy"
-- =====================================================

-- First, drop any existing policies to start fresh
DROP POLICY IF EXISTS "Allow public uploads to vrnt-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads from vrnt-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to vrnt-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from vrnt-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations for now" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- =====================================================
-- CREATE NEW POLICIES (ALLOW ALL PUBLIC ACCESS)
-- =====================================================

-- Policy 1: Allow anyone to INSERT (upload) files
CREATE POLICY "Public can upload to vrnt-uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'vrnt-uploads');

-- Policy 2: Allow anyone to SELECT (view/download) files
CREATE POLICY "Public can read from vrnt-uploads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'vrnt-uploads');

-- Policy 3: Allow anyone to UPDATE files
CREATE POLICY "Public can update vrnt-uploads"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'vrnt-uploads')
WITH CHECK (bucket_id = 'vrnt-uploads');

-- Policy 4: Allow anyone to DELETE files
CREATE POLICY "Public can delete from vrnt-uploads"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'vrnt-uploads');

-- =====================================================
-- VERIFY POLICIES
-- =====================================================
SELECT 
  policyname,
  cmd as operation,
  qual as using_expression,
  with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%vrnt-uploads%'
ORDER BY policyname;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
-- You should see 4 policies above:
-- 1. Public can upload to vrnt-uploads (INSERT)
-- 2. Public can read from vrnt-uploads (SELECT)
-- 3. Public can update vrnt-uploads (UPDATE)
-- 4. Public can delete from vrnt-uploads (DELETE)
--
-- Now try uploading a file in your app - it should work!
-- =====================================================
