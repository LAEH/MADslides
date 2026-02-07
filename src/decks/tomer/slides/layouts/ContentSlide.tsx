import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/layouts.module.css'

interface ContentSlideProps {
  title: string
  children: ReactNode
  subtitle?: string
  dark?: boolean
}

export default function ContentSlide({ title, children, subtitle, dark = false }: ContentSlideProps) {
  return (
    <section className={`${styles.contentSlide} ${dark ? styles.dark : ''}`}>
      <motion.div
        className={styles.contentWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.contentHeader}>
          <h1 className={styles.contentTitle}>{title}</h1>
          {subtitle && <p className={styles.contentSubtitle}>{subtitle}</p>}
        </div>
        <div className={styles.contentBody}>
          {children}
        </div>
      </motion.div>
    </section>
  )
}
