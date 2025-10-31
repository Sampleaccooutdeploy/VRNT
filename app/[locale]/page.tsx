'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { StudentDetails } from '@/components/StudentDetails'
import { Student, searchStudents } from '@/lib/supabaseClient'
import { useParams, useRouter } from 'next/navigation'

export default function HomePage() {
  const t = useTranslations('tables')
  const params = useParams()
  const router = useRouter()
  const locale = (params.locale as 'en' | 'ta' | 'te') || 'en'

  const [searchResults, setSearchResults] = useState<Student[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setHasSearched(false)
      setCurrentQuery('')
      return
    }

    setIsSearching(true)
    setHasSearched(true)
    setCurrentQuery(query)
    
    try {
      const { data, error } = await searchStudents(query)
      
      if (error) {
        console.error('Search error:', error)
        setSearchResults([])
        return
      }

      if (data) {
        setSearchResults(data)
      }
    } catch (error) {
      console.error('Error loading students:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  const handleLocaleChange = (newLocale: 'en' | 'ta' | 'te') => {
    router.push(`/${newLocale}`)
  }

  const handleStudentUpdated = () => {
    // Reload the current search results
    if (currentQuery) {
      handleSearch(currentQuery)
    }
  }

  return (
    <div className="min-h-screen">
      <Header locale={locale} onLocaleChange={handleLocaleChange} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        )}

        {/* No Results */}
        {!isSearching && hasSearched && searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No students found. Try a different search term.
            </p>
          </div>
        )}

        {/* Search Results */}
        {!isSearching && searchResults.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-saffron mb-6 border-b-4 border-saffron/30 pb-3">
              Search Results ({searchResults.length} {searchResults.length === 1 ? 'student' : 'students'} found)
            </h2>
            
            {searchResults.map((student) => (
              <StudentDetails
                key={student.id}
                student={student}
                onStudentUpdated={handleStudentUpdated}
              />
            ))}
          </div>
        )}

        {/* Initial State */}
        {!isSearching && !hasSearched && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <svg
                  className="mx-auto h-24 w-24 text-saffron/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Search for a Student
              </h3>
              <p className="text-gray-500">
                Enter a UID to find student details
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
