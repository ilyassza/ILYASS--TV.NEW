import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import MouseSpotlight from './components/MouseSpotlight'
import Header from './components/Header'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'

const cairo = Cairo({ 
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: 'ILYASS TV - مرحباً بك في ILYASS TV',
  description: 'قم بتحميل التطبيقات الخاصة بمشاهدة المباريات بسهولة',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans antialiased bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 selection:bg-primary-500/20 selection:text-primary-700 dark:selection:text-primary-300`}>
        <ThemeProvider>
          <MouseSpotlight>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <PageTransition>
                <main className="flex-grow">
                  {children}
                </main>
              </PageTransition>
              <Footer />
              <ScrollToTop />
            </div>
          </MouseSpotlight>
        </ThemeProvider>
      </body>
    </html>
  )
}