import { motion } from 'framer-motion'
import styles from '../styles/layouts.module.css'

interface SectionSlideProps {
  title: string
  subtitle?: string
  dark?: boolean
}

export default function SectionSlide({ title, subtitle, dark = false }: SectionSlideProps) {
  return (
    <section className={`${styles.sectionSlide} ${dark ? styles.dark : ''}`}>
      <motion.div
        className={styles.sectionContent}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.sectionTitle}>{title}</h1>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </motion.div>
    </section>
  )
}
