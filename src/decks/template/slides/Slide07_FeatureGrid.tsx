import { FeatureGridSlide } from '../layouts'
import { Zap, Shield, Globe, BarChart3, Cpu, Cloud } from 'lucide-react'

export default function Slide07_FeatureGrid() {
  return (
    <FeatureGridSlide
      title="Platform Capabilities"
      columns={3}
      features={[
        {
          icon: <Zap size={32} />,
          title: 'High Performance',
          description: 'Blazing fast data access with optimized I/O paths'
        },
        {
          icon: <Shield size={32} />,
          title: 'Enterprise Security',
          description: 'End-to-end encryption and compliance ready'
        },
        {
          icon: <Globe size={32} />,
          title: 'Global Scale',
          description: 'Distributed architecture for worldwide deployment'
        },
        {
          icon: <BarChart3 size={32} />,
          title: 'Analytics Ready',
          description: 'Built-in observability and monitoring'
        },
        {
          icon: <Cpu size={32} />,
          title: 'AI Optimized',
          description: 'Purpose-built for machine learning workloads'
        },
        {
          icon: <Cloud size={32} />,
          title: 'Hybrid Cloud',
          description: 'Seamless on-prem and cloud integration'
        },
      ]}
    />
  )
}
