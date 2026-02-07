/**
 * Slide 53: RED SQL Overview
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide53.module.css'

export default function Slide53_REDSQL() {
  return (
    <ContentSlide title="RED SQL Overview">
      <div className={styles.content}>
        <div className={styles.description}>
          <h3>Distributed Relational Database Service</h3>
          <ul>
            <li>Built on RED KV</li>
            <li>Metadata catalog for exploring RED metadata via SQL interface</li>
            <li>Multi-tenanted data services</li>
          </ul>
        </div>

        <div className={styles.dataPlane}>
          <div className={styles.dataPlaneLabel}>RED DATA PLANE</div>
          <div className={styles.services}>
            <span>File</span>
            <span>KV</span>
            <span>Block</span>
            <span>Object</span>
            <span className={styles.highlight}>SQL</span>
          </div>
        </div>

        <div className={styles.examples}>
          <h4>Example Queries</h4>
          <div className={styles.codeBlock}>
            <code>
              <span className={styles.comment}>-- 10 largest files in the dataset</span><br/>
              <span className={styles.keyword}>SELECT</span> path, size <span className={styles.keyword}>FROM</span> redfs<br/>
              <span className={styles.keyword}>ORDER BY</span> size <span className={styles.keyword}>DESC LIMIT</span> 10;
            </code>
          </div>
          <div className={styles.codeBlock}>
            <code>
              <span className={styles.comment}>-- List of objects accessed within the past day</span><br/>
              <span className={styles.keyword}>SELECT</span> path, atime, mtime, ctime <span className={styles.keyword}>FROM</span> redfs<br/>
              <span className={styles.keyword}>WHERE</span> age(CURRENT_TIMESTAMP, atime) &lt; interval '1 day';
            </code>
          </div>
        </div>
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 53,
  title: 'RED SQL',
  section: 'Data Services'
}
