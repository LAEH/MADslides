import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/layouts.module.css'

interface DiagramSlideProps {
  title: string
  children: ReactNode
  subtitle?: string
  dark?: boolean
  fullWidth?: boolean
}

export default function DiagramSlide({
  title,
  children,
  subtitle,
  dark = false,
  fullWidth = false
}: DiagramSlideProps) {
  return (
    <section className={`${styles.diagramSlide} ${dark ? styles.dark : ''}`}>
      <motion.div
        className={`${styles.diagramWrapper} ${fullWidth ? styles.fullWidth : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.diagramHeader}>
          <h1 className={styles.diagramTitle}>{title}</h1>
          {subtitle && <p className={styles.diagramSubtitle}>{subtitle}</p>}
        </div>
        <div className={styles.diagramContent}>
          {children}
        </div>
      </motion.div>
    </section>
  )
}
