'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

type Locale = 'en' | 'ta' | 'te'

interface LanguageSwitcherProps {
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const t = useTranslations()

  const languages = [
    { code: 'en' as Locale, label: 'EN', nativeLabel: 'English' },
    { code: 'ta' as Locale, label: 'தமிழ்', nativeLabel: 'தமிழ்' },
    { code: 'te' as Locale, label: 'తెలుగు', nativeLabel: 'తెలుగు' },
  ]

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLocaleChange(lang.code)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            currentLocale === lang.code
              ? 'bg-white text-saffron shadow-md'
              : 'bg-saffron-dark/10 text-white hover:bg-white/20'
          }`}
          title={lang.nativeLabel}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
