'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Tv, Play, ChevronDown, Globe, Android, Apple, AlertTriangle } from 'lucide-react'
import HoverCard3D from '../components/HoverCard3D'
import { fadeInUp, staggerContainer, buttonHoverEffect } from '../styles/shared'

interface AppVersion {
  platform: string
  version: string
  size: string
  appUrl: string
  playerUrl?: string
  icon: JSX.Element
}

interface App {
  id: number
  name: string
  description: string
  icon: JSX.Element
  versions: AppVersion[]
  requiresPlayer?: boolean
}

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  version: AppVersion
  appName: string
  requiresPlayer: boolean
}

function DownloadModal({ isOpen, onClose, version, appName, requiresPlayer }: DownloadModalProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle')

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadStatus('downloading')

    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (requiresPlayer) {
        // Download both app and player
        window.open(version.appUrl, '_blank')
        if (version.playerUrl) {
          window.open(version.playerUrl, '_blank')
        }
      } else {
        // Download only the app
        window.open(version.appUrl, '_blank')
      }
      
      setDownloadStatus('success')
    } catch (error) {
      setDownloadStatus('error')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              تحميل {appName}
            </h3>

            {requiresPlayer && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg flex items-start">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mr-2 rtl:mr-0 rtl:ml-2 mt-0.5" />
                <p className="text-right">
                  هذا التطبيق يتطلب تحميل المشغل للعمل بشكل صحيح. سيتم تحميل كلاهما عند الضغط على زر التحميل.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <div className="text-primary-600 dark:text-primary-400">
                    {version.icon}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {version.platform}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {version.version} • {version.size}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                {...buttonHoverEffect}
                disabled={isDownloading}
                onClick={handleDownload}
                className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isDownloading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    تحميل {requiresPlayer ? 'التطبيق والمشغل' : 'التطبيق'}
                  </>
                )}
              </motion.button>

              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function DownloadsPage() {
  const [expandedApp, setExpandedApp] = useState<number | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<{ app: App, version: AppVersion } | null>(null)

  const apps: App[] = [
    {
      id: 1,
      name: 'ILYASS TV',
      description: 'تطبيق مشاهدة القنوات والمباريات المباشرة بجودة عالية',
      icon: <Tv className="h-12 w-12" />,
      requiresPlayer: true,
      versions: [
        {
          platform: 'Android',
          version: 'v2.0.0',
          size: '15 MB',
          appUrl: '#app-android',
          playerUrl: '#player-android',
          icon: <Android className="h-5 w-5" />
        },
        {
          platform: 'iOS',
          version: 'v2.0.0',
          size: '18 MB',
          appUrl: '#app-ios',
          playerUrl: '#player-ios',
          icon: <Apple className="h-5 w-5" />
        },
        {
          platform: 'Web',
          version: 'v2.0.0',
          size: 'Online',
          appUrl: '#app-web',
          icon: <Globe className="h-5 w-5" />
        }
      ]
    },
    {
      id: 2,
      name: 'ILYASS Player',
      description: 'مشغل فيديو متقدم لتشغيل جميع أنواع الملفات',
      icon: <Play className="h-12 w-12" />,
      versions: [
        {
          platform: 'Android',
          version: 'v1.5.0',
          size: '12 MB',
          appUrl: '#player-android',
          icon: <Android className="h-5 w-5" />
        },
        {
          platform: 'iOS',
          version: 'v1.5.0',
          size: '14 MB',
          appUrl: '#player-ios',
          icon: <Apple className="h-5 w-5" />
        }
      ]
    }
  ]

  const handleVersionClick = (app: App, version: AppVersion) => {
    setSelectedVersion({ app, version })
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="min-h-screen py-20 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              تحميل التطبيقات
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              اختر التطبيق والإصدار المناسب لجهازك
            </p>
          </motion.div>

          {/* Apps Grid */}
          <div className="max-w-4xl mx-auto space-y-8">
            {apps.map((app) => (
              <HoverCard3D key={app.id}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* App Header */}
                  <motion.div
                    className="p-8 cursor-pointer"
                    onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
                          <motion.div
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="text-primary-600 dark:text-primary-400"
                          >
                            {app.icon}
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {app.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">
                            {app.description}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedApp === app.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-6 w-6 text-gray-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Versions List */}
                  <AnimatePresence>
                    {expandedApp === app.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="p-8 grid gap-4 sm:grid-cols-2">
                          {app.versions.map((version, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                            >
                              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                                  <div className="text-primary-600 dark:text-primary-400">
                                    {version.icon}
                                  </div>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900 dark:text-white">
                                    {version.platform}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {version.version} • {version.size}
                                  </p>
                                </div>
                              </div>
                              <motion.button
                                {...buttonHoverEffect}
                                onClick={() => handleVersionClick(app, version)}
                                className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                              >
                                <Download className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                                تحميل
                              </motion.button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </HoverCard3D>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Download Modal */}
      {selectedVersion && (
        <DownloadModal
          isOpen={!!selectedVersion}
          onClose={() => setSelectedVersion(null)}
          version={selectedVersion.version}
          appName={selectedVersion.app.name}
          requiresPlayer={!!selectedVersion.app.requiresPlayer}
        />
      )}
    </>
  )
}