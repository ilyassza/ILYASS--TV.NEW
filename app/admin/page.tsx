'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AlertCircle, Database, Download, Users } from 'lucide-react'

interface AppSettings {
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  appUrl: string
  playerUrl: string
}

interface Statistics {
  totalVisits: number
  totalDownloads: {
    app: number
    player: number
  }
  recentVisits: {
    date: string
    count: number
  }[]
  recentDownloads: {
    date: string
    app: number
    player: number
  }[]
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const [appSettings, setAppSettings] = useState<AppSettings>({
    name: 'ILYASS TV',
    nameEn: 'ILYASS TV',
    description: 'تطبيق مشاهدة القنوات والمباريات المباشرة بجودة عالية',
    descriptionEn: 'Watch live channels and matches in high quality',
    appUrl: '#',
    playerUrl: '#'
  })

  const [stats, setStats] = useState<Statistics>({
    totalVisits: 0,
    totalDownloads: {
      app: 0,
      player: 0
    },
    recentVisits: [],
    recentDownloads: []
  })

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('adminToken')
    if (token) {
      // Validate token with backend
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      // Add your authentication logic here
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        localStorage.setItem('adminToken', 'dummy-token')
        setIsAuthenticated(true)
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      setError('خطأ في تسجيل الدخول. يرجى التحقق من البيانات والمحاولة مرة أخرى.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
  }

  const handleSaveSettings = async () => {
    try {
      // Add your save settings logic here
      console.log('Settings saved:', appSettings)
    } catch (err) {
      setError('حدث خطأ أثناء حفظ الإعدادات')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              تسجيل دخول المشرف
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mr-2 rtl:mr-0 rtl:ml-2" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md transition-colors"
              >
                دخول
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            لوحة التحكم
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            تسجيل خروج
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              الإحصائيات
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">عدد الزوار</h3>
                </div>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.totalVisits.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">مرات التحميل</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {(stats.totalDownloads.app + stats.totalDownloads.player).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Recent Activity Chart would go here */}
          </motion.div>

          {/* App Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Database className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              إعدادات التطبيق
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم التطبيق (عربي)
                </label>
                <input
                  type="text"
                  value={appSettings.name}
                  onChange={(e) => setAppSettings({ ...appSettings, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم التطبيق (إنجليزي)
                </label>
                <input
                  type="text"
                  value={appSettings.nameEn}
                  onChange={(e) => setAppSettings({ ...appSettings, nameEn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  وصف التطبيق (عربي)
                </label>
                <textarea
                  value={appSettings.description}
                  onChange={(e) => setAppSettings({ ...appSettings, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  وصف التطبيق (إنجليزي)
                </label>
                <textarea
                  value={appSettings.descriptionEn}
                  onChange={(e) => setAppSettings({ ...appSettings, descriptionEn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  رابط تحميل التطبيق
                </label>
                <input
                  type="url"
                  value={appSettings.appUrl}
                  onChange={(e) => setAppSettings({ ...appSettings, appUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  رابط تحميل المشغل
                </label>
                <input
                  type="url"
                  value={appSettings.playerUrl}
                  onChange={(e) => setAppSettings({ ...appSettings, playerUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                onClick={handleSaveSettings}
                className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md transition-colors"
              >
                حفظ الإعدادات
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}