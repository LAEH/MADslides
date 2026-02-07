import { motion } from 'framer-motion'
import styles from './layouts.module.css'

interface HeroImageSlideProps {
  title: string
  subtitle?: string
  image: string
  badge?: string
  alignment?: 'left' | 'center' | 'right'
  overlay?: 'light' | 'dark' | 'gradient'
}

export default function HeroImageSlide({
  title,
  subtitle,
  image,
  badge,
  alignment = 'left',
  overlay = 'gradient',
}: HeroImageSlideProps) {
  return (
    <section className={styles.heroImageSlide}>
      <div className={styles.heroImageBackground}>
        <img src={image} alt="" className={styles.heroImage} />
        <div className={`${styles.heroOverlay} ${styles[`overlay${overlay.charAt(0).toUpperCase()}${overlay.slice(1)}`]}`} />
      </div>
      <motion.div
        className={`${styles.heroImageContent} ${styles[`align${alignment.charAt(0).toUpperCase()}${alignment.slice(1)}`]}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {badge && (
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {badge}
          </motion.div>
        )}
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
      </motion.div>
    </section>
  )
}
