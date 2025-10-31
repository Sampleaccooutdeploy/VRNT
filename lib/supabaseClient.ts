import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (use only in API routes or server components)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
)

// Types
export interface Student {
  id: string
  uid: string | null
  email_address: string | null
  name_aadhar: string | null
  mobile_number: string | null
  email_id: string | null
  aadhaar_number: string | null
  address: string | null
  year_of_certification: string | null
  certified_in: string | null
  school: string | null
  veda_adhyapakar_name: string | null
  certificate_url: string | null
  passport_photo_url: string | null
  aadhaar_card_url: string | null
  vedham: string | null
  date_of_birth: string | null
  father_name: string | null
  shaka: string | null
  gothram: string | null
  soothram: string | null
  created_at: string
  updated_at: string
}

// Search students - UID only
export async function searchStudents(query: string): Promise<{ data: Student[]; error: any }> {
  if (!query || query.trim().length === 0) {
    // Return empty array when no search query
    return { data: [], error: null }
  }

  const searchPattern = `%${query.trim()}%`
  
  const { data, error } = await supabase
    .from('students_vrnt')
    .select('*')
    .ilike('uid', searchPattern)
    .order('name_aadhar', { ascending: true })
    .limit(100)
  
  return { data: data || [], error }
}

// Update student
export async function updateStudent(id: string, updates: Partial<Student>) {
  const { data, error } = await supabase
    .from('students_vrnt')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

// Upload file to Supabase Storage with improved error handling
export async function uploadFile(
  studentId: string,
  file: File,
  fileType: 'passport' | 'certificate' | 'aadhaar'
): Promise<{ url: string | null; error: any }> {
  try {
    // Validate file
    if (!file) {
      throw new Error('No file provided')
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB')
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const validDocTypes = ['application/pdf']
    const validTypes = fileType === 'passport' ? validImageTypes : [...validImageTypes, ...validDocTypes]
    
    if (!validTypes.includes(file.type)) {
      throw new Error(`Invalid file type. Allowed: ${validTypes.join(', ')}`)
    }

    // Create unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase()
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const fileName = `${fileType}_${timestamp}_${randomStr}.${fileExt}`
    const filePath = `${studentId}/${fileType}/${fileName}`

    console.log('Uploading file:', { filePath, size: file.size, type: file.type })

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('vrnt-uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    if (!data) {
      throw new Error('Upload failed: No data returned')
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('vrnt-uploads')
      .getPublicUrl(filePath)

    if (!urlData?.publicUrl) {
      throw new Error('Failed to generate public URL')
    }

    console.log('Upload successful:', urlData.publicUrl)
    return { url: urlData.publicUrl, error: null }

  } catch (error: any) {
    console.error('Upload error:', error)
    return { 
      url: null, 
      error: error.message || 'Unknown upload error occurred' 
    }
  }
}

// Delete file from Supabase Storage
export async function deleteFile(filePath: string) {
  // Extract path from full URL if needed
  const path = filePath.includes('vrnt-uploads/') 
    ? filePath.split('vrnt-uploads/')[1] 
    : filePath

  const { error } = await supabase.storage
    .from('vrnt-uploads')
    .remove([path])

  return { error }
}
