'use client'

import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LanguageSwitcher() {
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState('ar')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Get the current locale from the URL or localStorage
    const savedLocale = localStorage.getItem('locale') || 'ar'
    setCurrentLocale(savedLocale)
  }, [])

  const switchLanguage = (locale: string) => {
    localStorage.setItem('locale', locale)
    setCurrentLocale(locale)
    // Refresh the page with the new locale
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
      >
        <Globe className="h-5 w-5" />
        <span>{currentLocale === 'ar' ? 'العربية' : 'English'}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-xl"
        >
          <button
            onClick={() => switchLanguage('ar')}
            className={`w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
              currentLocale === 'ar' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => switchLanguage('en')}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
              currentLocale === 'en' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            English
          </button>
        </motion.div>
      )}
    </div>
  )
}