-- =====================================================
-- VRNT Student Portal - Storage Policies Setup
-- =====================================================
-- Run this in Supabase SQL Editor if you need custom policies
-- (Not needed if using a Public bucket)
-- =====================================================

-- 1. Allow anyone to upload files
CREATE POLICY "Allow public uploads to vrnt-uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'vrnt-uploads');

-- 2. Allow anyone to read/view files
CREATE POLICY "Allow public reads from vrnt-uploads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'vrnt-uploads');

-- 3. Allow anyone to update files
CREATE POLICY "Allow public updates to vrnt-uploads"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'vrnt-uploads')
WITH CHECK (bucket_id = 'vrnt-uploads');

-- 4. Allow anyone to delete files
CREATE POLICY "Allow public deletes from vrnt-uploads"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'vrnt-uploads');

-- =====================================================
-- Verify policies (run this to check)
-- =====================================================
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage';

-- =====================================================
-- Alternative: Authenticated Users Only (More Secure)
-- =====================================================
-- Use these policies if you want only logged-in users to upload
-- Comment out the above policies and use these instead:

/*
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload to vrnt-uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'vrnt-uploads');

-- Allow authenticated users to read
CREATE POLICY "Authenticated users can read from vrnt-uploads"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'vrnt-uploads');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update vrnt-uploads"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'vrnt-uploads')
WITH CHECK (bucket_id = 'vrnt-uploads');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete from vrnt-uploads"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'vrnt-uploads');
*/

-- =====================================================
-- Clean up (if you need to remove old policies)
-- =====================================================
/*
DROP POLICY IF EXISTS "Allow public uploads to vrnt-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads from vrnt-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to vrnt-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from vrnt-uploads" ON storage.objects;
*/
