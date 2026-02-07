import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePresentationMode } from '../components/Layout'
import Slide from '../components/Slide'
import KVCacheAnimation from '../components/KVCacheAnimation'
import AIDemandCharts from '../components/AIDemandCharts'
import DataIntelligenceDashboard from '../components/DataIntelligenceDashboard'
import DDNEnablingTechnologies from '../components/DDNEnablingTechnologies'
import EnablingTechnologies from '../components/EnablingTechnologies'
import styles from './StrategyRoadmap.module.css'
import {
  Bot, Sparkles, Hexagon, Brain, Zap,
  Database, GitBranch, Layers, Cloud, Shield,
  TrendingUp, Server, Cpu, HardDrive, Activity,
  CheckCircle2, ArrowRight, Building2, Beaker,
  Network, Box, Check
} from 'lucide-react'

export default function StrategyRoadmap() {
  const presentation = usePresentationMode()

  // Set total slides count
  useEffect(() => {
    if (presentation) {
      presentation.setTotalSlides(14)
    }
  }, [presentation])

  return (
    <div className={styles.demo}>
      {/* Slide 1: Title */}
      <Slide index={0} >
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGlow} />
          </div>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              <span className={styles.ddnText}>DDN</span> Strategic Roadmap
            </h1>
            <p className={styles.heroSubtitle}>January 2026</p>
            <div className={styles.ndaBadge}>NDA ONLY</div>
          </motion.div>
        </section>
      </Slide>

      {/* Slide 2: Five Forces Reshaping AI */}
      <Slide index={1} >
        <section className={styles.fiveForcesSection}>
          <header className={styles.slideHeader}>
            <h1 className={styles.slideTitleMixed}><span className={styles.titleAccent}>Five Forces</span> Reshaping AI</h1>
            <div className={styles.slideSubtitleWrapper}>
              <p className={styles.slideSubtitle}>Strategic technology shifts enabling the next generation of AI infrastructure</p>
              <div className={styles.slideSubtitleAccent} />
            </div>
          </header>

          <div className={styles.forcesGrid}>
            <motion.div 
              className={styles.forceCardImage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.forceImageWrapper}>
                <img src="/forces/physical-ai.png" alt="Physical AI" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>PHYSICAL AI</h3>
                <p className={styles.forceDesc}>AI breaks into robots, vehicles, factories. Humanoids that reason and adapt.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>Isaac Sim, Jetson Thor, ROS 2</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.forceCardImage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.forceImageWrapper}>
                <img src="/forces/compute-data.png" alt="Synthetic Data" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>SYNTHETIC DATA</h3>
                <p className={styles.forceDesc}>Synthetic data flips training. Simulation generates scenarios you can't collect.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>Omniverse, Cosmos, Databricks</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.forceCardImage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={styles.forceImageWrapper}>
                <img src="/forces/agentic-ai.png" alt="Agentic AI" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>AGENTIC AI</h3>
                <p className={styles.forceDesc}>40% of enterprise apps embed agents by 2026. Agents manage ERP, CRM, workflows.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>NIM, LangChain, Milvus</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.forceCardImage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={styles.forceImageWrapper}>
                <img src="/forces/reasoning-models.png" alt="Reasoning Models" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>REASONING MODELS</h3>
                <p className={styles.forceDesc}>Test-time scaling is the new law. Domain-specific thinking models proliferate.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>TensorRT-LLM, vLLM, Dynamo</span>
                </div>
              </div>
            </motion.div>

            <div className={styles.forceCardImage}>
              <motion.div 
                className={styles.forceImageWrapper}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <img src="/forces/ai-infrastructure.png" alt="AI Infrastructure" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </motion.div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>AI INFRASTRUCTURE</h3>
                <p className={styles.forceDesc}>AI becomes utility like electricity. Energy and networking are the bottlenecks.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>BlueField, Spectrum-X, K8s</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Slide>

      {/* Slide 3: DDN Enabling Technologies - SAME cards as Slide 2 + DDN products + logo */}
      <Slide index={2} >
        <section className={styles.fiveForcesSection}>
          <header className={styles.slideHeader}>
            <h1 className={styles.slideTitleMixed}><span className={styles.titleAccent}>DDN</span> Enabling Technologies</h1>
            <div className={styles.slideSubtitleWrapper}>
              <p className={styles.slideSubtitle}>How DDN powers each strategic force with purpose-built infrastructure</p>
              <div className={styles.slideSubtitleAccent} />
            </div>
          </header>

          <div className={styles.forcesGrid}>
            <div className={styles.forceCardImage}>
              <div className={styles.forceImageWrapper}>
                <img src="/forces/physical-ai.png" alt="Physical AI" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>PHYSICAL AI</h3>
                <p className={styles.forceDesc}>AI breaks into robots, vehicles, factories. Humanoids that reason and adapt.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>Isaac Sim, Jetson Thor, ROS 2</span>
                </div>
                <div className={styles.forceDdn}>
                  <span className={styles.ddnLabel}>DDN:</span>
                  <span className={styles.ddnValue}>Data Ocean, Event Engine</span>
                </div>
              </div>
            </div>

            <div className={styles.forceCardImage}>
              <div className={styles.forceImageWrapper}>
                <img src="/forces/compute-data.png" alt="Synthetic Data" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>SYNTHETIC DATA</h3>
                <p className={styles.forceDesc}>Synthetic data flips training. Simulation generates scenarios you can't collect.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>Omniverse, Cosmos, Databricks</span>
                </div>
                <div className={styles.forceDdn}>
                  <span className={styles.ddnLabel}>DDN:</span>
                  <span className={styles.ddnValue}>Infinite MetaStore, Data Ocean</span>
                </div>
              </div>
            </div>

            <div className={styles.forceCardImage}>
              <div className={styles.forceImageWrapper}>
                <img src="/forces/agentic-ai.png" alt="Agentic AI" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>AGENTIC AI</h3>
                <p className={styles.forceDesc}>40% of enterprise apps embed agents by 2026. Agents manage ERP, CRM, workflows.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>NIM, LangChain, Milvus</span>
                </div>
                <div className={styles.forceDdn}>
                  <span className={styles.ddnLabel}>DDN:</span>
                  <span className={styles.ddnValue}>Event Engine, KV-Cache Fabric</span>
                </div>
              </div>
            </div>

            <div className={styles.forceCardImage}>
              <div className={styles.forceImageWrapper}>
                <img src="/forces/reasoning-models.png" alt="Reasoning Models" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>REASONING MODELS</h3>
                <p className={styles.forceDesc}>Test-time scaling is the new law. Domain-specific thinking models proliferate.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>TensorRT-LLM, vLLM, Dynamo</span>
                </div>
                <div className={styles.forceDdn}>
                  <span className={styles.ddnLabel}>DDN:</span>
                  <span className={styles.ddnValue}>KV-Cache Fabric, Data Ocean</span>
                </div>
              </div>
            </div>

            <div className={styles.forceCardImage}>
              <div className={styles.forceImageWrapper}>
                <img src="/forces/ai-infrastructure.png" alt="AI Infrastructure" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContent}>
                <h3 className={styles.forceTitle}>AI INFRASTRUCTURE</h3>
                <p className={styles.forceDesc}>AI becomes utility like electricity. Energy and networking are the bottlenecks.</p>
                <div className={styles.forceEcosystem}>
                  <span className={styles.ecosystemLabel}>ECOSYSTEM</span>
                  <span>BlueField, Spectrum-X, K8s</span>
                </div>
                <div className={styles.forceDdn}>
                  <span className={styles.ddnLabel}>DDN:</span>
                  <span className={styles.ddnValue}>Multi-Tenancy, Data Ocean</span>
                </div>
              </div>
            </div>
          </div>

          {/* DDN Logo under cards */}
          <div className={styles.ddnLogoRow}>
            <img src="/ddn-logo.png" alt="DDN" className={styles.ddnLogoCenter} />
          </div>
        </section>
      </Slide>

      {/* Slide 4: How DDN Enables the AI Transformation - Same cards as Slide 2 & 3 + Bento Box */}
      <Slide index={3} >
        <section className={styles.fiveForcesSection}>
          <header className={styles.slideHeader}>
            <h1 className={styles.slideTitleMixed}>How <span className={styles.titleAccent}>DDN</span> Enables the AI Transformation</h1>
            <div className={styles.slideSubtitleWrapper}>
              <p className={styles.slideSubtitle}>Platform architecture and strategic capabilities, 2025-2030</p>
              <div className={styles.slideSubtitleAccent} />
            </div>
          </header>

          {/* Top Row: 5 Forces as Image Cards (same as Slides 2 & 3) */}
          <div className={styles.forcesGridCompact}>
            <div className={styles.forceCardCompact}>
              <div className={styles.forceImageWrapperCompact}>
                <img src="/forces/physical-ai.png" alt="Physical AI" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContentCompact}>
                <h3 className={styles.forceTitleCompact}>PHYSICAL AI</h3>
              </div>
            </div>

            <div className={styles.forceCardCompact}>
              <div className={styles.forceImageWrapperCompact}>
                <img src="/forces/compute-data.png" alt="Synthetic Data" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContentCompact}>
                <h3 className={styles.forceTitleCompact}>SYNTHETIC DATA</h3>
              </div>
            </div>

            <div className={styles.forceCardCompact}>
              <div className={styles.forceImageWrapperCompact}>
                <img src="/forces/agentic-ai.png" alt="Agentic AI" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContentCompact}>
                <h3 className={styles.forceTitleCompact}>AGENTIC AI</h3>
              </div>
            </div>

            <div className={styles.forceCardCompact}>
              <div className={styles.forceImageWrapperCompact}>
                <img src="/forces/reasoning-models.png" alt="Reasoning Models" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContentCompact}>
                <h3 className={styles.forceTitleCompact}>REASONING MODELS</h3>
              </div>
            </div>

            <div className={styles.forceCardCompact}>
              <div className={styles.forceImageWrapperCompact}>
                <img src="/forces/ai-infrastructure.png" alt="AI Infrastructure" className={styles.forceImage} />
                <div className={styles.forceImageOverlay} />
              </div>
              <div className={styles.forceContentCompact}>
                <h3 className={styles.forceTitleCompact}>AI INFRASTRUCTURE</h3>
              </div>
            </div>
          </div>

          {/* Bento Box: Platform Layers */}
          <div className={styles.bentoBox}>
            {/* Row 1: Agent Layer | Event Engine | Inference Fabric */}
            <div className={styles.bentoRow}>
              <div className={styles.bentoCard}>
                <h4 className={styles.bentoTitle}>AGENT LAYER</h4>
                <p className={styles.bentoSubtitle}>Orchestration</p>
                <p className={styles.bentoContent}>Agent Runtime, NIM, RAG, Tool Memory</p>
              </div>
              <div className={styles.bentoCard}>
                <h4 className={styles.bentoTitle}>EVENT ENGINE</h4>
                <p className={styles.bentoSubtitle}>Pipelines and Triggers</p>
                <p className={styles.bentoContentAccent}>Triggers, Lineage, Audit, Catalog</p>
              </div>
              <div className={styles.bentoCard}>
                <h4 className={styles.bentoTitle}>INFERENCE FABRIC</h4>
                <p className={styles.bentoSubtitle}>KV Cache + Context</p>
                <p className={styles.bentoContentAccent}>NIXL/Dynamo, Context Memory, Vector Index</p>
              </div>
            </div>

            {/* Row 2: Data Ocean (wide) | Infinite Metastore */}
            <div className={styles.bentoRow}>
              <div className={styles.bentoCardWide}>
                <h4 className={styles.bentoTitle}>DATA OCEAN</h4>
                <p className={styles.bentoSubtitle}>Global Namespace</p>
                <p className={styles.bentoContent}>Multi-Cloud, Edge Sync, On-Prem, Unified Access</p>
                <p className={styles.bentoSmall}>Clouds: GCP, AWS, OCI, Edge</p>
              </div>
              <div className={styles.bentoCard}>
                <h4 className={styles.bentoTitle}>INFINITE METASTORE</h4>
                <p className={styles.bentoSubtitle}>Data Intelligence</p>
                <p className={styles.bentoContentAccent}>Exabyte Catalog, Lineage, Hot/Warm/Cold, Tagging</p>
              </div>
            </div>

            {/* Row 3: DDN Data Plane (full width, gradient) */}
            <div className={styles.bentoDataPlane}>
              <h4 className={styles.dataPlaneTitle}>DDN DATA PLANE</h4>
              <p className={styles.dataPlaneSubtitle}>Software Defined</p>
              <p className={styles.dataPlaneContent}>
                Fast Writes, Fast Reads, Low Latency, Sub-ms Metadata, Encryption, 10K Tenants, Zero Trust, Multi-Protocol
              </p>
            </div>
          </div>

          {/* Infrastructure Targets Footer */}
          <div className={styles.infraTargets}>
            Infrastructure targets: <span>HyperPOD</span> | <span>GPU Nodes</span> | <span>BlueField DPUs</span> | <span>Storage</span> | <span>GCP</span> | <span>OCI</span> | <span>Edge</span>
          </div>
        </section>
      </Slide>

      {/* Slide 5: The DDN Data Intelligence Platform */}
      <Slide index={4} >
        <section className={styles.dashboardSection}>
          <DataIntelligenceDashboard />
        </section>
      </Slide>

      {/* Slide 6: Insane Demand for AI Data-Compute */}
      <Slide index={5} >
        <section className={styles.contentSection}>
          <header className={styles.slideHeader}>
            <h1 className={styles.slideTitleMixed}>Insane Demand for <span className={styles.titleAccent}>AI Data-Compute</span></h1>
            <div className={styles.slideSubtitleWrapper}>
              <p className={styles.slideSubtitleLarge}>AI Needs the Performance and Scale <span className={styles.titleAccent}>Only DDN can Deliver</span></p>
            </div>
          </header>

          <AIDemandCharts />
        </section>
      </Slide>

      {/* Slide 7: Use Case - Pediatric Cancer */}
      <Slide index={6} >
        <section className={styles.useCaseSection}>
          <header className={styles.useCaseHeader}>
            <span className={styles.useCaseBadge}>USE CASE</span>
            <h1 className={styles.useCaseTitle}>Accelerating Cures for Rare Pediatric Cancers</h1>
            <p className={styles.useCaseSubtitle}>All 5 AI transformations converging to find treatments faster</p>
          </header>

          <div className={styles.useCaseLayout}>
            {/* Top Row */}
            <div className={styles.useCaseTopRow}>
              <div className={styles.ucCard}>
                <span className={styles.ucLabel}>AI INFRASTRUCTURE</span>
                <h4>Secure Research Cloud</h4>
                <p>HIPAA-compliant AI platform. Federated learning across 200+ partner hospitals without moving patient data.</p>
              </div>

              <div className={styles.ucCard}>
                <span className={styles.ucLabel}>COMPUTE = DATA</span>
                <h4>Synthetic Patient Cohorts</h4>
                <p>Generate 100K virtual patients for cancers with only 50 real cases/year. Train models on rare mutations safely.</p>
              </div>
            </div>

            {/* Center - Precision Oncology Lab */}
            <div className={styles.ucCenterCard}>
              <span className={styles.ucLabelCenter}>PHYSICAL AI</span>
              <h3>PRECISION ONCOLOGY LAB</h3>
              <p>Robotic drug screening • Automated genomic sequencing • 24/7 cell culture</p>
            </div>

            {/* Bottom Row */}
            <div className={styles.useCaseBottomRow}>
              <div className={styles.ucCard}>
                <span className={styles.ucLabel}>REASONING MODEL</span>
                <h4>Genomic Interpreter</h4>
                <p>"Mutation in SMARCB1 suggests rhabdoid tumor—recommending EZH2 inhibitor trial."</p>
              </div>

              <div className={styles.ucCard}>
                <span className={styles.ucLabel}>AGENTIC AI</span>
                <h4>Clinical Trial Matcher</h4>
                <p>Scans 10K active trials globally. Matches patient profile to eligibility criteria in seconds.</p>
              </div>
            </div>
          </div>

          <p className={styles.useCaseFootnote}>Illustrative scenario for pediatric oncology research</p>
        </section>
      </Slide>

      {/* Slide 8: Infinia 2026/27 Roadmap */}
      <Slide index={7} >
        <section className={styles.contentSection}>
          <header className={styles.slideHeader}>
            <h1 className={styles.slideTitleMixed}><span className={styles.titleAccent}>Infinia</span> 2026/27 Roadmap</h1>
          </header>

          <div className={styles.roadmapTable}>
            <div className={styles.roadmapHeader}>
              <div className={styles.roadmapCol}>Timeline</div>
              <div className={styles.roadmapCol}>CY 2026 Q1</div>
              <div className={styles.roadmapCol}>CY 2026 Q2</div>
              <div className={styles.roadmapCol}>CY 2026 H2</div>
              <div className={styles.roadmapCol}>CY 2027 H1</div>
            </div>

            <div className={styles.roadmapRow}>
              <div className={styles.roadmapCategory}>Data Services</div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>High performance S3 at scale (240 nodes)</li>
                  <li>Multi-tenancy – storage isolation, access control per tenant</li>
                  <li>POSIX Phase 1 (POC)</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Tiering for S3 Object lifecycle</li>
                  <li>Hybrid cloud replication, global namespace (S3)</li>
                  <li>POSIX Phase 1 GA (mostly Q3)</li>
                  <li className={styles.highlight}>S3 RDMA</li>
                  <li className={styles.highlight}>S3 QoS per tenant</li>
                  <li>Network Isolation (vLAN) for Data Services</li>
                  <li>S3 Object Lock</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Inference acceleration with NIXL</li>
                  <li>POSIX phase 2 and GPU Direct and File over RDMA</li>
                  <li>Checkpointing Optimization with Infinia</li>
                  <li>Async replication</li>
                  <li>Multi-tenant Network QoS</li>
                  <li className={styles.highlight}>Native message bus (Kafka replacement)</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Tenant/Meta data driven policy-based tiering/replication</li>
                  <li>Multi-tenancy for NVIDIA AI service (NIM, Triton, Nemo, CuOpt, RAG)</li>
                  <li>Hybrid cloud replication, cloud object tiering, global namespace</li>
                </ul>
              </div>
            </div>

            <div className={styles.roadmapRow}>
              <div className={styles.roadmapCategory}>Control Plane</div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>SDK</li>
                  <li>CLI</li>
                  <li>Custom operators for Grafana/Prometheus</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>UI/UX and API for Automation and orchestration</li>
                  <li>Observability – cluster, services health, Tenant usage</li>
                  <li className={styles.highlight}>SQL plugin for native metadata search</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Non-disruptive maintenance for failed components</li>
                  <li>Per tenant lifecycle management</li>
                  <li>Self Service Tenant management</li>
                  <li className={styles.highlight}>S3 Bucket notification</li>
                  <li className={styles.highlight}>Extended metadata search</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>NCP Management and orchestration</li>
                  <li>Usage analytics, RPO/RTO, heatmaps, API-driven automation</li>
                </ul>
              </div>
            </div>

            <div className={styles.roadmapRow}>
              <div className={styles.roadmapCategory}>AI Framework and Ecosystem</div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Cisco server qualification</li>
                  <li>CSI for Block (Basic)</li>
                  <li>OCI Private Offer</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>AIDP Stack Reference architecture and validation</li>
                  <li>ASUS server qualification</li>
                  <li>Hadoop connectors</li>
                  <li>KV-Cache and PyTorch Data Loaders</li>
                  <li>Apache Iceberg support (S3)</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>NVIDIA ICMS support for longer context</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>DDN-Managed services</li>
                  <li>Infinia delivered as managed services (SaaS model)</li>
                </ul>
              </div>
            </div>

            <div className={styles.roadmapRow}>
              <div className={styles.roadmapCategory}>Support and Serviceability</div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Encryption and Key Management (KMIP) per tenant</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Call home data processing</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Automated alerts</li>
                  <li>Automated incident creation</li>
                  <li>Tenant base audit logging</li>
                  <li>Perf. (TTFT) & Availability (data hall) SLA</li>
                </ul>
              </div>
              <div className={styles.roadmapCell}>
                <ul>
                  <li>Supply chain integration (FRU replacement)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Slide>

      {/* Slide 9: 2026 Strategy */}
      <Slide index={8} >
        <section className={styles.contentSection}>
          <header className={styles.strategyHeader}>
            <p className={styles.strategyTagline}>DDN MAKES AI DEPLOYABLE, SCALABLE, AND MONETIZABLE THROUGH DATA INTELLIGENCE</p>
            <h1 className={styles.slideTitleMixed}>
              <span className={styles.titleAccent}>2026:</span> Convert more workloads to AI, increase AI utilization, shorten time from AI intent to production.
            </h1>
          </header>

          <div className={styles.strategyGrid}>
            <div className={styles.strategyCard}>
              <CheckCircle2 className={styles.strategyCheck} size={24} />
              <h3>Industry-Specific AI Pipelines</h3>
              <div className={styles.strategyCardContent}>
                <p>Outcome-ready solutions, not building blocks.</p>
                <p>Pre-validated, industry-specific AI pipelines integrating:</p>
                <ul>
                  <li>DDN CORE (EXAScaler + Infinia)</li>
                  <li>NIMs, NeMo, Triton, CUDA</li>
                </ul>
              </div>
              <p className={styles.strategyHighlight}>Turnkey data + model + inference workflows</p>
            </div>

            <div className={styles.strategyCard}>
              <CheckCircle2 className={styles.strategyCheck} size={24} />
              <h3>Sovereign AI Frameworks</h3>
              <div className={styles.strategyCardContent}>
                <p>Production-ready Sovereign AI Reference Frameworks with NVIDIA</p>
                <p>Data sovereignty, encryption, multi-tenancy, isolation</p>
                <p>Remove the data barrier to sovereign AI</p>
              </div>
              <p className={styles.strategyHighlight}>Unlock GPU demand that otherwise stalls.</p>
            </div>

            <div className={styles.strategyCard}>
              <CheckCircle2 className={styles.strategyCheck} size={24} />
              <h3>Removing Friction from GPU Adoption</h3>
              <div className={styles.strategyCardContent}>
                <p>AI orchestration layer to simplify:</p>
                <ul>
                  <li>Dataset lifecycle management</li>
                  <li>GPU-aware data placement</li>
                  <li>Multi-tenant AI pipelines aligned with NVIDIA AIDP, BlueField, Spectrum-X</li>
                </ul>
              </div>
              <p className={styles.strategyHighlight}>DDN helps make AI easier to buy, deploy, and scale</p>
            </div>

            <div className={styles.strategyCard}>
              <CheckCircle2 className={styles.strategyCheck} size={24} />
              <h3>CPU → GPU for 11,000+ Customers</h3>
              <div className={styles.strategyCardContent}>
                <p>Identify GPU-ready workloads running on DDN</p>
                <p>CPU-to-GPU migration blueprints (Safe city, video analytics, simulation, analytics, AI inference)</p>
              </div>
              <p className={styles.strategyHighlight}>Massive GPU expansion opportunity</p>
            </div>
          </div>
        </section>
      </Slide>

      {/* Slide 10: DDN Strategy Evolution */}
      <Slide index={9} >
        <section className={styles.contentSection}>
          <header className={styles.slideHeader}>
            <h1 className={styles.slideTitleMixed}>DDN Strategy Evolution: From AI Storage to <span className={styles.titleAccent}>Software-Defined AI Factories</span></h1>
          </header>

          <div className={styles.evolutionStack}>
            <div className={styles.evolutionCard}>
              <div className={styles.evolutionTitle} style={{ background: 'linear-gradient(135deg, #FF7600, #FFAA32)' }}>
                <h3>Software-Defined AI Factories</h3>
              </div>
              <div className={styles.evolutionContent}>
                <p>AIDP / HyperPOD | SDS across OEM, BlueField, cloud | AI Native Integration | Lower cost per token, higher GPU utilization</p>
              </div>
            </div>

            <div className={styles.evolutionCard}>
              <div className={styles.evolutionTitle} style={{ background: 'linear-gradient(135deg, #ED2738, #FF6572)' }}>
                <h3>DDN Data Intelligence Platform</h3>
              </div>
              <div className={styles.evolutionContent}>
                <p>Unified File | Object | Block | KV | Metadata, DB, catalog, event pipelines | Global KV Cache Fabric | Fine-grained multi-tenancy</p>
              </div>
            </div>

            <div className={styles.evolutionCard}>
              <div className={styles.evolutionTitle} style={{ background: 'linear-gradient(135deg, #ED2738, #FF7600)' }}>
                <h3>EXAScaler + Infinia</h3>
              </div>
              <div className={styles.evolutionContent}>
                <p>Proven AI training & IO at scale | Object, file, container storage | Deployed in the world's largest GPU clusters</p>
              </div>
            </div>
          </div>
        </section>
      </Slide>

      {/* Slide 11: DDN Architecture Update */}
      <Slide index={10} >
        <section className={styles.archSlide}>
          <h1 className={styles.archTitle}>DDN ARCHITECTURE UPDATE</h1>

          <div className={styles.archContainer}>
            {/* Top 3 Value Cards */}
            <div className={styles.archTopCards}>
              <div className={styles.archTopCard}>
                <CheckCircle2 size={24} className={styles.archTopCardIcon} />
                <span>Native Implementation of Key Feature Sets around Security, Metastore and Pipelines</span>
              </div>
              <div className={styles.archTopCard}>
                <CheckCircle2 size={24} className={styles.archTopCardIcon} />
                <span>Extreme Efficiency for All Protocols – targeting 10x of conventional storage</span>
              </div>
              <div className={styles.archTopCard}>
                <CheckCircle2 size={24} className={styles.archTopCardIcon} />
                <span>Powerful SDK designed to expose the data platform deeply into AI Native Ecosystem</span>
              </div>
            </div>

            {/* Main Architecture Grid: Protocol | Plugin | SDK | Data Plane | Control Plane */}
            <div className={styles.archMainGrid}>

              {/* 1. Protocol Stack */}
              <div className={styles.archProtocolBox}>
                <div className={styles.archSectionLabel}>Protocol Stack</div>
                <div className={styles.archProtocolContent}>
                  {/* Data Protocols */}
                  <div className={styles.archGroup}>
                    <span className={styles.archGroupTitle}>Data Protocols</span>
                    <div className={styles.archPillsRow}>
                      <span>S3</span><span>CSI</span><span>File</span><span>DB</span>
                    </div>
                    <div className={styles.archIntegrations}>
                      NeMo | NIMs | Triton | TensorRT
                    </div>
                  </div>

                  {/* Acceleration Libraries */}
                  <div className={styles.archGroup}>
                    <span className={styles.archGroupTitle}>Acceleration Libraries</span>
                    <div className={styles.archPillsRow}>
                      <span>Hadoop/SPARK</span><span>KV Cache</span>
                    </div>
                  </div>

                  {/* Agents */}
                  <div className={styles.archGroup}>
                    <span className={styles.archGroupTitle}>Agents</span>
                    <div className={styles.archPillsRow}>
                      <span>Custom</span>
                    </div>
                    <div className={styles.archIntegrations}>
                      NIMs | vDB
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Plug-in Interface */}
              <div className={styles.archPluginBox}>
                <div className={styles.archSectionLabel}>Plug-in Interface</div>
                <div className={styles.archPluginContent}>
                  CUDA | cuDNN | CuObject | Core CUDA Libraries
                </div>
              </div>

              {/* 3. Data Plane */}
              <div className={styles.archDataPlaneBox}>
                <div className={styles.archSectionLabel}>AI Enabling<br/>Features</div>
                <div className={styles.archDataPlaneContent}>
                  <div className={styles.archDPGridNew}>
                    <div className={styles.archDPCardNew}>
                      <Database size={28} className={styles.archDPIcon} />
                      <div className={styles.archDPText}>
                        <span className={styles.archDPMain}>Infinite MetaStore</span>
                        <span className={styles.archDPSub}>Tag, Search, Store</span>
                      </div>
                    </div>
                    <div className={styles.archDPCardNew}>
                      <Network size={28} className={styles.archDPIcon} />
                      <div className={styles.archDPText}>
                        <span className={styles.archDPMain}>Event Engine</span>
                        <span className={styles.archDPSub}>Triggers, Pipelines</span>
                      </div>
                    </div>
                    <div className={styles.archDPCardNew}>
                      <Cloud size={28} className={styles.archDPIcon} />
                      <div className={styles.archDPText}>
                        <span className={styles.archDPMain}>Data Ocean</span>
                        <span className={styles.archDPSub}>Join all datasets</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDK Column */}
              <div className={styles.archSdkCol}><span>SDK</span></div>

              {/* Control Plane Column */}
              <div className={styles.archControlPlaneCol}>
                <div className={styles.archCPTitleBlock}>Control<br/>Plane</div>
                <div className={styles.archCPContentBlock}>
                  <div className={styles.archCPList}>
                    BaseCommand<br/>NGC<br/>NIM Operator
                  </div>
                  <div className={styles.archCPBottomActions}>
                    <div className={styles.archCPBtn}>Mgmt API</div>
                    <div className={styles.archCPBtn}>GUI/CLI</div>
                    <div className={styles.archCPBtn}>OTEL</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Slide>

      {/* Slide 12: DDN Architecture and Integrations */}
      <Slide index={11} >
        <section className={styles.archSlide}>
          <h1 className={styles.archTitle}>DDN ARCHITECTURE AND INTEGRATIONS</h1>

          <div className={styles.archContainer}>
            {/* Row 1: Deployment */}
            <div className={styles.archRow1}>
              <div className={styles.archLbl}>Deployment</div>
              <div className={styles.archDeployCards}>
                <div className={styles.archCard}><Check size={16} /> On Prem</div>
                <div className={styles.archCard}><Check size={16} /> AIDP/HyperPOD</div>
                <div className={styles.archCard}><Check size={16} /> Managed Service</div>
                <div className={styles.archCard}><Check size={16} /> Public Cloud</div>
              </div>
            </div>

            {/* Row 2: AI Native */}
            <div className={styles.archRow2}>
              <div className={styles.archLbl}>AI Native</div>
              <div className={styles.archLogos}>
                <img src="/logo_cursor.png" alt="Cursor" />
                <img src="/logo_replit.png" alt="Replit" />
                <img src="/logo_cognition.png" alt="Cognition" />
                <img src="/logo_pinecone.png" alt="Pinecone" />
                <img src="/logo_perplexity.png" alt="Perplexity" />
                <img src="/logo_vercel.png" alt="Vercel" />
                <img src="/logo_servicenow.png" alt="ServiceNow" />
                <img src="/logo_glean.png" alt="Glean" />
                <img src="/logo_aiceberg.png" alt="AI Iceberg" />
                <img src="/logo_hippocratic.png" alt="Hippocratic AI" />
              </div>
            </div>

            {/* Row 3: Optimized DataType */}
            <div className={styles.archRow3}>
              <div className={styles.archLbl}>Optimized DataType</div>
              <div className={styles.archGrayBar}>
                <strong>Embeddings</strong><span className={styles.archSep}>|</span><strong>datasets</strong><span className={styles.archSep}>|</span><strong>checkpoints</strong><span className={styles.archSep}>|</span><strong>feature stores</strong><span className={styles.archSep}>|</span><strong>KV-cache data</strong><span className={styles.archSep}>|</span><strong>lineage + metadata</strong>
              </div>
            </div>

            {/* Main Architecture Grid: Protocol | Plugin | SDK | Data Plane | Control Plane */}
            <div className={styles.archMainGrid}>

              {/* 1. Protocol Stack */}
              <div className={styles.archProtocolBox}>
                <div className={styles.archSectionLabel}>Protocol Stack</div>
                <div className={styles.archProtocolContent}>
                  {/* Data Protocols */}
                  <div className={styles.archGroup}>
                    <span className={styles.archGroupTitle}>Data Protocols</span>
                    <div className={styles.archPillsRow}>
                      <span>S3</span><span>CSI</span><span>File</span><span>DB</span>
                    </div>
                    <div className={styles.archIntegrations}>
                      NeMo | NIMs | Triton | TensorRT
                    </div>
                  </div>

                  {/* Acceleration Libraries */}
                  <div className={styles.archGroup}>
                    <span className={styles.archGroupTitle}>Acceleration Libraries</span>
                    <div className={styles.archPillsRow}>
                      <span>Hadoop/SPARK</span><span>KV Cache</span>
                    </div>
                  </div>

                  {/* Agents */}
                  <div className={styles.archGroup}>
                    <span className={styles.archGroupTitle}>Agents</span>
                    <div className={styles.archPillsRow}>
                      <span>Custom</span>
                    </div>
                    <div className={styles.archIntegrations}>
                      NIMs | vDB
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Plug-in Interface */}
              <div className={styles.archPluginBox}>
                <div className={styles.archSectionLabel}>Plug-in Interface</div>
                <div className={styles.archPluginContent}>
                  CUDA | cuDNN | CuObject | Core CUDA Libraries
                </div>
              </div>

              {/* 3. Data Plane (AI Enabling Features) */}
              <div className={styles.archDataPlaneBox}>
                <div className={styles.archSectionLabel}>AI Enabling Features</div>
                <div className={styles.archDataPlaneContent}>
                  <div className={styles.archDPHeader}>Data Plane</div>
                  <div className={styles.archDPGridNew}>
                    <div className={styles.archDPCardNew}>
                      <div className={styles.archDPIcon}><Database size={20} /></div>
                      <div className={styles.archDPText}>
                        <span className={styles.archDPMain}>Infinite MetaStore</span>
                        <span className={styles.archDPSub}>Tag, Search, Store</span>
                      </div>
                    </div>
                    <div className={styles.archDPCardNew}>
                      <div className={styles.archDPIcon}><Network size={20} /></div>
                      <div className={styles.archDPText}>
                        <span className={styles.archDPMain}>Event Engine</span>
                        <span className={styles.archDPSub}>Triggers, Pipelines</span>
                      </div>
                    </div>
                    <div className={styles.archDPCardNew}>
                      <div className={styles.archDPIcon}><Cloud size={20} /></div>
                      <div className={styles.archDPText}>
                        <span className={styles.archDPMain}>Data Ocean</span>
                        <span className={styles.archDPSub}>Join all datasets</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column: SDK */}
              <div className={styles.archSdkCol}>
                <span>SDK</span>
              </div>

              {/* Right Column: Control Plane */}
              <div className={styles.archControlPlaneCol}>
                <div className={styles.archCPTitleBlock}>
                  Control Plane
                </div>
                <div className={styles.archCPContentBlock}>
                  <div className={styles.archCPList}>
                    BaseCommand<br />
                    NGC<br />
                    NIM Operator
                  </div>
                  <div className={styles.archCPBottomActions}>
                    <div className={styles.archCPBtn}>Mgmt API</div>
                    <div className={styles.archCPBtn}>GUI/CLI</div>
                    <div className={styles.archCPBtn}>OTEL</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Slide>

      {/* Slide 13: DDN & NVIDIA NIXL/DYNAMO Integration */}
      <Slide index={12} >
        <section className={styles.contentSection}>
          <header className={styles.slideHeader}>
            <h1 className={styles.slideTitleMixed}><span className={styles.titleAccent}>DDN & NVIDIA</span> NIXL/Dynamo Integration</h1>
          </header>

          <div className={styles.nixlDiagram}>
            <div className={styles.nixlAccelLayer}>
              <span className={styles.nixlLayerLabel}>NVIDIA ACCELERATION LAYER</span>
              <div className={styles.nixlComponents}>
                <div className={styles.nixlComponent}>
                  <Cpu size={32} />
                  <h4>Dynamo</h4>
                  <p>CONTEXT SCHEDULER</p>
                </div>
                <div className={styles.nixlComponent}>
                  <Zap size={32} />
                  <h4>NIXL</h4>
                  <p>INFERENCE TRANSFER LIBRARY</p>
                  <span className={styles.rdmaBadge}>GPUDIRECT RDMA LANE</span>
                </div>
              </div>
            </div>

            <div className={styles.nixlConnector}>
              <div className={styles.connectorLine} />
            </div>

            <div className={styles.ddnStorageLayer}>
              <div className={styles.ddnStorageBox}>
                <Box size={32} />
                <h4>DDN Infinia</h4>
                <p>OBJECT STORE</p>
                <small>S3-compatible engine for high-concurrency KV block access.</small>
              </div>
              <div className={styles.ddnStorageBox}>
                <HardDrive size={32} />
                <h4>DDN EXAScaler</h4>
                <p>FILE SYSTEM</p>
                <small>POSIX-compliant parallel filesystem with direct GDS integration.</small>
              </div>
            </div>

            <p className={styles.nixlFooter}>GLOBAL DATA FABRIC FOUNDATION</p>
          </div>
        </section>
      </Slide>

      {/* Slide 14: DDN Dynamo - KV Cache Fabric Dashboard */}
      <Slide index={13} >
        <section className={styles.kvCacheSandwich}>
          {/* Row 1: Header (25%) */}
          <div className={styles.kvCacheHeader}>
            <h1 className={styles.kvCacheTitle}>Zero-Copy KV Cache Telemetry</h1>
            <p className={styles.kvCacheSubtitle}>Bypassing CPU: Direct Memory Transfer from DDN Storage to H100 GPU VRAM</p>
          </div>

          {/* Row 2: Animation Stage (50%) */}
          <div className={styles.kvCacheStage}>
            <KVCacheAnimation />
          </div>

          {/* Row 3: Metrics Footer (25%) */}
          <div className={styles.kvCacheMetrics}>
            <div className={styles.metricCard}>
              <span className={styles.metricValue} style={{ color: '#16A34A' }}>968 GB/s</span>
              <span className={styles.metricLabel}>RDMA Read Speed</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue} style={{ color: '#16A34A' }}>&lt; 0.5 ms</span>
              <span className={styles.metricLabel}>First Token Time</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue} style={{ color: '#2563EB' }}>40% Freed</span>
              <span className={styles.metricLabel}>HBM Capacity Saved</span>
            </div>
          </div>
        </section>
      </Slide>
    </div>
  )
}
