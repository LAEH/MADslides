import { Bot, Sparkles, Hexagon, Brain, Zap } from 'lucide-react'
import styles from './DDNEnablingTechnologies.module.css'

const forces = [
  {
    icon: Bot,
    title: 'PHYSICAL AI',
    description: 'AI breaks into robots, vehicles, factories. Humanoids that reason and adapt.',
    ecosystem: 'Isaac Sim, Jetson Thor, ROS 2',
    ddnProducts: 'Data Ocean, Event Engine',
  },
  {
    icon: Sparkles,
    title: 'COMPUTE = DATA',
    description: 'Synthetic data flips training. Simulation generates scenarios you can\'t collect.',
    ecosystem: 'Omniverse, Cosmos, Databricks',
    ddnProducts: 'MetaStore, Data Ocean',
  },
  {
    icon: Hexagon,
    title: 'AGENTIC AI',
    description: '40% of enterprise apps embed agents by 2026. Agents manage ERP, CRM, workflows.',
    ecosystem: 'NIM, LangChain, Milvus',
    ddnProducts: 'Event Engine, KV-Cache',
  },
  {
    icon: Brain,
    title: 'REASONING MODELS',
    description: 'Test-time scaling is the new law. Domain-specific thinking models proliferate.',
    ecosystem: 'TensorRT-LLM, vLLM, Dynamo',
    ddnProducts: 'KV-Cache, Data Ocean',
  },
  {
    icon: Zap,
    title: 'AI INFRASTRUCTURE',
    description: 'AI becomes utility like electricity. Energy and networking are the bottlenecks.',
    ecosystem: 'BlueField, Spectrum-X, K8s',
    ddnProducts: 'Multi-Tenancy, Data Ocean',
  },
]

export default function DDNEnablingTechnologies() {
  return (
    <div className={styles.container}>
      {/* Header Section - Top Left Aligned */}
      <header className={styles.header}>
        <h1 className={styles.title}>DDN Enabling Technologies</h1>
        <div className={styles.subtitleWrapper}>
          <p className={styles.subtitle}>Strategic technology shifts enabling the next generation of AI infrastructure</p>
          <div className={styles.subtitleAccent} />
        </div>
      </header>

      {/* 5-Card Grid with Connector Lines */}
      <div className={styles.cardsWrapper}>
        <div className={styles.cardsGrid}>
          {forces.map((force, index) => (
            <div key={force.title} className={styles.card}>
              {/* Icon in grey rounded box */}
              <div className={styles.iconBox}>
                <force.icon size={28} strokeWidth={1.5} className={styles.icon} />
              </div>

              {/* Title */}
              <h2 className={styles.cardTitle}>{force.title}</h2>

              {/* Description */}
              <p className={styles.cardDescription}>{force.description}</p>

              {/* Ecosystem Section */}
              <div className={styles.ecosystemSection}>
                <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                <span className={styles.ecosystemValue}>{force.ecosystem}</span>
              </div>

              {/* DDN Products */}
              <div className={styles.ddnSection}>
                <span className={styles.ddnLabel}>DDN:</span>
                <span className={styles.ddnValue}>{force.ddnProducts}</span>
              </div>

              {/* Connector Line from Card */}
              <div className={styles.connectorLine}>
                <div className={styles.connectorDot} />
              </div>
            </div>
          ))}
        </div>

        {/* SVG Connector Lines to DDN Logo */}
        <svg className={styles.connectorSvg} viewBox="0 0 1000 120" preserveAspectRatio="none">
          {/* Lines from each card to center */}
          <path d="M 100 0 L 100 40 Q 100 60 120 60 L 500 60" className={styles.connectorPath} />
          <path d="M 300 0 L 300 40 Q 300 60 320 60 L 500 60" className={styles.connectorPath} />
          <path d="M 500 0 L 500 60" className={styles.connectorPath} />
          <path d="M 700 0 L 700 40 Q 700 60 680 60 L 500 60" className={styles.connectorPath} />
          <path d="M 900 0 L 900 40 Q 900 60 880 60 L 500 60" className={styles.connectorPath} />
          {/* Center vertical line down to logo */}
          <path d="M 500 60 L 500 120" className={styles.connectorPath} />
        </svg>

        {/* DDN Logo */}
        <div className={styles.logoWrapper}>
          <img src="/ddn-logo.png" alt="DDN" className={styles.ddnLogo} />
        </div>
      </div>
    </div>
  )
}
