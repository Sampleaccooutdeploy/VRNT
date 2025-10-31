'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { Edit, User } from 'lucide-react'
import { Student } from '@/lib/supabaseClient'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { StudentEditModal } from './StudentEditModal'

interface StudentDetailsProps {
  student: Student
  onStudentUpdated: () => void
}

export function StudentDetails({ student, onStudentUpdated }: StudentDetailsProps) {
  const t = useTranslations('fields')
  const tActions = useTranslations('actions')
  const locale = useLocale() as 'en' | 'ta' | 'te'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
  }

  const handleSave = () => {
    onStudentUpdated()
    handleCloseModal()
  }

  // Language-specific labels
  const labels = {
    en: {
      personalInfo: 'Personal Information',
      vedicInfo: 'Vedic & Certification Details',
      nameAadhar: 'NAME as in Aadhaar',
      mobile: 'MOBILE NUMBER',
      emailAddress: 'Email Address',
      emailId: 'Email ID',
      aadhaar: 'Aadhaar Number',
      dob: 'Date of Birth',
      fatherName: "Father's Name",
      uid: 'UID',
      address: 'Address',
      vedham: 'Vedham',
      shaka: 'Shaka',
      gothram: 'Gothram',
      soothram: 'Soothram',
      certifiedIn: 'Certified In',
      yearOfCert: 'Year of Certification',
      school: 'PATASALAI',
      vedaAdhyapakar: "Veda Adhyapakar's Name",
      certificate: 'Certificate',
      aadhaarCard: 'Aadhaar Card'
    },
    ta: {
      personalInfo: 'தனிப்பட்ட தகவல்',
      vedicInfo: 'வேத மற்றும் சான்றிதழ் விவரங்கள்',
      nameAadhar: 'ஆதாரில் உள்ளதைப் போன்ற பெயர்',
      mobile: 'தொலைபேசி',
      emailAddress: 'மின்னஞ்சல் முகவரி',
      emailId: 'மின்னஞ்சல்',
      aadhaar: 'ஆதார் எண்',
      dob: 'பிறந்த தேதி',
      fatherName: 'தந்தையின் பெயர்',
      uid: 'UID',
      address: 'முகவரி',
      vedham: 'வேதம்',
      shaka: 'சாகை',
      gothram: 'கோத்திரம்',
      soothram: 'சூத்திரம்',
      certifiedIn: 'தேர்ச்சி பெற்ற பிரிவு',
      yearOfCert: 'சான்றிதழ் பெற்ற ஆண்டு',
      school: 'பாடசாலை',
      vedaAdhyapakar: 'வேத வாத்தியார் பெயர்',
      certificate: 'தேர்ச்சி பெற்ற சான்றிதழ்',
      aadhaarCard: 'ஆதார் அட்டை'
    },
    te: {
      personalInfo: 'వ్యక్తిగత సమాచారం',
      vedicInfo: 'వేద మరియు ధృవీకరణ వివరాలు',
      nameAadhar: 'ఆధార్‌లో ఉన్నట్లే పేరు',
      mobile: 'ఫోన్',
      emailAddress: 'ఇమెయిల్ చిరునామా',
      emailId: 'ఇమెయిల్ ఐడి',
      aadhaar: 'ఆధార్',
      dob: 'పుట్టిన తేదీ',
      fatherName: 'తండ్రి పేరు',
      uid: 'UID',
      address: 'చిరునామా',
      vedham: 'వేదం',
      shaka: 'శాఖ',
      gothram: 'గోత్రం',
      soothram: 'సూత్రం',
      certifiedIn: 'ధృవీకరించబడింది',
      yearOfCert: 'ధృవపత్రం పొందిన సంవత్సరం',
      school: 'పాఠశాల',
      vedaAdhyapakar: 'వేదాధ్యాపకుని పేరు',
      certificate: 'సర్టిఫికేట్',
      aadhaarCard: 'ఆధార్ కార్డు'
    }
  }

  const L = labels[locale]

  return (
    <>
      <Card className="shadow-xl hover:shadow-2xl transition-shadow">
        <CardHeader className="bg-gradient-to-r from-saffron/10 to-saffron/5 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl md:text-3xl font-poppins font-bold flex items-center gap-3">
              {/* Profile Picture */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-saffron shadow-md flex-shrink-0">
                {student.passport_photo_url ? (
                  <Image
                    src={student.passport_photo_url}
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-saffron/20 to-saffron/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-saffron" />
                  </div>
                )}
              </div>
              {student.name_aadhar || 'Student'}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              title={tActions('edit')}
              className="hover:bg-saffron/20"
            >
              <Edit className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RIGHT COLUMN - Personal Details */}
            <div className="space-y-4 border-r pr-6">
              <h3 className="font-bold text-xl md:text-2xl text-saffron border-b-2 border-saffron/20 pb-3 mb-4">
                {L.personalInfo}
              </h3>

              {/* Passport Photo - Larger and More Professional */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="relative w-40 h-40 rounded-lg overflow-hidden border-4 border-saffron/30 shadow-lg bg-gradient-to-br from-saffron/5 to-saffron/10">
                    {student.passport_photo_url ? (
                      <Image
                        src={student.passport_photo_url}
                        alt="Profile Picture"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-20 w-20 text-saffron/30" />
                      </div>
                    )}
                  </div>
                  {/* Hover overlay to indicate it can be edited */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                    <p className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity bg-saffron px-3 py-1 rounded-full">
                      Click Edit to upload
                    </p>
                  </div>
                </div>
              </div>

              <DetailRow 
                label={L.nameAadhar}
                value={student.name_aadhar}
              />

              <DetailRow 
                label={L.mobile}
                value={student.mobile_number}
              />

              <DetailRow 
                label={L.emailAddress}
                value={student.email_address}
              />

              <DetailRow 
                label={L.emailId}
                value={student.email_id}
              />

              <DetailRow 
                label={L.aadhaar}
                value={student.aadhaar_number}
              />

              <DetailRow 
                label={L.dob}
                value={formatDate(student.date_of_birth)}
              />

              <DetailRow 
                label={L.fatherName}
                value={student.father_name}
              />

              <DetailRow 
                label={L.uid}
                value={student.uid}
              />

              <DetailRow 
                label={L.address}
                value={student.address}
              />
            </div>

            {/* LEFT COLUMN - Vedic & Certification Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-xl md:text-2xl text-saffron border-b-2 border-saffron/20 pb-3 mb-4">
                {L.vedicInfo}
              </h3>

              <DetailRow 
                label={L.vedham}
                value={student.vedham}
              />

              <DetailRow 
                label={L.shaka}
                value={student.shaka}
              />

              <DetailRow 
                label={L.gothram}
                value={student.gothram}
              />

              <DetailRow 
                label={L.soothram}
                value={student.soothram}
              />

              <DetailRow 
                label={L.certifiedIn}
                value={student.certified_in}
              />

              <DetailRow 
                label={L.yearOfCert}
                value={student.year_of_certification}
              />

              <DetailRow 
                label={L.school}
                value={student.school}
              />

              <DetailRow 
                label={L.vedaAdhyapakar}
                value={student.veda_adhyapakar_name}
              />

              {/* Certificate */}
              {student.certificate_url && (
                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {L.certificate}
                  </p>
                  <a
                    href={student.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    {tActions('view')} {L.certificate}
                  </a>
                </div>
              )}

              {/* Aadhaar Card */}
              {student.aadhaar_card_url && (
                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {L.aadhaarCard}
                  </p>
                  <a
                    href={student.aadhaar_card_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    {tActions('view')} {L.aadhaarCard}
                  </a>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditModalOpen && (
        <StudentEditModal
          student={student}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  )
}

interface DetailRowProps {
  label: string
  value: string | null | undefined
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="border-b border-gray-100 pb-3">
      <p className="text-sm font-semibold text-gray-600 mb-1.5">{label}</p>
      <p className="text-base md:text-lg text-gray-900 font-poppins font-medium">
        {value || '-'}
      </p>
    </div>
  )
}
