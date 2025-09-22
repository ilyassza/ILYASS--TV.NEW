import { Variants } from 'framer-motion'

// Animation variants for consistent animations across components
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export const scaleInOut = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { duration: 0.3 }
}

export const buttonHoverEffect = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
}

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Color scheme
export const colors = {
  primary: {
    50: 'var(--color-primary-50)',
    100: 'var(--color-primary-100)',
    200: 'var(--color-primary-200)',
    300: 'var(--color-primary-300)',
    400: 'var(--color-primary-400)',
    500: 'var(--color-primary-500)',
    600: 'var(--color-primary-600)',
    700: 'var(--color-primary-700)',
    800: 'var(--color-primary-800)',
    900: 'var(--color-primary-900)',
  }
}

// Common styles
export const styles = {
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  card: 'bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300',
  input: 'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
  button: {
    primary: 'px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300',
    secondary: 'px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300'
  },
  heading: {
    h1: 'text-4xl sm:text-5xl font-bold',
    h2: 'text-3xl sm:text-4xl font-bold',
    h3: 'text-2xl sm:text-3xl font-bold',
    h4: 'text-xl sm:text-2xl font-bold'
  },
  gradients: {
    primary: 'bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800',
    secondary: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
  }
}