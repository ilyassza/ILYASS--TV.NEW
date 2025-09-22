'use client'

import { useEffect, useState } from 'react'
import { Users, Download, RefreshCw } from 'lucide-react'

export default function StatisticsSection() {
  const [counters, setCounters] = useState({
    users: 0,
    downloads: 0,
    updates: 0
  })

  const finalCounts = {
    users: 50000,
    downloads: 125000,
    updates: 45
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    const incrementCounters = () => {
      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setCounters({
          users: Math.floor(finalCounts.users * progress),
          downloads: Math.floor(finalCounts.downloads * progress),
          updates: Math.floor(finalCounts.updates * progress)
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounters(finalCounts)
        }
      }, stepDuration)
    }

    // Start animation when component mounts
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          incrementCounters()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById('statistics')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      count: counters.users.toLocaleString(),
      label: 'مستخدم نشط',
      labelEn: 'Active Users'
    },
    {
      icon: <Download className="h-8 w-8" />,
      count: counters.downloads.toLocaleString(),
      label: 'تحميل',
      labelEn: 'Downloads'
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      count: counters.updates,
      label: 'تحديث',
      labelEn: 'Updates'
    }
  ]

  return (
    <section id="statistics" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            إحصائياتنا
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            أرقام تعكس ثقة المستخدمين في خدماتنا
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center border border-gray-200 dark:border-gray-700"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-400">
                  {stat.icon}
                </div>
              </div>

              {/* Count */}
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.count}
              </div>

              {/* Label */}
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}