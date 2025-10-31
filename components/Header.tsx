'use client'

import Image from 'next/image'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslations } from 'next-intl'

interface HeaderProps {
  locale: 'en' | 'ta' | 'te'
  onLocaleChange: (locale: 'en' | 'ta' | 'te') => void
}

export function Header({ locale, onLocaleChange }: HeaderProps) {
  const t = useTranslations('header')

  return (
    <header className="w-full bg-gradient-to-br from-saffron via-[#ff9933] to-saffron shadow-2xl relative overflow-hidden">
      {/* Diagonal stripe pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.2) 35px, rgba(255,255,255,0.2) 70px)'
        }}></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 relative z-10">
        {/* Language Switcher - Top Right, Above Guru Banner */}
        <div className="flex justify-end mb-1">
          <LanguageSwitcher currentLocale={locale} onLocaleChange={onLocaleChange} />
        </div>

        {/* Top: Guru Banner */}
        <div className="flex justify-center mb-1 sm:mb-2">
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl h-14 sm:h-16 md:h-20 lg:h-24">
            <Image
              src="/images/guru-banner.jpg"
              alt="Sri Guru Parampara"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Bottom: Text Content */}
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="mb-0.5 sm:mb-1">
              <p className="text-white text-[0.6rem] sm:text-xs md:text-sm font-semibold tracking-wide sm:tracking-wider uppercase drop-shadow-md">
                SRI GURUBYO NAMAHA, SRI VEDA VYASA NAMAHA.
              </p>
            </div>
            
            {/* Title Image - VEDA RAKSHANA NIDHI TRUST Logo */}
            <div className="flex justify-center mb-0.5 sm:mb-1">
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-12 sm:h-16 md:h-18 lg:h-20">
                <Image
                  src="/images/title-text.png"
                  alt="veda rakṣhanā nidhi truṣt"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
            
            <div className="text-[0.55rem] sm:text-xs md:text-sm font-medium text-white tracking-wide drop-shadow-md space-y-0.5">
              <p>64/31, Subramaniam Street, West Mambalam, Chennai - 600 033</p>
              <p className="italic hidden sm:block">
                Sponsored by His Holiness Pujya Sri Maha Swamigal (Paramacharyal) of SRI KANCHI KAMAKOTI PEETAM, KANCHIPURAM.
              </p>
              <p className="italic sm:hidden text-[0.5rem]">
                Sponsored by His Holiness Pujya Sri Maha Swamigal (Paramacharyal)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="h-1 bg-gradient-to-r from-white via-green-600 to-white"></div>
    </header>
  )
}
