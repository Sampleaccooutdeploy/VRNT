/**
 * Supabase Storage Test Script
 * 
 * This script tests if your Supabase storage is configured correctly.
 * Run this in browser console or as a standalone test.
 */

import { supabase } from './supabaseClient'

export async function testSupabaseStorage() {
  console.log('🔍 Testing Supabase Storage Configuration...\n')
  
  const results = {
    connection: false,
    bucketExists: false,
    canUpload: false,
    canRead: false,
    errors: [] as string[]
  }

  try {
    // Test 1: Check connection
    console.log('1️⃣ Testing Supabase connection...')
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError) {
      results.errors.push(`Auth Error: ${authError.message}`)
      console.error('❌ Connection failed:', authError.message)
    } else {
      results.connection = true
      console.log('✅ Supabase connection successful')
    }

    // Test 2: Check if bucket exists
    console.log('\n2️⃣ Checking if vrnt-uploads bucket exists...')
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    
    if (bucketError) {
      results.errors.push(`Bucket List Error: ${bucketError.message}`)
      console.error('❌ Failed to list buckets:', bucketError.message)
    } else {
      const bucket = buckets.find((b: any) => b.name === 'vrnt-uploads')
      if (bucket) {
        results.bucketExists = true
        console.log('✅ Bucket "vrnt-uploads" exists')
        console.log('   - Public:', bucket.public)
        console.log('   - ID:', bucket.id)
      } else {
        results.errors.push('Bucket "vrnt-uploads" does not exist')
        console.error('❌ Bucket "vrnt-uploads" not found')
        console.log('   Available buckets:', buckets.map((b: any) => b.name).join(', '))
      }
    }

    // Test 3: Try uploading a test file
    console.log('\n3️⃣ Testing file upload...')
    const testFile = new Blob(['test content'], { type: 'text/plain' })
    const testFileName = `test/${Date.now()}_test.txt`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('vrnt-uploads')
      .upload(testFileName, testFile, { upsert: true })

    if (uploadError) {
      results.errors.push(`Upload Error: ${uploadError.message}`)
      console.error('❌ Upload failed:', uploadError.message)
      console.log('   This usually means:')
      console.log('   - Bucket does not exist')
      console.log('   - Storage policies are not configured')
      console.log('   - Bucket is not public and you are not authenticated')
    } else {
      results.canUpload = true
      console.log('✅ File upload successful')
      console.log('   Path:', uploadData.path)
    }

    // Test 4: Try reading the file
    if (results.canUpload) {
      console.log('\n4️⃣ Testing file read/download...')
      const { data: urlData } = supabase.storage
        .from('vrnt-uploads')
        .getPublicUrl(testFileName)

      if (urlData && urlData.publicUrl) {
        results.canRead = true
        console.log('✅ File URL generated successfully')
        console.log('   URL:', urlData.publicUrl)

        // Try to fetch the file
        try {
          const response = await fetch(urlData.publicUrl)
          if (response.ok) {
            console.log('✅ File is publicly accessible')
          } else {
            results.errors.push(`File not accessible (HTTP ${response.status})`)
            console.error('❌ File exists but is not publicly accessible')
          }
        } catch (fetchError: any) {
          results.errors.push(`Fetch Error: ${fetchError.message}`)
          console.error('❌ Failed to fetch file:', fetchError.message)
        }

        // Clean up test file
        await supabase.storage.from('vrnt-uploads').remove([testFileName])
        console.log('🧹 Test file cleaned up')
      } else {
        results.errors.push('Failed to generate public URL')
        console.error('❌ Failed to generate public URL')
      }
    }

  } catch (error: any) {
    results.errors.push(`Unexpected Error: ${error.message}`)
    console.error('❌ Unexpected error:', error)
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 TEST SUMMARY')
  console.log('='.repeat(50))
  console.log('Connection:', results.connection ? '✅ OK' : '❌ FAILED')
  console.log('Bucket Exists:', results.bucketExists ? '✅ OK' : '❌ FAILED')
  console.log('Can Upload:', results.canUpload ? '✅ OK' : '❌ FAILED')
  console.log('Can Read:', results.canRead ? '✅ OK' : '❌ FAILED')
  
  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS FOUND:')
    results.errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`)
    })
    console.log('\n📖 See docs/SUPABASE_STORAGE_SETUP.md for setup instructions')
  } else {
    console.log('\n✅ ALL TESTS PASSED! Storage is configured correctly.')
  }

  return results
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  console.log('🚀 To test Supabase Storage, run: testSupabaseStorage()')
}
