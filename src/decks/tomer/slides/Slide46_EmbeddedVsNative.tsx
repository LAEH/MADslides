/**
 * Slide 46: Embedded vs Native Data Services
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide46.module.css'

export default function Slide46_EmbeddedVsNative() {
  return (
    <ContentSlide title="Data Service Types">
      <div className={styles.comparison}>
        <div className={styles.card}>
          <h3>"Embedded" Data Services</h3>
          <p className={styles.description}>
            Provide data access using "standard" protocols such as Object (S3/GCS/Azure), NFS, SMB, SQL, Native HDFS, etc.
          </p>
          <ul>
            <li>Translate from standard protocols to redfs</li>
            <li>Looks like a client to redcore services</li>
            <li>Still runs on RED controlled nodes</li>
          </ul>
        </div>

        <div className={`${styles.card} ${styles.highlight}`}>
          <h3>"Native" Data Services</h3>
          <p className={styles.description}>
            Services that interact directly with the RED data plane for maximum performance.
          </p>
          <ul>
            <li>Direct integration with RED KV store</li>
            <li>Optimized for low latency</li>
            <li>Client-side acceleration capabilities</li>
          </ul>
        </div>
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 46,
  title: 'Embedded vs Native',
  section: 'Data Services'
}
