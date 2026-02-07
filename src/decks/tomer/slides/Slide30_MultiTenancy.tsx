/**
 * Slide 30: Multi-Tenancy Features
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide30.module.css'

export default function Slide30_MultiTenancy() {
  const features = [
    {
      need: 'Core admins, Tenants and Subtenants',
      delivers: 'Multi-Level Tenancy Management'
    },
    {
      need: 'Highly Dynamic',
      delivers: 'Instantly Adjust Services Levels'
    },
    {
      need: 'Reduce Cost',
      delivers: 'Sharing H/W Resources Optimally'
    },
    {
      need: 'Data Isolation',
      delivers: 'Each Tenant/Subtenant Encrypted'
    },
    {
      need: 'Service Levels',
      delivers: 'Adjust Data Protection Levels per Dataset'
    },
    {
      need: 'Effortless Administration',
      delivers: 'Set and Forget. Fully automated QoS'
    }
  ]

  return (
    <ContentSlide title="Instant Tailored Clouds – Versatile, Safe and Cost Optimized">
      <table className={styles.featureTable}>
        <thead>
          <tr>
            <th>Cloud Needed Feature</th>
            <th>DDN Infinia Delivers</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index}>
              <td>{feature.need}</td>
              <td className={styles.delivers}>{feature.delivers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContentSlide>
  )
}

export const metadata = {
  id: 30,
  title: 'Multi-Tenancy',
  section: 'Control Plane'
}
