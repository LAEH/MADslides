import { Bot, Sparkles, Hexagon, Brain, Zap } from 'lucide-react'
import styles from './EnablingTechnologies.module.css'

const forces = [
  {
    icon: Bot,
    title: 'PHYSICAL AI',
    description: 'AI breaks into robots, vehicles, factories. Humanoids that reason and adapt.',
    ecosystem: 'Isaac Sim, Jetson Thor, ROS 2',
    solutions: ['Data Ocean', 'Event Engine'],
  },
  {
    icon: Sparkles,
    title: 'COMPUTE = DATA',
    description: 'Synthetic data flips training. Simulation generates scenarios you can\'t collect.',
    ecosystem: 'Omniverse, Cosmos, Databricks',
    solutions: ['Infinite MetaStore', 'Data Ocean'],
  },
  {
    icon: Hexagon,
    title: 'AGENTIC AI',
    description: '40% of enterprise apps embed agents by 2026. Agents manage ERP, CRM, workflows.',
    ecosystem: 'NIM, LangChain, Milvus',
    solutions: ['Event Engine', 'KV-Cache Fabric'],
  },
  {
    icon: Brain,
    title: 'REASONING MODELS',
    description: 'Test-time scaling is the new law. Domain-specific thinking models proliferate.',
    ecosystem: 'TensorRT-LLM, vLLM, Dynamo',
    solutions: ['KV-Cache Fabric', 'Data Ocean'],
  },
  {
    icon: Zap,
    title: 'AI INFRASTRUCTURE',
    description: 'AI becomes utility like electricity. Energy and networking are the bottlenecks.',
    ecosystem: 'BlueField, Spectrum-X, K8s',
    solutions: ['Multi-Tenancy', 'Data Ocean'],
  },
]

export default function EnablingTechnologies() {
  return (
    <div className={styles.container}>
      {/* Header Section - Top Left Aligned, Matching Slides 2 & 3 */}
      <header className={styles.header}>
        <h1 className={styles.title}>Strategic Forces Driving AI Infrastructure</h1>
        <div className={styles.subtitleWrapper}>
          <p className={styles.subtitle}>How DDN powers each strategic force with purpose-built infrastructure</p>
          <div className={styles.subtitleAccent} />
        </div>
      </header>

      {/* 5-Column Grid */}
      <div className={styles.columnsGrid}>
        {forces.map((force, index) => (
          <div key={force.title} className={styles.column}>
            {/* Zone A: Icon */}
            <div className={styles.iconZone}>
              <force.icon size={48} strokeWidth={1.5} className={styles.icon} />
            </div>

            {/* Zone B: Title & Description */}
            <div className={styles.contentZone}>
              <h2 className={styles.forceTitle}>{force.title}</h2>
              <p className={styles.forceDescription}>{force.description}</p>
            </div>

            {/* Ecosystem */}
            <div className={styles.ecosystemZone}>
              <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
              <span className={styles.ecosystemValue}>{force.ecosystem}</span>
            </div>

            {/* Zone C: Connector Line */}
            <div className={styles.connectorZone}>
              <div className={styles.connectorLine} />
            </div>

            {/* Zone D: Solution Chips */}
            <div className={styles.solutionZone}>
              {force.solutions.map((solution) => (
                <div key={solution} className={styles.solutionChip}>
                  {solution}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Foundation Footer */}
      <footer className={styles.footer}>
        <span className={styles.footerText}>POWERED BY THE DDN DATA INTELLIGENCE PLATFORM</span>
      </footer>
    </div>
  )
}
