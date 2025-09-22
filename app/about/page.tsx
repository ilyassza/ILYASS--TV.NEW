'use client'

import { motion } from 'framer-motion'
import { Tv, Play, Globe, Users, Code, Star } from 'lucide-react'

export default function AboutPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      titleAr: 'محتوى عالمي',
      titleEn: 'Global Content',
      descriptionAr: 'وصول إلى محتوى من جميع أنحاء العالم',
      descriptionEn: 'Access to content from around the world'
    },
    {
      icon: <Users className="h-8 w-8" />,
      titleAr: 'تجربة مستخدم مميزة',
      titleEn: 'Great User Experience',
      descriptionAr: 'واجهة سهلة الاستخدام ومصممة للجميع',
      descriptionEn: 'User-friendly interface designed for everyone'
    },
    {
      icon: <Code className="h-8 w-8" />,
      titleAr: 'تقنيات حديثة',
      titleEn: 'Modern Technology',
      descriptionAr: 'مبني باستخدام أحدث التقنيات',
      descriptionEn: 'Built using the latest technologies'
    },
    {
      icon: <Star className="h-8 w-8" />,
      titleAr: 'جودة عالية',
      titleEn: 'High Quality',
      descriptionAr: 'محتوى عالي الجودة ومتميز',
      descriptionEn: 'High-quality and premium content'
    }
  ]

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen py-20 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            عن المشروع
            <br />
            <span className="text-2xl sm:text-3xl font-medium text-gray-600 dark:text-gray-400">
              About the Project
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            مشروع متكامل لمشاهدة المباريات والقنوات الرياضية بجودة عالية
            <br />
            An integrated project for watching sports matches and channels in high quality
          </p>
        </motion.div>

        {/* Applications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
        >
          {/* ILYASS TV App */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
                <Tv className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
              ILYASS TV
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              تطبيق متخصص في بث المباريات والقنوات الرياضية مباشرة وبجودة عالية
              <br />
              Specialized app for streaming sports matches and channels live in high quality
            </p>
          </motion.div>

          {/* ILYASS Player */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
                <Play className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
              ILYASS Player
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              مشغل وسائط متطور يدعم جميع الصيغ ويوفر تجربة مشاهدة مميزة
              <br />
              Advanced media player supporting all formats and providing an excellent viewing experience
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-4"
              >
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-400">
                  {feature.icon}
                </div>
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.titleAr}
                <br />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {feature.titleEn}
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.descriptionAr}
                <br />
                {feature.descriptionEn}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}