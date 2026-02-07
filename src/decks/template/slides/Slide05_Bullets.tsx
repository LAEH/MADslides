import { BulletSlide } from '../layouts'

export default function Slide05_Bullets() {
  return (
    <BulletSlide
      title="Key Benefits"
      bullets={[
        {
          text: 'High Performance',
          highlight: 'Up to 10x faster than competitors',
          sub: ['Optimized for AI workloads', 'Low latency access']
        },
        {
          text: 'Enterprise Scale',
          highlight: 'From terabytes to exabytes',
        },
        {
          text: 'Easy Integration',
          highlight: 'Works with existing tools',
          sub: ['S3 compatible', 'NFS support', 'Kubernetes native']
        },
      ]}
    />
  )
}
