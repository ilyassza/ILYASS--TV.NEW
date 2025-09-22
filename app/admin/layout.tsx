'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  
  useEffect(() => {
    // Check authentication on layout load
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  )
}