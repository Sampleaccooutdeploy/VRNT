'use client'

import { useState, useRef, ChangeEvent, DragEvent } from 'react'
import { useTranslations } from 'next-intl'
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { Student, updateStudent, uploadFile, deleteFile } from '@/lib/supabaseClient'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface StudentEditModalProps {
  student: Student
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export function StudentEditModal({ student, isOpen, onClose, onSave }: StudentEditModalProps) {
  const t = useTranslations('fields')
  const tActions = useTranslations('actions')
  const tModal = useTranslations('modal')
  const tMessages = useTranslations('messages')

  const [formData, setFormData] = useState<Partial<Student>>(student)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingFile, setUploadingFile] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const photoInputRef = useRef<HTMLInputElement>(null)
  const certificateInputRef = useRef<HTMLInputElement>(null)
  const aadhaarInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof Student, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (
    file: File,
    fileType: 'passport' | 'certificate' | 'aadhaar'
  ) => {
    setUploadingFile(fileType)
    setUploadError(null)
    setUploadSuccess(null)

    try {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB')
      }

      // Validate file type for passport photos
      if (fileType === 'passport') {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
          throw new Error('Please upload a valid image file (JPG, PNG, or WebP)')
        }
      }

      const { url, error } = await uploadFile(student.id, file, fileType)
      
      if (error) {
        throw new Error(error)
      }

      if (url) {
        const urlField = fileType === 'passport' 
          ? 'passport_photo_url'
          : fileType === 'certificate'
          ? 'certificate_url'
          : 'aadhaar_card_url'
        
        setFormData((prev) => ({ ...prev, [urlField]: url }))
        setUploadSuccess(`${fileType === 'passport' ? 'Photo' : 'File'} uploaded successfully!`)
        
        // Auto-clear success message after 3 seconds
        setTimeout(() => setUploadSuccess(null), 3000)
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      const errorMessage = error.message || 'Failed to upload file. Please try again.'
      setUploadError(errorMessage)
    } finally {
      setUploadingFile(null)
    }
  }

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    fileType: 'passport' | 'certificate' | 'aadhaar'
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      await handleFileUpload(file, fileType)
    }
    // Reset input so the same file can be selected again if needed
    e.target.value = ''
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const { error } = await updateStudent(student.id, formData)
      
      if (error) throw error

      alert(tMessages('saveSuccess'))
      onSave()
    } catch (error) {
      console.error('Save error:', error)
      alert(tMessages('saveError'))
    } finally {
      setIsSaving(false)
    }
  }

  // Drag and drop handlers
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      await handleFileUpload(file, 'passport')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppins">{tModal('editStudent')}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Update student information, certification details, and upload documents
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">{tModal('basicInfo')}</TabsTrigger>
            <TabsTrigger value="family">{tModal('familyVedicInfo')}</TabsTrigger>
            <TabsTrigger value="certification">{tModal('certificationInfo')}</TabsTrigger>
            <TabsTrigger value="documents">{tModal('documents')}</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="uid">{t('uid')}</Label>
                <Input
                  id="uid"
                  value={formData.uid || ''}
                  onChange={(e) => handleInputChange('uid', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  value={formData.name_aadhar || ''}
                  onChange={(e) => handleInputChange('name_aadhar', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">{t('mobile')}</Label>
                <Input
                  id="mobile"
                  value={formData.mobile_number || ''}
                  onChange={(e) => handleInputChange('mobile_number', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email_id || ''}
                  onChange={(e) => handleInputChange('email_id', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">{t('dob')}</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.date_of_birth || ''}
                  onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhaar">{t('aadhaarNumber')}</Label>
                <Input
                  id="aadhaar"
                  value={formData.aadhaar_number || ''}
                  onChange={(e) => handleInputChange('aadhaar_number', e.target.value)}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">{t('address')}</Label>
                <Input
                  id="address"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          {/* Family & Vedic Information Tab */}
          <TabsContent value="family" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatherName">{t('fatherName')}</Label>
                <Input
                  id="fatherName"
                  value={formData.father_name || ''}
                  onChange={(e) => handleInputChange('father_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vedham">{t('vedham')}</Label>
                <Input
                  id="vedham"
                  value={formData.vedham || ''}
                  onChange={(e) => handleInputChange('vedham', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shaka">{t('shaka')}</Label>
                <Input
                  id="shaka"
                  value={formData.shaka || ''}
                  onChange={(e) => handleInputChange('shaka', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gothram">{t('gothram')}</Label>
                <Input
                  id="gothram"
                  value={formData.gothram || ''}
                  onChange={(e) => handleInputChange('gothram', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soothram">{t('soothram')}</Label>
                <Input
                  id="soothram"
                  value={formData.soothram || ''}
                  onChange={(e) => handleInputChange('soothram', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          {/* Certification Information Tab */}
          <TabsContent value="certification" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="certifiedIn">{t('certifiedIn')}</Label>
                <Input
                  id="certifiedIn"
                  value={formData.certified_in || ''}
                  onChange={(e) => handleInputChange('certified_in', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">{t('year')}</Label>
                <Input
                  id="year"
                  value={formData.year_of_certification || ''}
                  onChange={(e) => handleInputChange('year_of_certification', e.target.value)}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="school">{t('school')}</Label>
                <Input
                  id="school"
                  value={formData.school || ''}
                  onChange={(e) => handleInputChange('school', e.target.value)}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="vedaAdhyapakar">{t('vedaAdhyapakar')}</Label>
                <Input
                  id="vedaAdhyapakar"
                  value={formData.veda_adhyapakar_name || ''}
                  onChange={(e) => handleInputChange('veda_adhyapakar_name', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6 mt-4">
            {/* Error/Success Messages */}
            {uploadError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">Upload Error</p>
                    <p className="text-sm text-red-600 mt-1">{uploadError}</p>
                  </div>
                  <button
                    onClick={() => setUploadError(null)}
                    className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {uploadSuccess && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700 font-medium">{uploadSuccess}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Passport Photo - Featured Upload with Drag & Drop */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">{t('passportPhoto')}</Label>
              <div 
                className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-lg border-2 transition-all ${
                  isDragging 
                    ? 'border-saffron bg-saffron/10 border-solid' 
                    : 'border-dashed border-saffron/30 bg-gradient-to-br from-saffron/5 to-saffron/10'
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {/* Photo Preview */}
                <div className="relative w-48 h-48 rounded-lg overflow-hidden border-4 border-white shadow-xl bg-white flex-shrink-0">
                  {formData.passport_photo_url ? (
                    <Image
                      src={formData.passport_photo_url}
                      alt="Profile Picture"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500 px-2">
                          {isDragging ? 'Drop photo here' : 'No photo uploaded'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Upload Controls */}
                <div className="flex flex-col gap-3 flex-1">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center">
                        <Upload className="h-4 w-4 text-saffron" />
                      </div>
                      Upload Profile Picture
                    </h4>
                    <p className="text-sm text-gray-600">
                      Upload a clear passport-size photo to be displayed on the student profile.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded text-xs text-gray-700 space-y-1">
                      <p><strong>File size:</strong> Maximum 5MB</p>
                      <p><strong>Formats:</strong> JPG, PNG, or WebP</p>
                      <p><strong>Recommended:</strong> 300×300 pixels or larger with good lighting</p>
                    </div>
                  </div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'passport')}
                  />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      type="button"
                      variant="default"
                      className="bg-saffron hover:bg-saffron-dark flex-1"
                      onClick={() => photoInputRef.current?.click()}
                      disabled={uploadingFile === 'passport'}
                    >
                      {uploadingFile === 'passport' ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          {formData.passport_photo_url ? 'Change Photo' : 'Choose Photo'}
                        </>
                      )}
                    </Button>
                    {formData.passport_photo_url && (
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-300"
                        onClick={() => window.open(formData.passport_photo_url!, '_blank')}
                      >
                        View Full Size
                      </Button>
                    )}
                  </div>
                  {formData.passport_photo_url && (
                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="font-medium">Photo uploaded successfully</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Tip: Drag and drop an image file onto the preview area above
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6"></div>

            {/* Certificate */}
            <div className="space-y-2">
              <Label>{t('certificate')}</Label>
              <div className="flex items-center gap-4">
                {formData.certificate_url && (
                  <a
                    href={formData.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {tActions('view')}
                  </a>
                )}
                <div className="flex flex-col gap-2">
                  <input
                    ref={certificateInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'certificate')}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => certificateInputRef.current?.click()}
                    disabled={uploadingFile === 'certificate'}
                  >
                    {uploadingFile === 'certificate' ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    {tActions('upload')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Aadhaar Card */}
            <div className="space-y-2">
              <Label>{t('aadhaarCard')}</Label>
              <div className="flex items-center gap-4">
                {formData.aadhaar_card_url && (
                  <a
                    href={formData.aadhaar_card_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {tActions('view')}
                  </a>
                )}
                <div className="flex flex-col gap-2">
                  <input
                    ref={aadhaarInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'aadhaar')}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => aadhaarInputRef.current?.click()}
                    disabled={uploadingFile === 'aadhaar'}
                  >
                    {uploadingFile === 'aadhaar' ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    {tActions('upload')}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            {tActions('cancel')}
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-saffron hover:bg-saffron-dark">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              tActions('save')
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
