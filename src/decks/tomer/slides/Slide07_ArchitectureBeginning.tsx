/**
 * Slide 07: DDN Infinia Architecture - The Beginning
 */
import { DiagramSlide } from './layouts'
import styles from './styles/Slide07.module.css'

export default function Slide07_ArchitectureBeginning() {
  return (
    <DiagramSlide title="DDN Infinia Architecture – the beginning" subtitle="Infinia 2.3 and Beyond">
      <div className={styles.archDiagram}>
        <div className={styles.mainContent}>
          {/* Top Layer - Data Protocols */}
          <div className={styles.layerRow}>
            <div className={styles.layerLabel}>Data Protocols</div>
            <div className={styles.protocolsGrid}>
              <span className={styles.protocolItem}>SQL</span>
              <span className={styles.protocolItem}>RFS</span>
              <span className={styles.protocolItem}>Block</span>
              <span className={styles.protocolItem}>File</span>
              <span className={styles.protocolItem}>Object</span>
            </div>
          </div>

          {/* Protocol Details Row */}
          <div className={styles.protocolDetails}>
            <div className={styles.protocolSpacer}></div>
            <div className={styles.protocolSpacer}></div>
            <div className={styles.protocolGroup}>
              <span>CSI</span>
              <span>Cinder</span>
            </div>
            <div className={styles.protocolGroup}>
              <span>PFS</span>
              <span>NFS</span>
              <span>SMB</span>
              <span>HDFS</span>
            </div>
            <div className={styles.protocolGroup}>
              <span>Computational</span>
              <span>Data mgmt</span>
              <span>Processing</span>
              <div className={styles.subItems}>
                <span className={styles.subItem}>tag</span>
                <span className={styles.subItem}>analytics</span>
              </div>
            </div>
          </div>

          {/* SDK Bar */}
          <div className={styles.sdkBar}>SDK</div>

          {/* Data Plane */}
          <div className={styles.dataPlaneBox}>
            <div className={styles.dataPlaneTitle}>Infinia Data Plane (KV Store)</div>
            <div className={styles.featureGrid}>
              <span>Tag, Search, Store</span>
              <span>Native MultiTenancy</span>
              <span>Dynamic QoS</span>
              <span>Cloud Native</span>
              <span>100% Elastic</span>
              <span>Exascale</span>
            </div>
          </div>

          {/* Storage Plane */}
          <div className={styles.storagePlane}>
            Storage Plane (Hardware/Cloud VM)
          </div>
        </div>

        {/* Control Plane - Side Panel */}
        <div className={styles.controlPlane}>
          <div className={styles.cpTitle}>Control Plane</div>
          <div className={styles.cpItems}>
            <span>Mgmt API</span>
            <span>GUI/CLI</span>
            <span>OTEL</span>
          </div>
        </div>
      </div>
    </DiagramSlide>
  )
}

export const metadata = {
  id: 7,
  title: 'Architecture - The Beginning',
  section: 'Architecture'
}
