/**
 * Slide 40: Capability Matrix
 */
import { ContentSlide } from './layouts'
import styles from './styles/Slide40.module.css'

export default function Slide40_CapabilityMatrix() {
  const capabilities = [
    {
      scope: 'Realm',
      admin: ['Manage Realm resource', 'Manage Realm Users/Groups', 'Manage Tenants', 'Manage Realm Capabilities'],
      viewer: ['View Realm resources', 'View Realm Users/Groups', 'View Tenants'],
      dataAccess: ['-']
    },
    {
      scope: 'Tenant',
      admin: ['Manage Tenant users/Groups', 'Manage Subtenants', 'Manage Tenant Capabilities'],
      viewer: ['View tenant Resources', 'View tenant users/groups', 'View Subtenants'],
      dataAccess: ['-']
    },
    {
      scope: 'Subtenant',
      admin: ['Manage Data Services', 'Manage Subtenant Capabilities'],
      viewer: ['View subtenant resources', 'View Data Services'],
      dataAccess: ['-']
    },
    {
      scope: 'Data Service',
      admin: ['Manage existing data services'],
      viewer: ['View Data Service Resources'],
      dataAccess: ['Access data in buckets owned by S3 data service', 'Execute API commands on block Data Services']
    }
  ]

  return (
    <ContentSlide title="Capability Matrix">
      <div className={styles.tableContainer}>
        <table className={styles.capabilityTable}>
          <thead>
            <tr>
              <th>Scope</th>
              <th>Admin</th>
              <th>Viewer</th>
              <th>Data-access / Service</th>
            </tr>
          </thead>
          <tbody>
            {capabilities.map((row, index) => (
              <tr key={index}>
                <td className={styles.scopeCell}>{row.scope}</td>
                <td>
                  <ul>
                    {row.admin.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {row.viewer.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {row.dataAccess.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContentSlide>
  )
}

export const metadata = {
  id: 40,
  title: 'Capability Matrix',
  section: 'Control Plane'
}
