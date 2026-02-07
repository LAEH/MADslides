/**
 * Slide 26: Easy Management
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide26.module.css'

export default function Slide26_EasyManagement() {
  const features = [
    {
      title: 'Auto-Installation',
      description: '10 minutes to Deploy'
    },
    {
      title: 'Zero Downtime Upgrades',
      description: 'Elastic Expansion'
    },
    {
      title: 'Fast Service Deployment',
      description: 'Deploy new services and tenants in just 4 minutes'
    },
    {
      title: 'Hands-Free QoS',
      description: 'Automated quality of service'
    },
    {
      title: 'Multi-Tenanted Self Service',
      description: 'Tenant self-management capabilities'
    },
    {
      title: 'No LUNs/No Tuning',
      description: 'Simplified storage management'
    }
  ]

  return (
    <ContentSlide title="Easy to Deploy. Easy to Upgrade. Easy to Manage">
      <div className={styles.featureGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 26,
  title: 'Easy Management',
  section: 'Control Plane'
}
