import { motion } from 'framer-motion'
import styles from '../styles/layouts.module.css'

interface BulletItem {
  text: string
  highlight?: string
  sub?: string[]
}

interface BulletSlideProps {
  title: string
  bullets: BulletItem[]
  dark?: boolean
}

export default function BulletSlide({ title, bullets, dark = false }: BulletSlideProps) {
  return (
    <section className={`${styles.bulletSlide} ${dark ? styles.dark : ''}`}>
      <motion.div
        className={styles.bulletWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.bulletTitle}>{title}</h1>
        <ul className={styles.bulletList}>
          {bullets.map((item, i) => (
            <motion.li
              key={i}
              className={styles.bulletItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className={styles.bulletText}>
                {item.text}
                {item.highlight && (
                  <>
                    {' '}<span className={styles.bulletArrow}>→</span>{' '}
                    <span className={styles.bulletHighlight}>{item.highlight}</span>
                  </>
                )}
              </span>
              {item.sub && item.sub.length > 0 && (
                <ul className={styles.bulletSubList}>
                  {item.sub.map((subItem, j) => (
                    <li key={j} className={styles.bulletSubItem}>{subItem}</li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
