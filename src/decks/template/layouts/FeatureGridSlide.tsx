import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from './layouts.module.css'

interface FeatureItem {
  icon: ReactNode
  title: string
  description?: string
}

interface FeatureGridSlideProps {
  title: string
  features: FeatureItem[]
  columns?: 2 | 3 | 4 | 6
  dark?: boolean
}

export default function FeatureGridSlide({
  title,
  features,
  columns = 3,
  dark = false
}: FeatureGridSlideProps) {
  return (
    <section className={`${styles.featureGridSlide} ${dark ? styles.dark : ''}`}>
      <motion.div
        className={styles.featureGridWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.featureGridTitle}>{title}</h1>
        <div
          className={styles.featureGrid}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              {feature.description && (
                <p className={styles.featureDescription}>{feature.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
