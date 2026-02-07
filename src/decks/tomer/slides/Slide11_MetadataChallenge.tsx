/**
 * Slide 11: The Metadata Challenge
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide11.module.css'

export default function Slide11_MetadataChallenge() {
  return (
    <ContentSlide title="The metadata challenge" subtitle="Traditional scalable parallel storage solutions had hard time handling metadata ('traditional HPC roots'). What if we can rethink the whole thing?">
      <div className={styles.storageTypes}>
        <div className={styles.storageCard}>
          <h3>Block Storage</h3>
          <p className={styles.storageQuote}>"The raw foundation"</p>
          <p className={styles.storageDesc}>Consists of simple collection of 0s and 1s with no inherent context</p>
        </div>
        <div className={styles.storageCard}>
          <h3>File Systems</h3>
          <p className={styles.storageQuote}>"Grouping the data"</p>
          <p className={styles.storageDesc}>Raw 0s and 1s are bundled to form files/objects. Files are organized within a directory/folder structure for location. Metadata adds more context</p>
        </div>
        <div className={styles.storageCardHighlight}>
          <h3>Database</h3>
          <p className={styles.storageQuote}>"Understanding the context"</p>
          <p className={styles.storageDesc}>The system provides much better understanding of what the data "means". Organize smaller pieces of data into an efficient, structured format</p>
        </div>
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 11,
  title: 'The Metadata Challenge',
  section: 'Data Plane'
}
