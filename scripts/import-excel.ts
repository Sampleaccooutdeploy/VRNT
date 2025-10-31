#!/usr/bin/env tsx

/**
 * Excel Import Script for VRNT Student Portal
 * 
 * This script reads an Excel file and imports student data into Supabase.
 * It handles file uploads to Supabase Storage and creates database records.
 * 
 * Usage:
 *   npm run import-excel -- --file path/to/User_Data_template.xlsx
 * 
 * Environment variables required:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import ExcelJS from 'exceljs'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Initialize Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface ExcelRow {
  [key: string]: any
}

// Mapping from Excel column headers to database fields
const COLUMN_MAPPING: { [key: string]: string } = {
  'UID': 'uid',
  'Email Address': 'email_address',
  'Name (as in Aadhaar)': 'name_aadhar',
  'Mobile Number': 'mobile_number',
  'Email ID': 'email_id',
  'Aadhaar Number': 'aadhaar_number',
  'Address': 'address',
  'Year of Certification': 'year_of_certification',
  'Certified In': 'certified_in',
  'School': 'school',
  'Veda Adhyapakar Name': 'veda_adhyapakar_name',
  'Vedham': 'vedham',
  'Date of Birth': 'date_of_birth',
  'Father Name': 'father_name',
  'Shaka': 'shaka',
  'Gothram': 'gothram',
  'Soothram': 'soothram',
  'Category': 'category', // P or S
}

/**
 * Upload a file to Supabase Storage
 */
async function uploadFileToStorage(
  studentId: string,
  filePath: string,
  fileType: 'passport' | 'certificate' | 'aadhaar'
): Promise<string | null> {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`)
      return null
    }

    const fileBuffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)
    const storagePath = `${studentId}/${fileType}/${fileName}`

    const { data, error } = await supabase.storage
      .from('vrnt-uploads')
      .upload(storagePath, fileBuffer, {
        contentType: 'image/jpeg', // Adjust based on actual file type
        upsert: true,
      })

    if (error) {
      console.error(`❌ Upload error for ${filePath}:`, error.message)
      return null
    }

    const { data: urlData } = supabase.storage
      .from('vrnt-uploads')
      .getPublicUrl(storagePath)

    return urlData.publicUrl
  } catch (error) {
    console.error(`❌ Error uploading file ${filePath}:`, error)
    return null
  }
}

/**
 * Process a single row from Excel
 */
async function processRow(row: ExcelRow, rowNumber: number): Promise<boolean> {
  try {
    // Map Excel columns to database fields
    const studentData: any = {
      category: 'S', // Default to private
    }

    Object.keys(COLUMN_MAPPING).forEach((excelCol) => {
      const dbField = COLUMN_MAPPING[excelCol]
      const value = row[excelCol]
      
      if (value !== undefined && value !== null && value !== '') {
        // Handle date fields
        if (dbField === 'date_of_birth' && value instanceof Date) {
          studentData[dbField] = value.toISOString().split('T')[0]
        } else if (dbField === 'category') {
          // Ensure category is P or S
          studentData[dbField] = (value.toString().toUpperCase() === 'P') ? 'P' : 'S'
        } else {
          studentData[dbField] = value.toString()
        }
      }
    })

    // Insert student record first to get ID
    const { data: insertedStudent, error: insertError } = await supabase
      .from('students_vrnt')
      .insert(studentData)
      .select()
      .single()

    if (insertError) {
      console.error(`❌ Row ${rowNumber}: Insert error -`, insertError.message)
      return false
    }

    const studentId = insertedStudent.id
    console.log(`✅ Row ${rowNumber}: Created student ${studentData.name_aadhar || 'Unknown'} (${studentId})`)

    // Handle file uploads if file paths are provided in Excel
    const updates: any = {}
    
    if (row['Passport Photo Path']) {
      const photoUrl = await uploadFileToStorage(studentId, row['Passport Photo Path'], 'passport')
      if (photoUrl) updates.passport_photo_url = photoUrl
    }

    if (row['Certificate Path']) {
      const certUrl = await uploadFileToStorage(studentId, row['Certificate Path'], 'certificate')
      if (certUrl) updates.certificate_url = certUrl
    }

    if (row['Aadhaar Card Path']) {
      const aadhaarUrl = await uploadFileToStorage(studentId, row['Aadhaar Card Path'], 'aadhaar')
      if (aadhaarUrl) updates.aadhaar_card_url = aadhaarUrl
    }

    // Update with file URLs if any were uploaded
    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('students_vrnt')
        .update(updates)
        .eq('id', studentId)

      if (updateError) {
        console.error(`⚠️  Row ${rowNumber}: Could not update file URLs -`, updateError.message)
      } else {
        console.log(`   📎 Uploaded ${Object.keys(updates).length} file(s)`)
      }
    }

    return true
  } catch (error) {
    console.error(`❌ Row ${rowNumber}: Unexpected error -`, error)
    return false
  }
}

/**
 * Main import function
 */
async function importExcel(filePath: string) {
  console.log('🚀 Starting Excel import...')
  console.log(`📄 File: ${filePath}`)

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    process.exit(1)
  }

  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(filePath)

  const worksheet = workbook.worksheets[0]
  if (!worksheet) {
    console.error('❌ No worksheet found in Excel file')
    process.exit(1)
  }

  console.log(`📊 Worksheet: ${worksheet.name}`)
  console.log(`📏 Rows: ${worksheet.rowCount}`)

  // Get headers from first row
  const headerRow = worksheet.getRow(1)
  const headers: string[] = []
  headerRow.eachCell((cell, colNumber) => {
    headers[colNumber] = cell.text
  })

  let successCount = 0
  let failCount = 0

  // Process each data row (skip header)
  for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
    const row = worksheet.getRow(rowNumber)
    
    // Skip empty rows
    if (row.hasValues) {
      const rowData: ExcelRow = {}
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber]
        if (header) {
          rowData[header] = cell.value
        }
      })

      const success = await processRow(rowData, rowNumber)
      if (success) {
        successCount++
      } else {
        failCount++
      }
    }
  }

  console.log('\n📊 Import Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Failed: ${failCount}`)
  console.log(`   📝 Total: ${successCount + failCount}`)
}

// Parse command line arguments
const args = process.argv.slice(2)
const fileArgIndex = args.indexOf('--file')

if (fileArgIndex === -1 || !args[fileArgIndex + 1]) {
  console.error('Usage: npm run import-excel -- --file path/to/excel-file.xlsx')
  process.exit(1)
}

const excelFilePath = args[fileArgIndex + 1]

// Run import
importExcel(excelFilePath)
  .then(() => {
    console.log('\n✅ Import completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error)
    process.exit(1)
  })
