'use client'

import { ChevronDown } from 'lucide-react'
import { 
  MotionSection, 
  MotionH1, 
  MotionSpan, 
  MotionP, 
  MotionButton, 
  MotionDiv 
} from './MotionComponents'

export default function HeroSection() {
  const scrollToDownload = () => {
    const element = document.getElementById('download')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const scaleOnHover = {
    scale: 1.05,
    transition: { duration: 0.2 }
  }

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 pt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <MotionH1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <MotionSpan
              variants={fadeInUp}
              className="block text-primary-600 dark:text-primary-400 mb-2"
            >
              مرحباً بك في ILYASS TV
            </MotionSpan>
            <MotionSpan
              variants={fadeInUp}
              className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700 dark:text-gray-300"
            >
              Welcome to ILYASS TV
            </MotionSpan>
          </MotionH1>

          {/* Description */}
          <MotionP
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            قم بتحميل التطبيقات الخاصة بمشاهدة المباريات بسهولة
            <br />
            <span className="text-base sm:text-lg">
              Download apps for watching matches easily
            </span>
          </MotionP>

          {/* CTA Button */}
          <MotionButton
            onClick={scrollToDownload}
            whileHover={scaleOnHover}
            whileTap={{ scale: 0.95 }}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300"
          >
            تحميل التطبيقات
            <ChevronDown className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5" />
          </MotionButton>

          {/* Scroll Indicator */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <MotionDiv
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-600" />
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  )
}