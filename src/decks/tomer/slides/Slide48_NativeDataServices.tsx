/**
 * Slide 48: Native Data Services
 */
import { BulletSlide } from './layouts'

export default function Slide48_NativeDataServices() {
  return (
    <BulletSlide
      title="Native Data Services"
      bullets={[
        {
          text: 'Client-Side Libraries:',
          highlight: 'DDN Infinia implements client-side libraries that radically change the datapath'
        },
        {
          text: 'Performance Gain:',
          highlight: 'Deliver 10X higher efficiencies'
        },
        {
          text: 'Key Advantages:',
          sub: [
            'Massively scaled services',
            'DataPath is accelerated with RDMA and fully parallel',
            'No need for back-end erasure coding network'
          ]
        },
        {
          text: 'Infinia Hadoop Accelerator:',
          highlight: 'RDMA erasure coding for Spark applications'
        }
      ]}
    />
  )
}

export const metadata = {
  id: 48,
  title: 'Native Data Services',
  section: 'Data Services'
}
