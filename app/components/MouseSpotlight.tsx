'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MouseSpotlightProps {
  children: React.ReactNode
}

export default function MouseSpotlight({ children }: MouseSpotlightProps) {
  const [isClient, setIsClient] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const spotlightX = useSpring(mouseX, springConfig)
  const spotlightY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      mouseX.set(clientX)
      mouseY.set(clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!isClient) return <>{children}</>

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(var(--color-primary-500) / 0.05), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}