/**
 * Script to add 10 sample students to the VRNT database
 * Run this with: npx tsx scripts/add-sample-students.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local')
  console.error('Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const sampleStudents = [
  {
    uid: 'VRNT001',
    name_aadhar: 'Ramakrishna Sharma',
    mobile_number: '+91 98400 12345',
    email_id: 'ramakrishna.sharma@example.com',
    email_address: 'ramakrishna.sharma@example.com',
    aadhaar_number: '1234 5678 9012',
    address: '12, Brahmin Street, Mylapore, Chennai - 600004',
    date_of_birth: '2005-03-15',
    father_name: 'Venkatesh Sharma',
    vedham: 'Yajur Veda',
    shaka: 'Krishna Yajur Veda',
    gothram: 'Bharadwaja',
    soothram: 'Apastamba',
    certified_in: 'Krishna Yajur Veda - Ghana Patha',
    year_of_certification: '2023',
    school: 'Sri Veda Patasala, Mylapore',
    veda_adhyapakar_name: 'Pandita Subramaniam Dikshitar',
    category: 'P'
  },
  {
    uid: 'VRNT002',
    name_aadhar: 'Varadharajan Iyer',
    mobile_number: '+91 98401 23456',
    email_id: 'varadharajan.iyer@example.com',
    email_address: 'varadharajan.iyer@example.com',
    aadhaar_number: '2345 6789 0123',
    address: '45, Sannidhi Street, Kumbakonam - 612001',
    date_of_birth: '2006-07-22',
    father_name: 'Krishnamurthy Iyer',
    vedham: 'Rig Veda',
    shaka: 'Sakala Sakha',
    gothram: 'Kashyapa',
    soothram: 'Asvalayana',
    certified_in: 'Rig Veda - Pada Patha',
    year_of_certification: '2024',
    school: 'Kumbakonam Veda Patasala',
    veda_adhyapakar_name: 'Sri Rangaswamy Dikshitar',
    category: 'P'
  },
  {
    uid: 'VRNT003',
    name_aadhar: 'Narayanan Bhattar',
    mobile_number: '+91 98402 34567',
    email_id: 'narayanan.bhattar@example.com',
    email_address: 'narayanan.bhattar@example.com',
    aadhaar_number: '3456 7890 1234',
    address: '78, Agraharam Street, Srirangam - 620006',
    date_of_birth: '2004-11-05',
    father_name: 'Srinivasan Bhattar',
    vedham: 'Sama Veda',
    shaka: 'Kauthuma',
    gothram: 'Atri',
    soothram: 'Drahyayana',
    certified_in: 'Sama Veda - Krama Patha',
    year_of_certification: '2023',
    school: 'Srirangam Sri Ranganatha Veda Patasala',
    veda_adhyapakar_name: 'Vidwan Parthasarathy Bhattar',
    category: 'P'
  },
  {
    uid: 'VRNT004',
    name_aadhar: 'Govindarajan Sastri',
    mobile_number: '+91 98403 45678',
    email_id: 'govindarajan.sastri@example.com',
    email_address: 'govindarajan.sastri@example.com',
    aadhaar_number: '4567 8901 2345',
    address: '23, Temple Street, Kanchipuram - 631501',
    date_of_birth: '2005-09-18',
    father_name: 'Ramakrishna Sastri',
    vedham: 'Yajur Veda',
    shaka: 'Taittiriya',
    gothram: 'Viswamitra',
    soothram: 'Bodhayana',
    certified_in: 'Krishna Yajur Veda - Krama Patha',
    year_of_certification: '2024',
    school: 'Kanchi Kamakoti Veda Patasala',
    veda_adhyapakar_name: 'Mahavidwan Sankara Dikshitar',
    category: 'P'
  },
  {
    uid: 'VRNT005',
    name_aadhar: 'Srinivasan Iyengar',
    mobile_number: '+91 98404 56789',
    email_id: 'srinivasan.iyengar@example.com',
    email_address: 'srinivasan.iyengar@example.com',
    aadhaar_number: '5678 9012 3456',
    address: '56, Agraharam, Melkote - 571431',
    date_of_birth: '2006-01-30',
    father_name: 'Varadachari Iyengar',
    vedham: 'Yajur Veda',
    shaka: 'Krishna Yajur Veda',
    gothram: 'Jamadagni',
    soothram: 'Apastamba',
    certified_in: 'Taittiriya Samhita - Pada Patha',
    year_of_certification: '2023',
    school: 'Melkote Veda Patasala',
    veda_adhyapakar_name: 'Sri Vedanta Ramanuja Bhattar',
    category: 'N'
  },
  {
    uid: 'VRNT006',
    name_aadhar: 'Mahadevan Dikshitar',
    mobile_number: '+91 98405 67890',
    email_id: 'mahadevan.dikshitar@example.com',
    email_address: 'mahadevan.dikshitar@example.com',
    aadhaar_number: '6789 0123 4567',
    address: '34, Brahmin Street, Thanjavur - 613001',
    date_of_birth: '2004-12-25',
    father_name: 'Subramaniam Dikshitar',
    vedham: 'Rig Veda',
    shaka: 'Bashkala',
    gothram: 'Gautama',
    soothram: 'Asvalayana',
    certified_in: 'Rig Veda - Ghana Patha',
    year_of_certification: '2024',
    school: 'Thanjavur Saraswati Veda Patasala',
    veda_adhyapakar_name: 'Pandita Ramachandra Dikshitar',
    category: 'P'
  },
  {
    uid: 'VRNT007',
    name_aadhar: 'Krishnan Namboothiri',
    mobile_number: '+91 98406 78901',
    email_id: 'krishnan.namboothiri@example.com',
    email_address: 'krishnan.namboothiri@example.com',
    aadhaar_number: '7890 1234 5678',
    address: '12, Mana Street, Thrissur - 680001',
    date_of_birth: '2005-05-14',
    father_name: 'Narayanan Namboothiri',
    vedham: 'Rig Veda',
    shaka: 'Sakala Sakha',
    gothram: 'Kaundinya',
    soothram: 'Asvalayana',
    certified_in: 'Rig Veda - Pada Patha',
    year_of_certification: '2023',
    school: 'Kerala Veda Patashala, Thrissur',
    veda_adhyapakar_name: 'Vidwan Krishnan Namboothiri',
    category: 'N'
  },
  {
    uid: 'VRNT008',
    name_aadhar: 'Venkatesan Sharma',
    mobile_number: '+91 98407 89012',
    email_id: 'venkatesan.sharma@example.com',
    email_address: 'venkatesan.sharma@example.com',
    aadhaar_number: '8901 2345 6789',
    address: '89, Temple Road, Tirupati - 517501',
    date_of_birth: '2006-08-20',
    father_name: 'Ramanuja Sharma',
    vedham: 'Yajur Veda',
    shaka: 'Taittiriya',
    gothram: 'Angirasa',
    soothram: 'Bodhayana',
    certified_in: 'Krishna Yajur Veda - Samhita Patha',
    year_of_certification: '2024',
    school: 'Tirupati Sri Venkateswara Veda Patasala',
    veda_adhyapakar_name: 'Sri Ranganatha Bhattar',
    category: 'P'
  },
  {
    uid: 'VRNT009',
    name_aadhar: 'Raghavan Iyengar',
    mobile_number: '+91 98408 90123',
    email_id: 'raghavan.iyengar@example.com',
    email_address: 'raghavan.iyengar@example.com',
    aadhaar_number: '9012 3456 7890',
    address: '67, Sannidhi Street, Udupi - 576101',
    date_of_birth: '2005-02-28',
    father_name: 'Madhavan Iyengar',
    vedham: 'Sama Veda',
    shaka: 'Jaiminiya',
    gothram: 'Vatsya',
    soothram: 'Drahyayana',
    certified_in: 'Sama Veda - Pada Patha',
    year_of_certification: '2023',
    school: 'Udupi Krishna Mutt Veda Patasala',
    veda_adhyapakar_name: 'Vidwan Gopala Bhattar',
    category: 'N'
  },
  {
    uid: 'VRNT010',
    name_aadhar: 'Ananthapadmanabhan Iyer',
    mobile_number: '+91 98409 01234',
    email_id: 'ananthapadmanabhan@example.com',
    email_address: 'ananthapadmanabhan@example.com',
    aadhaar_number: '0123 4567 8901',
    address: '101, Vedic Avenue, Thiruvananthapuram - 695001',
    date_of_birth: '2004-06-10',
    father_name: 'Padmanabhan Iyer',
    vedham: 'Yajur Veda',
    shaka: 'Krishna Yajur Veda',
    gothram: 'Harita',
    soothram: 'Apastamba',
    certified_in: 'Krishna Yajur Veda - Ghana Patha',
    year_of_certification: '2024',
    school: 'Thiruvananthapuram Vedic Institute',
    veda_adhyapakar_name: 'Mahavidwan Sridhara Dikshitar',
    category: 'P'
  }
]

async function addSampleStudents() {
  console.log('🚀 Starting to add sample students...\n')

  try {
    // Check if students already exist
    const { data: existingStudents, error: checkError } = await supabase
      .from('students_vrnt')
      .select('uid')
      .in('uid', sampleStudents.map(s => s.uid))

    if (checkError) {
      console.error('❌ Error checking existing students:', checkError)
      return
    }

    const existingUids = new Set(existingStudents?.map(s => s.uid) || [])
    const newStudents = sampleStudents.filter(s => !existingUids.has(s.uid))

    if (newStudents.length === 0) {
      console.log('ℹ️  All sample students already exist in the database.')
      console.log('   No new students to add.')
      return
    }

    console.log(`📝 Adding ${newStudents.length} new students...\n`)

    // Insert students one by one with progress indication
    let successCount = 0
    let errorCount = 0

    for (const student of newStudents) {
      const { data, error } = await supabase
        .from('students_vrnt')
        .insert([student])
        .select()

      if (error) {
        console.error(`❌ Failed to add ${student.name_aadhar} (${student.uid}):`, error.message)
        errorCount++
      } else {
        console.log(`✅ Added: ${student.name_aadhar} (${student.uid})`)
        successCount++
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 SUMMARY')
    console.log('='.repeat(60))
    console.log(`✅ Successfully added: ${successCount} students`)
    if (errorCount > 0) {
      console.log(`❌ Failed to add: ${errorCount} students`)
    }
    console.log('='.repeat(60))

    if (successCount > 0) {
      console.log('\n🎉 Students have been added to the database!')
      console.log('\n💡 You can now search for these students using their UIDs:')
      newStudents.forEach((student, index) => {
        if (index < 5) { // Show first 5 as examples
          console.log(`   - ${student.uid}: ${student.name_aadhar}`)
        }
      })
      if (newStudents.length > 5) {
        console.log(`   ... and ${newStudents.length - 5} more!`)
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the script
addSampleStudents()
  .then(() => {
    console.log('\n✨ Script completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
