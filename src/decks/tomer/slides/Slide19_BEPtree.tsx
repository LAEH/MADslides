/**
 * Slide 19: Beta Epsilon Tree Comparison
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide19.module.css'

export default function Slide19_BEPtree() {
  return (
    <ContentSlide title="Beta Epsilon Tree (BEPtree) – Data Structure Showdown">
      <div className={styles.container}>
        {/* Three diagram cards */}
        <div className={styles.cardsRow}>
          {/* B-tree Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>B-tree</span>
              <span className={styles.cardSubtitle}>(The Query-Focused Standard)</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.btreeDiagram}>
                {/* Level 0 */}
                <div className={styles.treeLevel}>
                  <div className={styles.treeNode}>
                    <span className={styles.nodeBox}></span>
                    <span className={styles.nodeBox}></span>
                    <span className={styles.nodeBox}></span>
                  </div>
                </div>
                {/* Level 1 */}
                <div className={styles.treeLevel}>
                  <div className={styles.treeNode}>
                    <span className={styles.nodeBox}></span>
                    <span className={styles.nodeBox}></span>
                  </div>
                  <div className={styles.treeNode}>
                    <span className={styles.nodeBox}></span>
                    <span className={styles.nodeBox}></span>
                    <span className={styles.nodeBox}></span>
                  </div>
                </div>
                {/* Level 2 - Leaf nodes */}
                <div className={styles.treeLevel}>
                  <div className={styles.leafNode}>
                    <span className={styles.leafGreen}></span>
                    <span className={styles.leafOrange}></span>
                    <span className={styles.leafRed}></span>
                    <span className={styles.leafBlue}></span>
                  </div>
                  <div className={styles.leafNode}>
                    <span className={styles.leafPurple}></span>
                    <span className={styles.leafPurple}></span>
                  </div>
                  <div className={styles.leafNode}>
                    <span className={styles.leafPurple}></span>
                    <span className={styles.leafPurple}></span>
                  </div>
                  <div className={styles.leafNode}>
                    <span className={styles.leafPurple}></span>
                    <span className={styles.leafPurple}></span>
                    <span className={styles.leafPurple}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LSM-tree Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>LSM-tree</span>
              <span className={styles.cardSubtitle}>(The Merge-Based Competitor)</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.lsmDiagram}>
                <div className={styles.lsmLevels}>
                  <div className={styles.lsmLevel1}></div>
                  <div className={styles.lsmLevel2}></div>
                  <div className={styles.lsmLevel3}></div>
                </div>
                <div className={styles.lsmArrows}>↓ ↓ ↓</div>
                <div className={styles.lsmBottom}>
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
              <p className={styles.lsmDesc}>Consists of multiple tree levels that are <strong>periodically merged</strong>.</p>
            </div>
          </div>

          {/* BEPtree Card */}
          <div className={`${styles.card} ${styles.cardDark}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>B<sub>ε</sub>-tree</span>
              <span className={styles.cardSubtitle}>(The Write-Optimized Hybrid)</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.bepDiagram}>
                <div className={styles.bepNode}>
                  <div className={styles.bepBuffer}>
                    <span className={styles.bufYellow}></span>
                    <span className={styles.bufBlue}></span>
                    <span className={styles.bufPink}></span>
                  </div>
                </div>
                <div className={styles.bepLevel}>
                  <div className={styles.bepNode}>
                    <div className={styles.bepBuffer}>
                      <span className={styles.bufYellow}></span>
                      <span className={styles.bufBlue}></span>
                    </div>
                  </div>
                  <div className={styles.bepNode}>
                    <div className={styles.bepBuffer}>
                      <span className={styles.bufPink}></span>
                      <span className={styles.bufYellow}></span>
                    </div>
                  </div>
                  <div className={styles.bepNode}>
                    <div className={styles.bepBuffer}>
                      <span className={styles.bufBlue}></span>
                    </div>
                  </div>
                </div>
                <div className={styles.bepStorage}>
                  <span className={styles.storageOrange}></span>
                  <span className={styles.storagePurple}></span>
                </div>
              </div>
              <div className={styles.bepDesc}>
                <p><strong>Batches updates using buffers in internal nodes.</strong></p>
                <p className={styles.bepSmall}>Inserts become messages that accumulate in buffers and are flushed in efficient batches.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th>Metric</th>
              <th>B-Tree</th>
              <th className={styles.highlight}>BEPtree</th>
              <th>LSM-Tree</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.metricCell}>Best for</td>
              <td>Query-heavy workloads</td>
              <td className={styles.highlight}>High Inserts & Mixed workloads</td>
              <td>Write-Heavy, point-query wklds</td>
            </tr>
            <tr>
              <td className={styles.metricCell}>Insert Speed</td>
              <td className={styles.bad}>Slow</td>
              <td className={`${styles.highlight} ${styles.good}`}>Very Fast</td>
              <td className={styles.good}>Very Fast</td>
            </tr>
            <tr>
              <td className={styles.metricCell}>Range Query</td>
              <td className={styles.neutral}>OK</td>
              <td className={`${styles.highlight} ${styles.good}`}>Excellent</td>
              <td className={styles.bad}>Poor</td>
            </tr>
          </tbody>
        </table>

        <p className={styles.source}>
          Source: <a href="https://www.usenix.org/system/files/login/articles/login_oct15_05_bender.pdf" target="_blank" rel="noopener noreferrer">
            USENIX - An Introduction to Bε-trees
          </a>
        </p>
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 19,
  title: 'BEPtree Comparison',
  section: 'Data Plane'
}
