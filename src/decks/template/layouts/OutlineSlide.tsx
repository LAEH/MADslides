import { motion } from 'framer-motion'
import styles from './layouts.module.css'

interface OutlineItem {
  title: string
  active?: boolean
}

interface OutlineSlideProps {
  title: string
  items: OutlineItem[]
}

export default function OutlineSlide({ title, items }: OutlineSlideProps) {
  return (
    <section className={styles.outlineSlide}>
      <motion.div
        className={styles.outlineWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.outlineTitle}>{title}</h1>
        <div className={styles.outlineList}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.outlineItem} ${item.active ? styles.active : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className={styles.outlineNumber}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.outlineText}>{item.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
