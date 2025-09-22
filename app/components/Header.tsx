'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import { Sun, Moon, Menu, X, Globe, Home, Download, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HoverCard3D from './HoverCard3D'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isEnglish, setIsEnglish] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) setIsEnglish(savedLang === 'en')

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLang = !isEnglish
    setIsEnglish(newLang)
    localStorage.setItem('language', newLang ? 'en' : 'ar')
    document.documentElement.lang = newLang ? 'en' : 'ar'
    document.documentElement.dir = newLang ? 'ltr' : 'rtl'
  }

  const navLinks = [
    { href: '/', icon: <Home className="w-5 h-5" />, label: { ar: 'الرئيسية', en: 'Home' } },
    { href: '/downloads', icon: <Download className="w-5 h-5" />, label: { ar: 'التحميل', en: 'Downloads' } },
    { href: '/contact', icon: <Phone className="w-5 h-5" />, label: { ar: 'اتصل بنا', en: 'Contact' } },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <HoverCard3D>
              <motion.h1
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold text-primary-600 dark:text-primary-400"
              >
                ILYASS TV
              </motion.h1>
            </HoverCard3D>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <HoverCard3D key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center space-x-2 rtl:space-x-reverse text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                    isActive(link.href) ? 'text-primary-600 dark:text-primary-400' : ''
                  }`}
                >
                  {link.icon}
                  <span className="relative">
                    {isEnglish ? link.label.en : link.label.ar}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 bottom-[-4px]"
                      />
                    )}
                  </span>
                </Link>
              </HoverCard3D>
            ))}
          </nav>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-700 dark:text-gray-300"
              aria-label="Toggle Language"
            >
              <Globe className="w-5 h-5" />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                    isActive(link.href) ? 'text-primary-600 dark:text-primary-400' : ''
                  }`}
                >
                  {link.label.ar}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}