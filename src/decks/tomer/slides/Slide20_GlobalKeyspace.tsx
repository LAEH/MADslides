/**
 * Slide 20: Global Keyspace and Layout Table
 */
import { BulletSlide } from './layouts'

export default function Slide20_GlobalKeyspace() {
  return (
    <BulletSlide
      title="Global Keyspace & Layout Table"
      bullets={[
        {
          text: 'Global Keyspace:',
          highlight: 'Used to define the "keys" for storing values'
        },
        {
          text: 'Atomic Operations:',
          highlight: 'Multiple key/value pairs can be submitted in an atomic operation'
        },
        {
          text: 'Dynamic Layout Table:',
          highlight: 'Defines how data is distributed across the cluster',
          sub: [
            'CATs are accessed using this layout table',
            'Can change as CATs are added/removed',
            'Enables different load balancing strategies'
          ]
        }
      ]}
    />
  )
}

export const metadata = {
  id: 20,
  title: 'Global Keyspace',
  section: 'Data Plane'
}
