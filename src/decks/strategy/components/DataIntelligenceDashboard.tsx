import { CheckCircle2, Cloud, Database, Server, HardDrive, Activity, Upload, Clock, BarChart3, Globe, Layers } from 'lucide-react'
import styles from './DataIntelligenceDashboard.module.css'

export default function DataIntelligenceDashboard() {
  // Calculate progress width based on data size for agentic workloads
  const parseDataToProgress = (dataStr: string): number => {
    const value = parseFloat(dataStr)
    const unit = dataStr.includes('TB') ? 1000 : 1
    const normalized = value * (dataStr.includes('TB') ? unit : 1)
    return Math.min(100, Math.max(8, (normalized / 15000) * 100))
  }

  const agents = [
    { name: 'research-assistant', data: '1.2 TB' },
    { name: 'code-reviewer', data: '848 GB' },
    { name: 'data-curator', data: '4.7 TB' },
    { name: 'model-trainer', data: '12.3 TB' },
    { name: 'qa-validator', data: '298 GB' },
    { name: 'customer-support', data: '2.1 TB' },
    { name: 'anomaly-detector', data: '908 GB' },
    { name: 'report-generator', data: '528 GB' },
  ]

  return (
    <div className={styles.dashboard}>
      {/* Row 1: Logical Layer */}
      <div className={styles.row}>
        {/* Card 1.1: Data Ocean - GRAVITATIONAL CORE DESIGN */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.headerDot} />
            <span className={styles.cardTitle}>DATA OCEAN — GLOBAL NAMESPACE</span>
          </div>
          <div className={styles.dataOceanContent}>
            {/* SVG Canvas - Gravitational Pull Effect */}
            <svg className={styles.connectionSvg} viewBox="0 0 280 220">
              {/*
                Lines connect TO the EDGE of the circle, NOT through it
                Center: (140, 95), Radius: ~50px
                Lines terminate at circle border
              */}

              {/* GCP (top-left) to Circle Edge - Dashed Grey */}
              <path
                d="M 50 45 L 100 60"
                className={styles.pathDashed}
              />
              {/* OCI (top-right) to Circle Edge - Dashed Grey */}
              <path
                d="M 230 45 L 180 60"
                className={styles.pathDashed}
              />
              {/* Edge A (bottom-left) to Circle Edge - Dashed Grey */}
              <path
                d="M 40 175 L 100 130"
                className={styles.pathDashed}
              />
              {/* Edge B (bottom-right) to Circle Edge - Dashed Grey */}
              <path
                d="M 240 175 L 180 130"
                className={styles.pathDashed}
              />

              {/* PRIMARY PIPE: Data Center to Circle Bottom - THICK SOLID RED */}
              <line
                x1="140" y1="175"
                x2="140" y2="145"
                className={styles.pathPrimary}
              />

              {/* Animated Pulse traveling UP the primary pipe */}
              <circle r="6" fill="#ED2738" className={styles.pulseOrbit}>
                <animateMotion dur="0.8s" repeatCount="indefinite" path="M 140 175 L 140 145" />
              </circle>
            </svg>

            {/* Satellite Nodes - Cloud nodes at top, Edge + Data Center aligned at bottom */}
            <div className={styles.satelliteGcp}>
              <Cloud size={18} />
              <span>GCP</span>
            </div>
            <div className={styles.satelliteOci}>
              <Cloud size={18} />
              <span>OCI</span>
            </div>
            <div className={styles.satelliteEdgeA}>
              <Server size={16} />
              <span>Edge-A</span>
            </div>
            <div className={styles.satelliteEdgeB}>
              <Server size={16} />
              <span>Edge-B</span>
            </div>
            {/* Data Center - DETACHED, aligned with Edge nodes at bottom */}
            <div className={styles.satelliteDataCenter}>
              <Database size={18} />
              <span>Data Center</span>
            </div>

            {/* CONCENTRIC RIPPLE RINGS - Gravity Visualization */}
            <div className={`${styles.gravityRipple} ${styles.rippleOuter}`} />
            <div className={`${styles.gravityRipple} ${styles.rippleInner}`} />

            {/* THE GRAVITY CORE */}
            <div className={styles.gravityCore}>
              <span className={styles.coreTitle}>UNIFIED<br/>NAMESPACE</span>
              <span className={styles.coreSubtitle}>Zero Data Gravity</span>
            </div>
          </div>
        </div>

        {/* Card 1.2: KV-Cache Fabric - Outlined Style */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.headerDot} />
            <span className={styles.cardTitle}>KV-CACHE FABRIC — INFERENCE ACCELERATION</span>
          </div>
          <div className={styles.kvCacheContent}>
            <div className={styles.regionGrid}>
              <div className={styles.region}>
                <span className={styles.regionLabel}>REGION A</span>
                <div className={styles.gpuGrid}>
                  {[...Array(8)].map((_, i) => <div key={i} className={styles.gpuBlock} />)}
                </div>
                <small>32x H100</small>
              </div>
              <div className={styles.region}>
                <span className={styles.regionLabel}>REGION C</span>
                <div className={styles.gpuGrid}>
                  {[...Array(4)].map((_, i) => <div key={i} className={styles.gpuBlock} />)}
                </div>
                <small>16x H100</small>
              </div>
              <div className={styles.region}>
                <span className={styles.regionLabel}>REGION B</span>
                <div className={styles.gpuGrid}>
                  {[...Array(8)].map((_, i) => <div key={i} className={styles.gpuBlock} />)}
                </div>
                <small>32x H100</small>
              </div>
            </div>
            {/* Outlined Fabric Bar */}
            <div className={styles.fabricBarOutlined}>
              <span>DISTRIBUTED KV-CACHE FABRIC</span>
              <div className={styles.fabricTiles}>
                {[...Array(32)].map((_, i) => (
                  <div key={i} className={`${styles.fabricTile} ${i % 4 === 0 ? styles.hot : ''}`} />
                ))}
              </div>
            </div>
            <div className={styles.cacheMetrics}>
              <div className={styles.metricRow}>
                <span>Cache Hit Rate</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '85%', background: '#22C55E' }} />
                </div>
                <span className={styles.metricValueGreen}>85%</span>
              </div>
              <div className={styles.metricRow}>
                <span>Eviction Rate</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '12%', background: '#F97316' }} />
                </div>
                <span className={styles.metricValueOrange}>12%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 1.3: Event Engine - Zebra Striped */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.headerDot} />
            <span className={styles.cardTitle}>EVENT ENGINE — PIPELINES & AUTOMATION</span>
          </div>
          <div className={styles.eventEngineContent}>
            <div className={styles.eventIcons}>
              <div className={styles.eventIcon}><Database size={14} /><span>File Create</span></div>
              <div className={styles.eventIcon}><Upload size={14} /><span>Data Ingest</span></div>
              <div className={styles.eventIcon}><Clock size={14} /><span>Schedule</span></div>
              <div className={styles.eventIcon}><BarChart3 size={14} /><span>Threshold</span></div>
            </div>
            {/* Console Container for Log Entries */}
            <div className={styles.consoleContainer}>
              <div className={styles.eventList}>
                {[
                  { tag: 'checkpoint-sync', logic: 'ON file.type = "checkpoint"', action: 'replicate(3, async)' },
                  { tag: 'ingest-index', logic: 'ON ingest.complete', action: 'index() + notify()' },
                  { tag: 'model-deploy', logic: 'ON model.trained', action: 'deploy(edge, canary)' },
                  { tag: 'sensor-etl', logic: 'ON sensor.batch > 1GB', action: 'transform() + partition()' },
                  { tag: 'backup-nightly', logic: 'ON schedule.daily @02:00', action: 'snapshot() + archive(s3)' },
                  { tag: 'cache-warm', logic: 'ON cache.hit_rate < 0.7', action: 'prefetch(top_k=1000)' },
                ].map((event, idx) => (
                  <div key={event.tag} className={`${styles.eventRow} ${idx % 2 === 1 ? styles.zebraStripe : ''}`}>
                    <span className={styles.eventTag}>{event.tag}</span>
                    <span className={styles.eventLogic}>{event.logic}</span>
                    <span className={styles.eventArrow}>→</span>
                    <span className={styles.eventAction}>{event.action}</span>
                    <span className={styles.eventStatus} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Service Layer */}
      <div className={styles.row}>
        {/* Card 2.1: Agentic Workloads */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.headerDotGreen} />
            <span className={styles.cardTitle}>AGENTIC WORKLOADS — LIVE STATUS</span>
          </div>
          <div className={styles.workloadsContent}>
            <div className={styles.workloadsGrid}>
              {agents.map((agent, idx) => (
                <div key={agent.name} className={`${styles.agentRow} ${idx % 2 === 1 ? styles.zebraStripe : ''}`}>
                  <span className={styles.agentStatus} />
                  <span className={styles.agentName}>{agent.name}</span>
                  <div className={styles.agentProgress}>
                    <div
                      className={styles.agentProgressFill}
                      style={{ width: `${parseDataToProgress(agent.data)}%` }}
                    />
                  </div>
                  <span className={styles.agentData}>{agent.data}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2.2: Multi-Tenancy */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.headerDotGreen} />
            <span className={styles.cardTitle}>MULTI-TENANCY — SECURE SHARED INFRASTRUCTURE</span>
          </div>
          <div className={styles.tenantContent}>
            {[
              { name: 'acme-corp', avail: '99.99%', perf: '<2ms', capacity: 68, throughput: '188 / 400 GB/s', protocols: ['FILE', 'OBJ', 'KV'] },
              { name: 'globex-ai', avail: '99.8%', perf: '12ms', capacity: 92, throughput: '448 / 500 GB/s', protocols: ['FILE', 'KV', 'BLK'] },
              { name: 'initech-ml', avail: '99.95%', perf: '<5ms', capacity: 30, throughput: '138 / 250 GB/s', protocols: ['FILE', 'BLK'] },
              { name: 'nexus-labs', avail: '99.999%', perf: '8ms', capacity: 71, throughput: '838 / 1000 GB/s', protocols: ['FILE', 'OBJ', 'KV', 'BLK'] },
            ].map((tenant, idx) => (
              <div key={tenant.name} className={`${styles.tenantRow} ${idx % 2 === 1 ? styles.zebraStripe : ''}`}>
                <div className={styles.tenantMain}>
                  <span className={styles.tenantName}>{tenant.name}</span>
                  <span className={styles.tenantAvail}>{tenant.avail}</span>
                  <span className={styles.tenantPerf}>{tenant.perf}</span>
                  <div className={styles.tenantCapacity}>
                    <div className={styles.tenantCapacityFill} style={{ width: `${tenant.capacity}%` }} />
                  </div>
                  <span className={styles.tenantThroughput}>{tenant.throughput}</span>
                </div>
                <div className={styles.tenantProtocols}>
                  {['FILE', 'OBJ', 'KV', 'BLK'].map((p) => (
                    <span
                      key={p}
                      className={`${styles.protocolBadge} ${tenant.protocols.includes(p) ? styles[`protocol${p}`] : styles.protocolInactive}`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2.3: Infinite Metastore */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.headerDotGreen} />
            <span className={styles.cardTitle}>INFINITE METASTORE — DATA INTELLIGENCE</span>
          </div>
          <div className={styles.metastoreContent}>
            <div className={styles.metastoreGrid}>
              <div className={styles.metastoreCol}>
                <small>Local NVMe</small>
                <div className={`${styles.metastoreItem} ${styles.tierHot}`}>llm-weights</div>
                <div className={`${styles.metastoreItem} ${styles.tierHot}`}>kv-cache</div>
                <div className={`${styles.metastoreItem} ${styles.tierHot}`}>checkpoints</div>
              </div>
              <div className={styles.metastoreCol}>
                <small>Edge-West</small>
                <div className={`${styles.metastoreItem} ${styles.tierWarm}`}>sensor-ingest</div>
                <div className={`${styles.metastoreItem} ${styles.tierWarm}`}>genomics-v3</div>
                <div className={`${styles.metastoreItem} ${styles.tierCold}`}>logs-2024</div>
              </div>
              <div className={styles.metastoreCol}>
                <small>Edge-East</small>
                <div className={`${styles.metastoreItem} ${styles.tierHot}`}>inference-q</div>
                <div className={`${styles.metastoreItem} ${styles.tierWarm}`}>training-set</div>
              </div>
              <div className={styles.metastoreCol}>
                <small>Cloud-S3</small>
                <div className={`${styles.metastoreItem} ${styles.tierCold}`}>archive-2023</div>
                <div className={`${styles.metastoreItem} ${styles.tierWarm}`}>lidar-raw</div>
                <div className={`${styles.metastoreItem} ${styles.tierCold}`}>backup-full</div>
              </div>
            </div>
            <div className={styles.metastoreMetrics}>
              <div className={styles.tempMetric}>
                <span>TEMPERATURE</span>
                <div className={styles.tempBar}>
                  <div className={styles.tempHot} />
                  <div className={styles.tempWarm} />
                  <div className={styles.tempCold} />
                </div>
                <small>25% hot · 30% warm · 45% cold</small>
              </div>
              <div className={styles.replicationMetric}>
                <span>REPLICATION</span>
                <small>1x 23% · 2x 41% · 3x 36%</small>
              </div>
              <div className={styles.immutableMetric}>
                <span>IMMUTABLE</span>
                <strong>34%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Foundation Title Bar - Sits directly above Infrastructure */}
      <div className={styles.foundationTitleBar}>
        <span>THE DDN DATA INTELLIGENCE PLATFORM</span>
      </div>

      {/* Row 3: Infrastructure Health (Server Room Aesthetic) */}
      <div className={styles.healthRow}>
        {/* Left: Health Scores */}
        <div className={styles.healthScores}>
          <div className={styles.healthStat}>
            <span className={styles.healthNumber}>247</span>
            <span className={styles.healthLabel}>REMOTE SUBSCRIPTIONS</span>
          </div>
          <div className={styles.healthStat}>
            <span className={styles.healthNumber}>18.4 PB</span>
            <span className={styles.healthLabel}>TOTAL CAPACITY</span>
          </div>
          <div className={styles.healthReserve}>
            <span className={styles.healthLabel}>PERFORMANCE RESERVE</span>
            <div className={styles.reserveBar}>
              <div className={styles.reserveFill} />
            </div>
            <small>38% headroom</small>
          </div>
        </div>

        {/* Center: Server Nodes - Hardware Blade Style */}
        <div className={styles.serverNodes}>
          <span className={styles.serverLabel}>SERVER NODES</span>
          <div className={styles.nodeGrid}>
            <div className={`${styles.nodeBlock} ${styles.gpu}`}><span className={styles.statusLight} />GPU</div>
            <div className={`${styles.nodeBlock} ${styles.gpu}`}><span className={styles.statusLight} />GPU</div>
            <div className={`${styles.nodeBlock} ${styles.gpu}`}><span className={styles.statusLight} />GPU</div>
            <div className={`${styles.nodeBlock} ${styles.gpu}`}><span className={styles.statusLight} />GPU</div>
            <div className={`${styles.nodeBlock} ${styles.gpu}`}><span className={styles.statusLight} />GPU</div>
            <div className={`${styles.nodeBlock} ${styles.gpu}`}><span className={styles.statusLight} />GPU</div>
            <div className={`${styles.nodeBlock} ${styles.sto}`}><span className={styles.statusLight} />STO</div>
            <div className={`${styles.nodeBlock} ${styles.sto}`}><span className={styles.statusLight} />STO</div>
            <div className={`${styles.nodeBlock} ${styles.sto}`}><span className={styles.statusLight} />STO</div>
            <div className={`${styles.nodeBlock} ${styles.sto}`}><span className={styles.statusLight} />STO</div>
            <div className={`${styles.nodeBlock} ${styles.sto}`}><span className={styles.statusLight} />STO</div>
            <div className={`${styles.nodeBlock} ${styles.meta}`}><span className={styles.statusLight} />META</div>
            <div className={`${styles.nodeBlock} ${styles.meta}`}><span className={styles.statusLight} />META</div>
          </div>
          <div className={styles.nodeLegend}>
            <span><span className={`${styles.legendDot} ${styles.gpu}`} /> GPU x6</span>
            <span><span className={`${styles.legendDot} ${styles.sto}`} /> Storage x5</span>
            <span><span className={`${styles.legendDot} ${styles.meta}`} /> Meta x2</span>
          </div>
        </div>

        {/* Right: Self-Healing */}
        <div className={styles.selfHealing}>
          <span className={styles.healingLabel}>SELF-HEALING ACTIVITY</span>
          <div className={styles.healingLog}>
            <div className={styles.healingEntry}>
              <span className={styles.healingTime}>2h ago</span>
              <span className={styles.healingText}>Rebalanced 847 extents → node-07</span>
              <CheckCircle2 size={12} className={styles.healingCheck} />
            </div>
            <div className={styles.healingEntry}>
              <span className={styles.healingTime}>18m ago</span>
              <span className={styles.healingText}>Rebuilt replica for dataset/genomics-v3</span>
              <CheckCircle2 size={12} className={styles.healingCheck} />
            </div>
            <div className={styles.healingEntry}>
              <span className={styles.healingTime}>1h ago</span>
              <span className={styles.healingText}>Evacuated failing SSD on node-12</span>
              <CheckCircle2 size={12} className={styles.healingCheck} />
            </div>
            <div className={styles.healingEntry}>
              <span className={styles.healingTime}>now</span>
              <span className={styles.healingText}>Scrubbing checksums sector 0x4F2...</span>
              <Activity size={12} className={styles.healingActive} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Deployment Infrastructure Footer Strip */}
      <div className={styles.deploymentStrip}>
        <div className={styles.deploymentLegend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendIcon} ${styles.gpu}`} />
            <span>GPU</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendIcon} ${styles.sto}`} />
            <span>Storage</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendIcon} ${styles.meta}`} />
            <span>Metadata</span>
          </div>
        </div>
        <div className={styles.networkingBar}>
          <span className={styles.networkingLabel}>Spectrum-X / InfiniBand / RDMA</span>
          <div className={styles.networkingLine} />
        </div>
        <div className={styles.cloudTargets}>
          <div className={styles.cloudIcon}>
            <Cloud size={14} />
            <span>GCP</span>
          </div>
          <div className={styles.cloudIcon}>
            <Cloud size={14} />
            <span>OCI</span>
          </div>
          <div className={styles.cloudIcon}>
            <Globe size={14} />
            <span>Edge</span>
          </div>
        </div>
      </div>
    </div>
  )
}
