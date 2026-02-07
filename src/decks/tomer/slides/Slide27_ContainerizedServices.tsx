/**
 * Slide 27: Stateless Containerized Services
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide27.module.css'

export default function Slide27_ContainerizedServices() {
  const services = {
    ecosystem: ['Splunk-forwarder', 'Syslog-forwarder'],
    management: ['redsetup (bootstrap & node mgmt)', 'redagent', 'etcd', 'hmi'],
    io: ['redui', 'redapi', 'revproxy', 'config', 'runtime', 'layout', 'registry'],
    data: ['reddaemon', 'redalert', 'redstream', 'healthdb'],
    protocols: ['reds3', 'rednfs', 'redsql', 'redforwarder'],
    infrastructure: ['Registry', 'nameserver']
  }

  return (
    <ContentSlide title="DDN Infinia Stateless Containerized Services">
      <div className={styles.servicesGrid}>
        <div className={styles.category}>
          <h3>Ecosystem Plug-ins</h3>
          <p className={styles.description}>Monitoring, metric collection</p>
          <div className={styles.serviceList}>
            {services.ecosystem.map((s, i) => (
              <span key={i} className={styles.service}>{s}</span>
            ))}
          </div>
        </div>

        <div className={styles.category}>
          <h3>Management</h3>
          <p className={styles.description}>Installation, upgrade, monitoring</p>
          <div className={styles.serviceList}>
            {services.management.map((s, i) => (
              <span key={i} className={styles.service}>{s}</span>
            ))}
          </div>
        </div>

        <div className={styles.category}>
          <h3>I/O Path</h3>
          <p className={styles.description}>UI, API, configuration</p>
          <div className={styles.serviceList}>
            {services.io.map((s, i) => (
              <span key={i} className={styles.service}>{s}</span>
            ))}
          </div>
        </div>

        <div className={styles.category}>
          <h3>Data Services</h3>
          <p className={styles.description}>Core data processing</p>
          <div className={styles.serviceList}>
            {services.data.map((s, i) => (
              <span key={i} className={styles.service}>{s}</span>
            ))}
          </div>
        </div>

        <div className={styles.category}>
          <h3>Protocol Services</h3>
          <p className={styles.description}>S3, NFS, SQL interfaces</p>
          <div className={styles.serviceList}>
            {services.protocols.map((s, i) => (
              <span key={i} className={styles.serviceHighlight}>{s}</span>
            ))}
          </div>
        </div>

        <div className={styles.category}>
          <h3>Infrastructure</h3>
          <p className={styles.description}>Registry and naming</p>
          <div className={styles.serviceList}>
            {services.infrastructure.map((s, i) => (
              <span key={i} className={styles.service}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 27,
  title: 'Containerized Services',
  section: 'Control Plane'
}
