'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await emailjs.send(
        'service_91e158k',
        'template_cb6lljw',
        {
          from_name: formData.fullName,
          from_email: formData.email,
          message: formData.message,
          to_name: 'ILYASS TV Team'
        },
        'O18xeRbToItAAmvYx'
      )

      setStatus('success')
      setFormData({ fullName: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
      console.error('Failed to send email:', error)
    }
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen py-20 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              اتصل بنا
              <br />
              <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">
                Contact Us
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              نحن هنا لمساعدتك والإجابة على استفساراتك
              <br />
              We're here to help and answer any questions you may have
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
          >
            {/* Full Name */}
            <motion.div whileHover="focus" variants={inputVariants}>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الاسم الكامل / Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="أدخل اسمك الكامل / Enter your full name"
              />
            </motion.div>

            {/* Email */}
            <motion.div whileHover="focus" variants={inputVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                البريد الإلكتروني / Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="أدخل بريدك الإلكتروني / Enter your email"
              />
            </motion.div>

            {/* Message */}
            <motion.div whileHover="focus" variants={inputVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الرسالة / Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="اكتب رسالتك هنا / Write your message here"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-200 ${
                status === 'loading'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
              }`}
            >
              {status === 'loading' ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  إرسال / Send
                </>
              )}
            </motion.button>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg"
              >
                تم إرسال رسالتك بنجاح! / Your message has been sent successfully!
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg"
              >
                حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى. / An error occurred while sending your message. Please try again.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </motion.div>
  )
}