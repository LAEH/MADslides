/**
 * Slide 50: S3 Compatibility Details
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide50.module.css'

export default function Slide50_S3Compatibility() {
  const testResults = [
    { category: 'ACL', passed: 19, failed: 1 },
    { category: 'Bucket Operations', passed: 28, failed: 3 },
    { category: 'Bucket Policy', passed: 15, failed: 2 },
    { category: 'Copy Operations', passed: 4, failed: 4 },
    { category: 'CORS', passed: 18, failed: 0 },
    { category: 'General', passed: 35, failed: 12 },
    { category: 'Get/Put', passed: 25, failed: 2 },
    { category: 'Headers', passed: 36, failed: 12 },
    { category: 'List Bucket', passed: 77, failed: 6 },
    { category: 'MPU', passed: 16, failed: 8 },
    { category: 'Object Copy', passed: 17, failed: 0 },
    { category: 'Versioning', passed: 18, failed: 4 }
  ]

  const totalPassed = testResults.reduce((sum, r) => sum + r.passed, 0)
  const totalFailed = testResults.reduce((sum, r) => sum + r.failed, 0)
  const percentage = Math.round((totalPassed / (totalPassed + totalFailed)) * 100)

  return (
    <ContentSlide title="S3 Compatibility Details">
      <div className={styles.content}>
        <div className={styles.highlight}>
          <span className={styles.percentage}>&gt;{percentage}%</span>
          <span className={styles.label}>S3 Compliant</span>
          <p className={styles.note}>Most competitive products are in the 50-60% range at best</p>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>Category</th>
                <th className={styles.passed}>Passed</th>
                <th className={styles.failed}>Failed</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.category}</td>
                  <td className={styles.passed}>{result.passed}</td>
                  <td className={styles.failed}>{result.failed}</td>
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td>Total</td>
                <td className={styles.passed}>{totalPassed}</td>
                <td className={styles.failed}>{totalFailed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 50,
  title: 'S3 Compatibility',
  section: 'Data Services'
}
