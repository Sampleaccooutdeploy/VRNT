'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { useTranslations } from 'next-intl'

interface SearchBarProps {
  onSearch: (query: string) => void
  isSearching: boolean
}

export function SearchBar({ onSearch, isSearching }: SearchBarProps) {
  const t = useTranslations('search')
  const [query, setQuery] = useState('')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-14 text-lg shadow-lg border-2 focus:border-saffron"
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-saffron border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}
