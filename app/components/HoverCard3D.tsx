'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

interface HoverCard3DProps {
  children: React.ReactNode
  className?: string
}

export default function HoverCard3D({ children, className = '' }: HoverCard3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useTransform(y, [0, 1], [10, -10])
  const rotateY = useTransform(x, [0, 1], [-10, 10])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    
    const newX = mouseX / rect.width
    const newY = mouseY / rect.height
    
    x.set(newX)
    y.set(newY)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0.5)
        y.set(0.5)
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={`relative ${className}`}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary-500/20 to-blue-500/20 blur"
          />
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  )
}