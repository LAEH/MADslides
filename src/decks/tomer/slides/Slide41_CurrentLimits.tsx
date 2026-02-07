/**
 * Slide 41: Current Limits
 */
import { BulletSlide } from './layouts'

export default function Slide41_CurrentLimits() {
  return (
    <BulletSlide
      title="Current Limits"
      bullets={[
        {
          text: 'Max tenants and subtenants:',
          highlight: '10'
        },
        {
          text: 'Maximum datasets per tenant:',
          highlight: '10,000 (block data services and/or buckets)'
        },
        {
          text: 'Maximum datasets per cluster:',
          highlight: '100,000 (block data services and/or buckets)'
        },
        {
          text: 'Note:',
          highlight: 'Most limits are testing limits – IDs allow much higher numbers'
        }
      ]}
    />
  )
}

export const metadata = {
  id: 41,
  title: 'Current Limits',
  section: 'Control Plane'
}
