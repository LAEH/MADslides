import { motion, HTMLMotionProps } from 'framer-motion'
import { ease } from '../../config/motion'
import { ReactNode } from 'react'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'dark' | 'light'
  hover?: boolean
  className?: string
}

export default function GlassCard({
  children,
  variant = 'dark',
  hover = true,
  className = '',
  ...motionProps
}: GlassCardProps) {
  return (
    <motion.div
      className={`${variant === 'dark' ? 'glass-card' : 'glass-card-light'} ${className}`}
      whileHover={hover ? { y: -8, scale: 1.01 } : undefined}
      transition={{ duration: 0.5, ease: ease.out }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
