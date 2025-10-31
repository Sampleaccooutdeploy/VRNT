'use client'

import { useState } from 'react'
import { Edit, Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Student } from '@/lib/supabaseClient'
import { formatDate } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { StudentEditModal } from './StudentEditModal'

interface StudentTableProps {
  students: Student[]
  title: string
  emptyMessage: string
  onStudentUpdated: () => void
}

export function StudentTable({ students, title, emptyMessage, onStudentUpdated }: StudentTableProps) {
  const t = useTranslations('fields')
  const tActions = useTranslations('actions')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEdit = (student: Student) => {
    setSelectedStudent(student)
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    setSelectedStudent(null)
  }

  const handleSave = () => {
    onStudentUpdated()
    handleCloseModal()
  }

  return (
    <>
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-saffron/10 to-saffron/5">
          <CardTitle className="text-2xl font-poppins">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {students.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <p className="text-lg">{emptyMessage}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">{tActions('edit')}</TableHead>
                    <TableHead>{t('uid')}</TableHead>
                    <TableHead className="min-w-[200px]">{t('name')}</TableHead>
                    <TableHead>{t('mobile')}</TableHead>
                    <TableHead>{t('email')}</TableHead>
                    <TableHead>{t('vedham')}</TableHead>
                    <TableHead>{t('dob')}</TableHead>
                    <TableHead>{t('fatherName')}</TableHead>
                    <TableHead>{t('shaka')}</TableHead>
                    <TableHead>{t('gothram')}</TableHead>
                    <TableHead>{t('soothram')}</TableHead>
                    <TableHead>{t('certifiedIn')}</TableHead>
                    <TableHead>{t('year')}</TableHead>
                    <TableHead>{t('school')}</TableHead>
                    <TableHead>{t('vedaAdhyapakar')}</TableHead>
                    <TableHead>{t('passportPhoto')}</TableHead>
                    <TableHead>{t('certificate')}</TableHead>
                    <TableHead>{t('aadhaarCard')}</TableHead>
                    <TableHead>{t('category')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(student)}
                          title={tActions('edit')}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{student.uid || '-'}</TableCell>
                      <TableCell className="font-medium">{student.name_aadhar || '-'}</TableCell>
                      <TableCell>{student.mobile_number || '-'}</TableCell>
                      <TableCell className="text-xs">{student.email_id || '-'}</TableCell>
                      <TableCell>{student.vedham || '-'}</TableCell>
                      <TableCell>{formatDate(student.date_of_birth)}</TableCell>
                      <TableCell>{student.father_name || '-'}</TableCell>
                      <TableCell>{student.shaka || '-'}</TableCell>
                      <TableCell>{student.gothram || '-'}</TableCell>
                      <TableCell>{student.soothram || '-'}</TableCell>
                      <TableCell>{student.certified_in || '-'}</TableCell>
                      <TableCell>{student.year_of_certification || '-'}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{student.school || '-'}</TableCell>
                      <TableCell>{student.veda_adhyapakar_name || '-'}</TableCell>
                      <TableCell>
                        {student.passport_photo_url ? (
                          <div className="relative w-16 h-16">
                            <Image
                              src={student.passport_photo_url}
                              alt="Passport Photo"
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {student.certificate_url ? (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => window.open(student.certificate_url!, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {tActions('view')}
                          </Button>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {student.aadhaar_card_url ? (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => window.open(student.aadhaar_card_url!, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {tActions('view')}
                          </Button>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            student.category === 'P'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {student.category}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedStudent && (
        <StudentEditModal
          student={selectedStudent}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  )
}
