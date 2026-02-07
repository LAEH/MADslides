import { motion } from 'framer-motion'
import styles from './layouts.module.css'

interface TitleSlideProps {
  title: string
  subtitle?: string
  tags?: string[]
  badge?: string
}

export default function TitleSlide({ title, subtitle, tags, badge }: TitleSlideProps) {
  return (
    <section className={styles.titleSlide}>
      <div className={styles.titleBackground}>
        <div className={styles.titleGlow} />
      </div>
      <motion.div
        className={styles.titleContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.titleText}>{title}</h1>
        {subtitle && <p className={styles.titleSubtitle}>{subtitle}</p>}
        {tags && tags.length > 0 && (
          <div className={styles.titleTags}>
            {tags.map((tag, i) => (
              <span key={i} className={styles.titleTag}>[ {tag} ]</span>
            ))}
          </div>
        )}
        {badge && <div className={styles.titleBadge}>{badge}</div>}
      </motion.div>
    </section>
  )
}
