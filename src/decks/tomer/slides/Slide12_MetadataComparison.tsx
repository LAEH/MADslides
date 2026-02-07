/**
 * Slide 12: Metadata Challenge Comparison
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide12.module.css'

export default function Slide12_MetadataComparison() {
  return (
    <ContentSlide title="The metadata challenge" subtitle="Comparing storage approaches">
      <div className={styles.comparisonGrid}>
        <div className={styles.comparisonCard}>
          <h3>Block Storage</h3>
          <p className={styles.quote}>"The raw foundation"</p>
          <div className={styles.traits}>
            <span className={styles.traitGood}>Low latency</span>
            <span className={styles.traitGood}>Media optimized</span>
            <span className={styles.traitBad}>No context</span>
          </div>
        </div>
        <div className={styles.comparisonCard}>
          <h3>File Systems</h3>
          <p className={styles.quote}>"Grouping the data"</p>
          <div className={styles.traits}>
            <span className={styles.traitGood}>High throughput</span>
            <span className={styles.traitNeutral}>Limited media optimization</span>
            <span className={styles.traitNeutral}>Limited context</span>
          </div>
        </div>
        <div className={styles.comparisonCardHighlight}>
          <h3>Database</h3>
          <p className={styles.quote}>"Understanding the context"</p>
          <div className={styles.traits}>
            <span className={styles.traitBad}>Low throughput</span>
            <span className={styles.traitNeutral}>"What is media?"</span>
            <span className={styles.traitGood}>Excellent context</span>
          </div>
        </div>
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 12,
  title: 'Metadata Challenge Comparison',
  section: 'Data Plane'
}
