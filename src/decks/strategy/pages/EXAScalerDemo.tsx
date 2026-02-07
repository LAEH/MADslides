import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Server, HardDrive, Database, Cpu, Layers, Network, Zap,
  ArrowDown, ArrowRight, CheckCircle2, AlertTriangle, Activity,
  Gauge, Box, FileText, Clock, Shield, RefreshCw, Power,
  Binary, GitBranch, Workflow, Timer, Lock, Unlock,
  ChevronRight, Play, Pause, RotateCcw, Flame, Snowflake,
  TrendingUp, Users, Building2, Brain, Boxes, X, Info,
  Wifi, Monitor, BarChart3, Eye, Search, AlertCircle,
  FolderPlus, Key, Globe, Layers3, Maximize2, Minimize2,
  Thermometer, Compass, CircleDot, Terminal, Upload
} from 'lucide-react'
import styles from './EXAScalerDemo.module.css'
import PresentationWrapper from '../components/PresentationWrapper'
import { usePresentationMode } from '../components/Layout'
import { useAnimationSequence } from '../hooks/useAnimationSequence'
import { useWarpSpeedEffect } from '../hooks/useWarpSpeedEffect'
import { ease, duration, stagger, premiumEase, premiumEaseExpo } from '../config/motion'

// Re-export for backward compatibility within this file
const _ = { ease, duration, stagger }

// ============================================
// Note: Particle system moved to src/hooks/useWarpSpeedEffect.ts
// with performance tiering (A: 300 particles, B: 150, C: 80)
// ============================================

// ============================================
// COUNTER ANIMATION HOOK
// ============================================

function useCountUp(
  end: number,
  durationMs: number = 2000,
  startOnView: boolean = true
) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (startOnView && !isInView) return
    if (hasStarted) return

    setHasStarted(true)
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / durationMs, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [end, durationMs, isInView, startOnView, hasStarted])

  return { count, ref }
}

// ============================================
// DATA DEFINITIONS
// ============================================

// Node info for architecture
const nodeInfo = {
  mgs: {
    name: 'MGS',
    fullName: 'Management Server',
    target: 'MGT',
    description: 'The Conductor. Stores cluster-wide configuration and registry. Only one active per file system. Clients contact MGS once at mount time to get the configuration.',
    color: '#56809C',
    icon: Shield,
  },
  mds: {
    name: 'MDS',
    fullName: 'Metadata Server',
    target: 'MDT',
    description: 'Manages filenames and permissions. Traditional NAS forces all traffic through a single pipe. EXAScaler separates Metadata (file lookups) from Object Data (payload), allowing clients to read and write to all storage targets simultaneously.',
    color: '#FF7600',
    icon: FileText,
  },
  oss: {
    name: 'OSS',
    fullName: 'Object Storage Server',
    target: 'OST',
    description: 'Delivers raw throughput for massive files. Clients write directly to multiple OSS nodes in parallel, achieving linear bandwidth scaling.',
    color: '#00C280',
    icon: Database,
  },
  lnet: {
    name: 'LNet',
    fullName: 'Lustre Networking',
    target: 'Router',
    description: 'Optimizes traffic over InfiniBand or Ethernet, utilizing every available path. LNet enables multi-rail networking for maximum aggregate bandwidth.',
    color: '#1A81AF',
    icon: Network,
  },
}

// AI400X3 Hotspot info
const ai400x3Hotspots = [
  {
    id: 'networking',
    label: 'Networking',
    specs: ['4x NDR400 InfiniBand', '400GbE OSFP Ports', 'RDMA Enabled'],
    color: '#1A81AF',
    icon: Wifi,
  },
  {
    id: 'storage',
    label: 'Storage',
    specs: ['24x NVMe Drive Slots', 'Up to 1.1PB Usable', 'Hot-Swappable'],
    color: '#00C280',
    icon: HardDrive,
  },
  {
    id: 'controllers',
    label: 'Controllers',
    specs: ['Active-Active HA', 'Battery-Backed Cache', 'Mirrored Write Buffer'],
    color: '#FF7600',
    icon: Cpu,
  },
]

// Production lessons
const productionLessons = [
  {
    number: '01',
    title: 'Parallel I/O is Non-Negotiable',
    description: 'AI/HPC workloads demand simultaneous access to all storage targets. Single-controller architectures become the bottleneck.',
  },
  {
    number: '02',
    title: 'Metadata Performance Matters',
    description: 'File opens, directory listings, and permission checks can dominate runtime. Distributed MDS eliminates this bottleneck.',
  },
  {
    number: '03',
    title: 'Flash Where It Counts',
    description: 'Hot Pools automatically tier frequently accessed data to NVMe. Cold data moves to capacity HDD transparently.',
  },
  {
    number: '04',
    title: 'Zero-Downtime Operations',
    description: 'Pacemaker/Corosync HA ensures automatic failover. STONITH fencing prevents split-brain scenarios.',
  },
  {
    number: '05',
    title: 'Linear Scalability',
    description: 'Add OSS nodes to increase bandwidth. Add MDS nodes to increase metadata throughput. No rebalancing required.',
  },
]

// EMF latency data for observability
const latencyData = [
  { time: '10:00', value: 5, jobId: null },
  { time: '10:05', value: 6, jobId: null },
  { time: '10:10', value: 8, jobId: null },
  { time: '10:15', value: 45, jobId: 'slurm-12847', uid: 'user_ml_team' },
  { time: '10:20', value: 12, jobId: null },
  { time: '10:25', value: 7, jobId: null },
  { time: '10:30', value: 5, jobId: null },
]

export default function EXAScalerDemo() {
  // Presentation mode context
  const presentation = usePresentationMode()

  // Animation sequence manager for safe timeout handling
  const animationManager = useAnimationSequence()

  // Ref to track all active timeouts for cleanup on unmount
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  // Safe timeout helper that auto-tracks for cleanup
  const safeTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      callback()
      // Remove from tracking after execution
      const idx = timeoutsRef.current.indexOf(timeout)
      if (idx > -1) timeoutsRef.current.splice(idx, 1)
    }, delay)
    timeoutsRef.current.push(timeout)
    return timeout
  }, [])

  // Hero state
  const [heroPhase, setHeroPhase] = useState<'bottleneck' | 'parallel'>('bottleneck')
  const [throughputValue, setThroughputValue] = useState(2.4)
  const [queueDepth, setQueueDepth] = useState(102)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInViewRaw = useInView(heroRef, { once: false, amount: 0.3 })

  // Hero is active when in view (scroll mode) OR when in presentation mode on slide 0
  const heroInView = heroInViewRaw || (presentation?.isPresentationMode && presentation?.currentSlide === 0)

  // Stats counter refs
  const stat1 = useCountUp(10, 1500)
  const stat2 = useCountUp(1000, 2000)

  // AI400X3 state
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [rackScale, setRackScale] = useState<1500 | 5000 | 10000>(1500)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const [xrayActive, setXrayActive] = useState(false)
  const hardwareDiagramRef = useRef<HTMLDivElement>(null)

  // Architecture state
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [dataFlowActive, setDataFlowActive] = useState(false)
  const [dataFlowStep, setDataFlowStep] = useState(0)

  // MGS Handshake state (separate from Write Data flow)
  const [mgsHandshakeActive, setMgsHandshakeActive] = useState(false)
  const [mgsHandshakeStep, setMgsHandshakeStep] = useState(0) // 0: idle, 1: query, 2: processing, 3: response, 4: done

  // KV Cache state
  const [kvBenchmarkRunning, setKvBenchmarkRunning] = useState(false)
  const [kvBenchmarkComplete, setKvBenchmarkComplete] = useState(false)
  const [standardTTFT, setStandardTTFT] = useState(0)
  const [ddnTTFT, setDdnTTFT] = useState(0)
  const [concurrentUsers, setConcurrentUsers] = useState(100)
  const [kvPhase, setKvPhase] = useState<'idle' | 'prefill' | 'transfer' | 'decode'>('idle')

  // DoM/PFL Slider state
  const [fileSize, setFileSize] = useState(4)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Multi-Tenancy state
  const [tenantCreating, setTenantCreating] = useState(false)
  const [tenantStep, setTenantStep] = useState(0)
  const [consoleLines, setConsoleLines] = useState<string[]>([])
  const [securityOverlay, setSecurityOverlay] = useState(false)

  // Hot Pools state (enhanced with spillover)
  const [hotPoolFiles, setHotPoolFiles] = useState<{ id: number; age: number }[]>([])
  const [coldPoolFiles, setColdPoolFiles] = useState<{ id: number }[]>([])
  const [spillPoolFiles, setSpillPoolFiles] = useState<{ id: number }[]>([])
  const [dayCounter, setDayCounter] = useState(0)
  const [isMigrating, setIsMigrating] = useState(false)
  const [recallingFile, setRecallingFile] = useState<number | null>(null)
  const [flashPoolPercent, setFlashPoolPercent] = useState(65)
  const [spilloverActive, setSpilloverActive] = useState(false)

  // Extreme IOPS state
  const [compressionDemo, setCompressionDemo] = useState(false)
  const [compressionRatio, setCompressionRatio] = useState(1)
  const [cpuUsage, setCpuUsage] = useState(12)
  const [dataType, setDataType] = useState<'checkpoint' | 'training'>('checkpoint')
  const [hotNodesActive, setHotNodesActive] = useState(false)

  // HA Failover state
  const [haState, setHaState] = useState<'normal' | 'failing' | 'failed'>('normal')
  const [heartbeatActive, setHeartbeatActive] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  // Observability state
  const [selectedSpike, setSelectedSpike] = useState<number | null>(null)
  const [logEntries, setLogEntries] = useState<string[]>([])
  const [liveLatency, setLiveLatency] = useState<{ value: number; isSpike: boolean; spikeData?: { jobId: string; uid: string } }[]>([])
  const [chartPaused, setChartPaused] = useState(false)

  // Use particle system
  useWarpSpeedEffect(canvasRef, heroPhase === 'parallel')

  // Animate queue depth in bottleneck mode
  useEffect(() => {
    if (heroPhase === 'bottleneck') {
      const interval = setInterval(() => {
        setQueueDepth(prev => {
          const delta = Math.floor(Math.random() * 20) - 8
          return Math.max(50, Math.min(180, prev + delta))
        })
      }, 500)
      return () => clearInterval(interval)
    } else {
      setQueueDepth(0) // Clear queue in parallel mode
    }
  }, [heroPhase])

  // Live latency chart data
  useEffect(() => {
    // Initialize with some data
    if (liveLatency.length === 0) {
      const initial = Array.from({ length: 50 }, () => ({
        value: 5 + Math.random() * 10,
        isSpike: false
      }))
      setLiveLatency(initial)
    }

    if (chartPaused) return

    const interval = setInterval(() => {
      setLiveLatency(prev => {
        const newData = [...prev.slice(1)]
        // Occasionally generate a spike
        const isSpike = Math.random() < 0.05
        newData.push({
          value: isSpike ? 40 + Math.random() * 20 : 5 + Math.random() * 12,
          isSpike,
          spikeData: isSpike ? {
            jobId: `slurm-${Math.floor(10000 + Math.random() * 90000)}`,
            uid: ['user_ml_team', 'user_inference', 'user_training'][Math.floor(Math.random() * 3)]
          } : undefined
        })
        return newData
      })
    }, 200)

    return () => clearInterval(interval)
  }, [chartPaused, liveLatency.length])

  // Hero animation cycle - with proper cleanup to prevent memory leaks
  useEffect(() => {
    if (!heroInView) return

    // Track all intervals for cleanup
    const intervals: NodeJS.Timeout[] = []

    const mainInterval = setInterval(() => {
      setHeroPhase(prev => {
        if (prev === 'bottleneck') {
          let value = 2.4
          const throughputInterval = setInterval(() => {
            value += 0.6
            if (value >= 12) {
              clearInterval(throughputInterval)
              // Remove from tracking array
              const idx = intervals.indexOf(throughputInterval)
              if (idx > -1) intervals.splice(idx, 1)
            }
            setThroughputValue(Math.min(value, 12))
          }, 40)
          // Track nested interval for cleanup
          intervals.push(throughputInterval)
          return 'parallel'
        } else {
          setThroughputValue(2.4)
          return 'bottleneck'
        }
      })
    }, 6000)

    intervals.push(mainInterval)

    // Cleanup ALL intervals on unmount or dependency change
    return () => {
      intervals.forEach(clearInterval)
    }
  }, [heroInView])

  // Data flow animation - using safe timeout to prevent memory leaks
  const triggerDataFlow = useCallback(() => {
    if (dataFlowActive) return
    setDataFlowActive(true)
    setDataFlowStep(0)

    // 2x faster animation per brief
    safeTimeout(() => setDataFlowStep(1), 150)
    safeTimeout(() => setDataFlowStep(2), 600)
    safeTimeout(() => setDataFlowStep(3), 1250)
    safeTimeout(() => {
      setDataFlowActive(false)
      setDataFlowStep(0)
    }, 2000)
  }, [dataFlowActive, safeTimeout])

  // MGS Handshake animation - "The Registry" explanation
  const triggerMgsHandshake = useCallback(() => {
    if (mgsHandshakeActive || dataFlowActive) return
    setMgsHandshakeActive(true)
    setMgsHandshakeStep(0)

    // Step A: The Request (Client 1 -> MGS) - 0.5s
    safeTimeout(() => setMgsHandshakeStep(1), 100)
    // Step B: Processing (MGS pulses gold) - 0.8s
    safeTimeout(() => setMgsHandshakeStep(2), 600)
    // Step C: Response (Map flies back) - 0.6s
    safeTimeout(() => setMgsHandshakeStep(3), 1400)
    // Step D: Client mounted, cleanup
    safeTimeout(() => setMgsHandshakeStep(4), 2000)
    // Reset
    safeTimeout(() => {
      setMgsHandshakeActive(false)
      setMgsHandshakeStep(0)
    }, 3500)
  }, [mgsHandshakeActive, dataFlowActive, safeTimeout])

  // KV Cache benchmark - with proper cleanup tracking
  const kvIntervalsRef = useRef<NodeJS.Timeout[]>([])

  const runKvBenchmark = useCallback(() => {
    if (kvBenchmarkRunning) return
    setKvBenchmarkRunning(true)
    setKvBenchmarkComplete(false)
    setStandardTTFT(0)
    setDdnTTFT(0)
    setKvPhase('prefill')

    // Standard memory fills slowly
    let stdValue = 0
    const stdInterval = setInterval(() => {
      stdValue += 25
      setStandardTTFT(stdValue)
      if (stdValue >= 2000) {
        clearInterval(stdInterval)
        const idx = kvIntervalsRef.current.indexOf(stdInterval)
        if (idx > -1) kvIntervalsRef.current.splice(idx, 1)
      }
    }, 50)
    kvIntervalsRef.current.push(stdInterval)

    // DDN fills quickly after prefill
    safeTimeout(() => {
      setKvPhase('transfer')
      safeTimeout(() => {
        setKvPhase('decode')
        let ddnValue = 0
        const ddnInterval = setInterval(() => {
          ddnValue += 10
          setDdnTTFT(ddnValue)
          if (ddnValue >= 100) {
            clearInterval(ddnInterval)
            const idx = kvIntervalsRef.current.indexOf(ddnInterval)
            if (idx > -1) kvIntervalsRef.current.splice(idx, 1)
            setKvBenchmarkComplete(true)
            setKvBenchmarkRunning(false)
            setKvPhase('idle')
          }
        }, 30)
        kvIntervalsRef.current.push(ddnInterval)
      }, 400)
    }, 600)
  }, [kvBenchmarkRunning, safeTimeout])

  // Slider drag handlers
  const handleSliderDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))

    const minLog = Math.log10(1)
    const maxLog = Math.log10(1000000000)
    const logValue = minLog + percent * (maxLog - minLog)
    setFileSize(Math.pow(10, logValue))
  }, [])

  const handleSliderMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    handleSliderDrag(e)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      handleSliderDrag(e as unknown as React.MouseEvent)
    }
    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleSliderDrag])

  const getFileSizeDisplay = () => {
    if (fileSize < 1000) return `${Math.round(fileSize)} KB`
    if (fileSize < 1000000) return `${(fileSize / 1000).toFixed(1)} MB`
    if (fileSize < 1000000000) return `${(fileSize / 1000000).toFixed(1)} GB`
    return `${(fileSize / 1000000000).toFixed(1)} TB`
  }

  const getFileSizeCategory = () => {
    if (fileSize < 64) return 'dom'
    if (fileSize < 1000000) return 'pfl'
    return 'wide'
  }

  // Hardware spotlight mouse handler
  const handleSpotlightMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlightPos({ x, y })
  }, [])

  // Multi-Tenancy: Create tenant - with proper cleanup
  const tenantIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const createTenant = useCallback(() => {
    if (tenantCreating) return
    setTenantCreating(true)
    setTenantStep(0)
    setConsoleLines([])

    // Type out GraphQL mutation - FAST typing per brief
    const mutation = `mutation { createTenant(name: "ai-team-01") }`
    let typed = ''
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex < mutation.length) {
        typed += mutation[charIndex]
        // Highlight createTenant in neon green
        const highlighted = typed.replace('createTenant', '<span class="neonGreen">createTenant</span>')
        setConsoleLines([`> ${highlighted}`])
        charIndex++
      } else {
        clearInterval(typeInterval)
        tenantIntervalRef.current = null
        // Execute steps - faster transitions (using safeTimeout for cleanup)
        safeTimeout(() => {
          setTenantStep(1)
          setConsoleLines(prev => [...prev, '  ✓ Creating directory /exafs/ai-team-01...'])
        }, 150)
        safeTimeout(() => {
          setTenantStep(2)
          setConsoleLines(prev => [...prev, '  ✓ Setting quota: 50TB / 10M inodes...'])
        }, 400)
        safeTimeout(() => {
          setTenantStep(3)
          setConsoleLines(prev => [...prev, '  ✓ Configuring VLAN isolation...'])
        }, 650)
        safeTimeout(() => {
          setConsoleLines(prev => [...prev, '  🔒 Tenant created and secured.'])
          setTenantCreating(false)
        }, 900)
      }
    }, 10) // Fast typing - 10ms instead of 40ms
    tenantIntervalRef.current = typeInterval
  }, [tenantCreating, safeTimeout])

  // Hot Pools: Add files
  const addHotPoolFiles = () => {
    const newPercent = Math.min(flashPoolPercent + 15, 100)
    setFlashPoolPercent(newPercent)

    if (newPercent > 95) {
      // Spillover mode
      setSpilloverActive(true)
      const newFiles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
      }))
      setSpillPoolFiles(prev => [...prev, ...newFiles])
    } else {
      const newFiles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        age: 0,
      }))
      setHotPoolFiles(prev => [...prev, ...newFiles])
    }
  }

  // Hot Pools: Start migration timer
  const startMigration = () => {
    if (isMigrating || hotPoolFiles.length === 0) return
    setIsMigrating(true)
    setDayCounter(0)

    const interval = setInterval(() => {
      setDayCounter(prev => {
        if (prev >= 30) {
          clearInterval(interval)
          setHotPoolFiles(files => {
            const toMigrate = files.filter(f => f.age > 0)
            const remaining = files.filter(f => f.age === 0)
            setColdPoolFiles(cold => [
              ...cold,
              ...toMigrate.map(f => ({ id: f.id }))
            ])
            return remaining
          })
          setFlashPoolPercent(prev => Math.max(prev - 20, 40))
          setIsMigrating(false)
          return 0
        }
        setHotPoolFiles(files => files.map(f => ({ ...f, age: f.age + 1 })))
        return prev + 1
      })
    }, 100)
  }

  // Hot Pools: Recall file - with safe timeout
  const recallFile = useCallback((fileId: number) => {
    setRecallingFile(fileId)
    safeTimeout(() => {
      setColdPoolFiles(files => files.filter(f => f.id !== fileId))
      setHotPoolFiles(prev => [...prev, { id: fileId, age: 0 }])
      setRecallingFile(null)
    }, 500)
  }, [safeTimeout])

  // Compression demo
  const runCompressionDemo = () => {
    if (compressionDemo) return
    setCompressionDemo(true)
    setCompressionRatio(1)

    const targetRatio = dataType === 'checkpoint' ? 2 : 5
    let ratio = 1
    const interval = setInterval(() => {
      ratio += 0.1
      setCpuUsage(12 + Math.random() * 8)
      setCompressionRatio(Math.min(ratio, targetRatio))
      if (ratio >= targetRatio) {
        clearInterval(interval)
        setCompressionDemo(false)
      }
    }, 100)
  }

  // HA Failover - with safe timeout
  const triggerFailover = useCallback(() => {
    if (haState !== 'normal') return

    setHaState('failing')
    setHeartbeatActive(false)

    safeTimeout(() => {
      setHaState('failed')
      setToast('✓ Failover complete. 0 I/O Errors Detected.')
      safeTimeout(() => setToast(null), 4000)
    }, 1500)
  }, [haState, safeTimeout])

  const resetFailover = () => {
    setHaState('normal')
    setHeartbeatActive(true)
    setToast(null)
  }

  // Observability: Add log entries
  useEffect(() => {
    const interval = setInterval(() => {
      const entries = [
        '[INFO] MDT health check: OK',
        '[INFO] OST replication: 100%',
        '[DEBUG] Client connection from 10.0.1.42',
        '[INFO] Snapshot completed: daily-2026-01-13',
      ]
      setLogEntries(prev => [...prev.slice(-4), entries[Math.floor(Math.random() * entries.length)]])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${styles.page} ${presentation?.isPresentationMode ? styles.presentationMode : ''}`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
          >
            <CheckCircle2 size={20} />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {activeModal && (activeModal === 'mds' || activeModal === 'oss' || activeModal === 'mgs') && (
                <>
                  <button className={styles.modalClose} onClick={() => setActiveModal(null)}>
                    <X size={20} />
                  </button>
                  <div className={styles.modalHeader} style={{ color: nodeInfo[activeModal].color }}>
                    {activeModal === 'mds' && <FileText size={32} />}
                    {activeModal === 'oss' && <Database size={32} />}
                    {activeModal === 'mgs' && <Shield size={32} />}
                    <div>
                      <h3>{nodeInfo[activeModal].fullName}</h3>
                      <span className={styles.modalTarget}>{nodeInfo[activeModal].name} → {nodeInfo[activeModal].target}</span>
                    </div>
                  </div>
                  <p className={styles.modalBody}>{nodeInfo[activeModal].description}</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PresentationWrapper>
      {/* ==================== SECTION 1: HERO ==================== */}
      <section className={styles.hero} ref={heroRef}>
        <canvas ref={canvasRef} className={styles.particleCanvas} />

        <div className={styles.heroBackground}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: premiumEaseExpo }}
          >
            <motion.span
              className={styles.heroBadge}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: premiumEase }}
            >
              <span className={styles.badgeDot} />
              DDN EXAScaler
            </motion.span>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine1}>True Parallel</span>
              <span className={styles.heroLine2}>
                <span className={styles.heroGradient}>Throughput.</span>
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              The world's most efficient AI data platform. 140 GB/s Read. 115 GB/s Write. All in 2U.
            </p>

            <p className={styles.heroExplanatory}>
              Meet the AI400X3. Engineered for the NVIDIA GB200 and H100 era, this 2U appliance delivers unmatched density. Unlike traditional storage that bottlenecks at the controller, EXAScaler creates a massive parallel data path, delivering up to 150 GB/s read and 115 GB/s write throughput directly to your GPUs.
            </p>
          </motion.div>

          {/* Status Monitor HUD */}
          <motion.div
            className={`${styles.statusMonitor} ${heroPhase === 'parallel' ? styles.statusMonitorSuccess : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: premiumEaseExpo }}
          >
            {/* Top: Queue Depth */}
            <AnimatePresence mode="wait">
              {heroPhase === 'bottleneck' ? (
                <motion.div
                  key="queue"
                  className={styles.statusQueue}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertTriangle size={14} />
                  <span>QUEUE DEPTH: <strong>{queueDepth}</strong> requests waiting</span>
                </motion.div>
              ) : (
                <motion.div
                  key="cleared"
                  className={styles.statusCleared}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CheckCircle2 size={14} />
                  <span>QUEUE CLEARED — Zero latency</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Middle: Throughput Value */}
            <div className={styles.statusThroughput}>
              <motion.span
                key={throughputValue}
                className={styles.statusValue}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {throughputValue.toFixed(1)}
              </motion.span>
              <span className={styles.statusUnit}>
                {heroPhase === 'parallel' ? 'TB/s' : 'GB/s'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className={styles.statusBar}>
              <motion.div
                className={styles.statusBarFill}
                animate={{ width: heroPhase === 'parallel' ? '95%' : '20%' }}
                transition={{ duration: 0.8, ease: premiumEaseExpo }}
              />
            </div>

            {/* Bottom: Controller Label */}
            <div className={styles.statusLabel}>
              {heroPhase === 'parallel' ? (
                <span className={styles.statusLabelSuccess}>EXAScaler Parallel I/O</span>
              ) : (
                <span className={styles.statusLabelLegacy}>Legacy Single Controller</span>
              )}
            </div>
          </motion.div>

          <motion.div
            className={styles.heroMetrics}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: premiumEaseExpo }}
          >
            <motion.div ref={stat1.ref} className={`${styles.heroMetricCard} ${styles.hoverSuccess}`} whileHover={{ y: -4 }}>
              <span className={styles.heroMetricValue}>{stat1.count}x</span>
              <span className={styles.heroMetricLabel}>Throughput</span>
            </motion.div>
            <motion.div ref={stat2.ref} className={`${styles.heroMetricCard} ${styles.hoverOrange}`} whileHover={{ y: -4 }}>
              <span className={styles.heroMetricValue}>{stat2.count}s</span>
              <span className={styles.heroMetricLabel}>Clients</span>
            </motion.div>
            <motion.div className={`${styles.heroMetricCard} ${styles.hoverRed}`} whileHover={{ y: -4 }}>
              <span className={styles.heroMetricValue}>NVMe</span>
              <span className={styles.heroMetricLabel}>Tiering</span>
            </motion.div>
            <motion.div className={`${styles.heroMetricCard} ${styles.hoverBlue}`} whileHover={{ y: -4 }}>
              <span className={styles.heroMetricValue}>PB</span>
              <span className={styles.heroMetricLabel}>Scale</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div className={styles.scrollIndicator} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}>
          <ArrowDown size={20} />
        </motion.div>
      </section>

      {/* ==================== SECTION 2: AI400X3 HARDWARE HERO ==================== */}
      <section className={styles.hardwareSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeaderDark}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionBadge}>AI400X3</span>
            <h2><span className={styles.textSuccess}>140GB/s</span> Read. <span className={styles.textOrange}>115GB/s</span> Write. <span className={styles.textBlue}>2U.</span></h2>
            <p>The most efficient AI data platform in history.</p>
          </motion.div>

          <motion.div
            ref={hardwareDiagramRef}
            className={styles.hardwareDiagram}
            onMouseMove={handleSpotlightMove}
            style={{
              '--spotlight-x': `${spotlightPos.x}%`,
              '--spotlight-y': `${spotlightPos.y}%`,
            } as React.CSSProperties}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEaseExpo }}
          >
            {/* Spotlight Overlay */}
            <div className={styles.spotlightOverlay} />

            {/* Component Cards - Horizontal Layout */}
            <div className={styles.componentCards}>
              {ai400x3Hotspots.map((hotspot, index) => (
                <motion.div
                  key={hotspot.id}
                  className={styles.componentCard}
                  style={{ '--component-color': hotspot.color } as React.CSSProperties}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className={styles.componentIcon} style={{ background: `${hotspot.color}15`, color: hotspot.color }}>
                    <hotspot.icon size={24} />
                  </div>
                  <div className={styles.componentInfo}>
                    <span className={styles.componentLabel}>{hotspot.label}</span>
                    <span className={styles.componentSpec}>{hotspot.specs[0]}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rack Scale Comparison */}
            <div className={styles.rackScale}>
              <div className={styles.rackScaleHeader}>
                <span>Rack Scale Support</span>
                <div className={styles.rackScaleToggle}>
                  {[1500, 5000, 10000].map((scale) => (
                    <button
                      key={scale}
                      className={`${styles.scaleBtn} ${rackScale === scale ? styles.scaleBtnActive : ''}`}
                      onClick={() => setRackScale(scale as 1500 | 5000 | 10000)}
                    >
                      {scale.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.rackScaleViz}>
                {/* Visual Rack with 2U Units */}
                <div className={styles.rackContainer}>
                  <motion.div
                    className={styles.rackFrame}
                    animate={{
                      scale: rackScale === 10000 ? 0.7 : rackScale === 5000 ? 0.85 : 1
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={rackScale}
                        className={styles.rackUnits}
                      >
                        {Array.from({ length: rackScale === 1500 ? 1 : rackScale === 5000 ? 4 : 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={styles.serverUnit}
                            initial={{ opacity: 0, x: -30, scale: 0.9 }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              scale: 1,
                              transition: { delay: i * 0.08, duration: 0.3 }
                            }}
                            exit={{ opacity: 0, x: 30, transition: { delay: i * 0.02 } }}
                          >
                            <div className={styles.serverBezel}>
                              <div className={styles.serverLeds}>
                                <span className={styles.ledGreen} />
                                <span className={styles.ledGreen} />
                                <span className={styles.ledBlue} />
                              </div>
                              <span className={styles.serverLabel}>AI400X3</span>
                              <div className={styles.serverDrives}>
                                {Array.from({ length: 6 }).map((_, d) => (
                                  <div key={d} className={styles.driveBay} />
                                ))}
                              </div>
                            </div>
                            {/* Cable connector */}
                            {i < (rackScale === 1500 ? 0 : rackScale === 5000 ? 3 : 7) && (
                              <motion.div
                                className={styles.cableConnector}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1, transition: { delay: i * 0.08 + 0.2 } }}
                              />
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                    {/* Rack rails */}
                    <div className={styles.rackRailLeft} />
                    <div className={styles.rackRailRight} />
                  </motion.div>
                  <motion.div
                    className={styles.gpuCountLabel}
                    key={rackScale}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <span className={styles.gpuNumber}>{rackScale.toLocaleString()}</span>
                    <span className={styles.gpuLabel}>GPUs Supported</span>
                  </motion.div>
                </div>
                <div className={styles.rackStats}>
                  <motion.div
                    className={styles.rackStat}
                    key={`read-${rackScale}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className={styles.rackStatValue}>
                      {(rackScale === 1500 ? 3.36 : rackScale === 5000 ? 11.2 : 22.4).toFixed(1)}
                    </span>
                    <span className={styles.rackStatUnit}>TB/s</span>
                    <span className={styles.rackStatLabel}>Read Throughput</span>
                  </motion.div>
                  <motion.div
                    className={styles.rackStat}
                    key={`write-${rackScale}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className={styles.rackStatValue}>
                      {(rackScale === 1500 ? 2.76 : rackScale === 5000 ? 9.2 : 18.4).toFixed(1)}
                    </span>
                    <span className={styles.rackStatUnit}>TB/s</span>
                    <span className={styles.rackStatLabel}>Write Throughput</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cable Bridge Transition */}
          <motion.div
            className={styles.cableBridge}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className={styles.cableBundle}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.cable}
                  style={{ '--cable-delay': `${i * 0.1}s` } as React.CSSProperties}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                />
              ))}
            </div>
            <div className={styles.cableLabel}>
              <Network size={16} />
              <span>Connected to Software Stack</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION: WHY LUSTRE - THE STORAGE PROBLEM ==================== */}
      <section className={styles.lustreExplainerSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionEyebrow}>THE STORAGE PROBLEM</span>
            <h2>Why Your GPUs Are <span className={styles.textBrand}>Starving</span></h2>
            <p>Understanding the I/O bottleneck that's killing your AI performance.</p>
          </motion.div>

          <div className={styles.problemSolutionGrid}>
            {/* The Problem */}
            <motion.div
              className={styles.problemCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon} style={{ background: 'rgba(237, 39, 56, 0.1)', color: '#ED2738' }}>
                  <AlertTriangle size={28} />
                </div>
                <h3>Traditional Storage</h3>
              </div>

              <div className={styles.bottleneckDiagram}>
                <div className={styles.gpuRow}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={styles.gpuChip}>
                      <Cpu size={16} />
                      <span>GPU {i}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.funnelContainer}>
                  <div className={styles.funnelLines}>
                    {[1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        className={styles.funnelLine}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  <div className={styles.bottleneckPoint}>
                    <AlertCircle size={20} />
                    <span>Single Controller</span>
                  </div>
                </div>
                <div className={styles.storageBox}>
                  <HardDrive size={24} />
                  <span>NAS / SAN</span>
                </div>
              </div>

              <ul className={styles.problemList}>
                <li><X size={16} className={styles.xIcon} /><span>All requests queue through one controller</span></li>
                <li><X size={16} className={styles.xIcon} /><span>GPUs wait idle for data (up to 70% idle time)</span></li>
                <li><X size={16} className={styles.xIcon} /><span>Adding more GPUs makes it worse</span></li>
                <li><X size={16} className={styles.xIcon} /><span>Metadata operations block data transfers</span></li>
              </ul>
            </motion.div>

            {/* The Solution */}
            <motion.div
              className={styles.solutionCard}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon} style={{ background: 'rgba(0, 194, 128, 0.1)', color: '#00C280' }}>
                  <Zap size={28} />
                </div>
                <h3>EXAScaler (Lustre)</h3>
              </div>

              <div className={styles.parallelDiagram}>
                <div className={styles.gpuRow}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`${styles.gpuChip} ${styles.gpuActive}`}>
                      <Cpu size={16} />
                      <span>GPU {i}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.parallelLines}>
                  {[1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className={styles.parallelLine}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <div className={styles.ossRow}>
                  {[1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className={styles.ossNode}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Database size={18} />
                      <span>OSS {i}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <ul className={styles.solutionList}>
                <li><CheckCircle2 size={16} className={styles.checkIcon} /><span>Every client talks to every storage target</span></li>
                <li><CheckCircle2 size={16} className={styles.checkIcon} /><span>Linear scaling: 2x GPUs = 2x throughput</span></li>
                <li><CheckCircle2 size={16} className={styles.checkIcon} /><span>Metadata separated from data path</span></li>
                <li><CheckCircle2 size={16} className={styles.checkIcon} /><span>No single point of bottleneck</span></li>
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ==================== SECTION: THE LUSTRE DIFFERENCE ==================== */}
      <section className={styles.lustreDifferenceSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionEyebrow}>THE LUSTRE ADVANTAGE</span>
            <h2>Why <span className={styles.textSuccess}>EXAScaler</span> Wins</h2>
          </motion.div>

          {/* Key Insight */}
          <motion.div
            className={styles.keyInsight}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className={styles.insightIcon}>
              <Binary size={28} />
            </div>
            <div className={styles.insightContent}>
              <h4>Built for Parallel I/O</h4>
              <p>60% of TOP500 supercomputers run Lustre. Every component—from client to storage—is optimized for simultaneous access. No retrofits, no compromises.</p>
            </div>
          </motion.div>

          {/* Differentiators */}
          <motion.div
            className={styles.differentiators}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className={styles.diffGrid}>
              <div className={styles.diffItem}>
                <div className={styles.diffIcon}><Layers size={24} /></div>
                <div className={styles.diffText}>
                  <span className={styles.diffTitle}>Separation of Concerns</span>
                  <span className={styles.diffDesc}>Metadata and data travel different paths. File lookups never block transfers.</span>
                </div>
              </div>
              <div className={styles.diffItem}>
                <div className={styles.diffIcon}><GitBranch size={24} /></div>
                <div className={styles.diffText}>
                  <span className={styles.diffTitle}>Client-Side Intelligence</span>
                  <span className={styles.diffDesc}>Lustre client stripes data across all targets automatically.</span>
                </div>
              </div>
              <div className={styles.diffItem}>
                <div className={styles.diffIcon}><TrendingUp size={24} /></div>
                <div className={styles.diffText}>
                  <span className={styles.diffTitle}>Proven at Scale</span>
                  <span className={styles.diffDesc}>Battle-tested in the world's largest supercomputers.</span>
                </div>
              </div>
              <div className={styles.diffItem}>
                <div className={styles.diffIcon}><Boxes size={24} /></div>
                <div className={styles.diffText}>
                  <span className={styles.diffTitle}>AI-Optimized</span>
                  <span className={styles.diffDesc}>KV Cache, Hot Pools, and compression for modern AI workloads.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 3: ARCHITECTURE EXPLORER ==================== */}
      <section className={styles.architectureSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionEyebrow}>ARCHITECTURE</span>
            <h2>Explore the <span className={styles.textOrange}>EXAScaler</span> Stack</h2>
            <p>Intelligent Client. Multi-Rail Network. Scale-Out Storage.</p>
          </motion.div>

          <motion.div
            className={styles.architectureDiagram}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEaseExpo }}
          >
            {/* Client Layer */}
            <div className={styles.archClientLayer}>
              <div className={styles.archLayerLabel}>Compute Clients (DGX/HGX)</div>
              <div className={styles.archClientRow}>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`${styles.archClientNode} ${dataFlowActive ? styles.clientActive : ''} ${i === 1 && mgsHandshakeStep >= 4 ? styles.clientMounted : ''}`}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Monitor size={20} />
                    <span>Client {i}</span>
                    {/* Mounted indicator for Client 1 after MGS handshake */}
                    <AnimatePresence>
                      {i === 1 && mgsHandshakeStep >= 4 && (
                        <motion.span
                          className={styles.mountedBadge}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <CheckCircle2 size={12} /> Mounted
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connection Lines - SVG Based */}
            <div className={styles.archConnectionsSvg}>
              <svg className={styles.archSvg} viewBox="0 0 600 120" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Glow filter for data paths */}
                  <filter id="dataGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  {/* Glow filter for MGS gold paths */}
                  <filter id="mgsGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="metaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF7600" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF7600" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="dataGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00C280" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00C280" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="configGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#56809C" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#56809C" stopOpacity="0.5" />
                  </linearGradient>
                  {/* Gold gradient for MGS control signals */}
                  <linearGradient id="mgsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/*
                  Layout: 3 Clients at top (150, 300, 450)
                  Storage: MGS (150), MDS (300), OSS (450) - centered below
                */}

                {/* Config path - Client 2 to MGS (one-time mount config) */}
                <motion.path
                  d="M 300 0 C 300 50 150 70 150 120"
                  stroke="url(#configGradient)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 0.4, ease: premiumEase }}
                />

                {/* Metadata paths - All clients to MDS (thin, dashed) */}
                {[150, 300, 450].map((clientX, i) => (
                  <motion.path
                    key={`meta-${i}`}
                    d={`M ${clientX} 0 C ${clientX} 50 300 70 300 120`}
                    stroke="url(#metaGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={dataFlowStep >= 1 ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04, ease: premiumEase }}
                  />
                ))}

                {/* Data paths - All clients to OSS (thick, solid, GLOWING) */}
                {[150, 300, 450].map((clientX, i) => (
                  <motion.path
                    key={`data-${i}`}
                    d={`M ${clientX} 0 C ${clientX} 50 450 70 450 120`}
                    stroke="url(#dataGradient)"
                    strokeWidth="5"
                    fill="none"
                    filter="url(#dataGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={dataFlowStep >= 2 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 + i * 0.04, ease: premiumEase }}
                  />
                ))}

                {/* Animated metadata particle */}
                {dataFlowStep >= 1 && (
                  <motion.circle
                    r="3"
                    fill="#FF7600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                  >
                    <animateMotion
                      dur="0.6s"
                      repeatCount="indefinite"
                      path="M 300 0 C 300 50 300 70 300 120"
                    />
                  </motion.circle>
                )}

                {/* Animated data particles (larger, glowing) */}
                {dataFlowStep >= 2 && [150, 300, 450].map((clientX, i) => (
                  <motion.circle
                    key={`particle-${i}`}
                    r="6"
                    fill="#00C280"
                    filter="url(#dataGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <animateMotion
                      dur="0.5s"
                      repeatCount="indefinite"
                      path={`M ${clientX} 0 C ${clientX} 50 450 70 450 120`}
                      begin={`${i * 0.15}s`}
                    />
                  </motion.circle>
                ))}

                {/* ========== MGS HANDSHAKE ANIMATION ========== */}
                {/* Step A: Request line - Client 1 to MGS (dashed gray control signal) */}
                {mgsHandshakeStep >= 1 && (
                  <motion.path
                    d="M 150 0 C 150 60 150 60 150 120"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeDasharray="4 6"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: premiumEase }}
                  />
                )}

                {/* Query icon traveling to MGS */}
                {mgsHandshakeStep === 1 && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <circle r="10" fill="#F59E0B" filter="url(#mgsGlow)">
                      <animateMotion
                        dur="0.5s"
                        repeatCount="1"
                        fill="freeze"
                        path="M 150 0 C 150 60 150 60 150 120"
                      />
                    </circle>
                    {/* Question mark icon */}
                    <text fontSize="12" fill="#000" fontWeight="bold" textAnchor="middle" dy="4">
                      <animateMotion
                        dur="0.5s"
                        repeatCount="1"
                        fill="freeze"
                        path="M 150 0 C 150 60 150 60 150 120"
                      />
                      ?
                    </text>
                  </motion.g>
                )}

                {/* Step C: Response line - MGS back to Client 1 (dashed gold) */}
                {mgsHandshakeStep >= 3 && (
                  <motion.path
                    d="M 150 120 C 150 60 150 60 150 0"
                    stroke="url(#mgsGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 6"
                    fill="none"
                    filter="url(#mgsGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                  />
                )}

                {/* Blueprint/Map icon traveling back to Client */}
                {mgsHandshakeStep === 3 && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#F59E0B" filter="url(#mgsGlow)">
                      <animateMotion
                        dur="0.6s"
                        repeatCount="1"
                        fill="freeze"
                        path="M 150 120 C 150 60 150 60 150 0"
                      />
                    </rect>
                    {/* Map grid lines */}
                    <g stroke="#000" strokeWidth="1" fill="none">
                      <line x1="-5" y1="-3" x2="5" y2="-3">
                        <animateMotion dur="0.6s" repeatCount="1" fill="freeze" path="M 150 120 C 150 60 150 60 150 0" />
                      </line>
                      <line x1="-5" y1="0" x2="5" y2="0">
                        <animateMotion dur="0.6s" repeatCount="1" fill="freeze" path="M 150 120 C 150 60 150 60 150 0" />
                      </line>
                      <line x1="-5" y1="3" x2="5" y2="3">
                        <animateMotion dur="0.6s" repeatCount="1" fill="freeze" path="M 150 120 C 150 60 150 60 150 0" />
                      </line>
                    </g>
                  </motion.g>
                )}
              </svg>

              {/* Network Label Overlay */}
              <div className={styles.networkLabelOverlay}>
                <div className={styles.networkLabel}>
                  <Network size={16} />
                  <span>LNet (InfiniBand / RoCE)</span>
                </div>
              </div>
            </div>

            {/* Storage Layer */}
            <div className={styles.archStorageLayer}>
              <div className={styles.archLayerLabel}>EXAScaler Cluster</div>
              <div className={styles.archStorageRow}>
                {Object.entries(nodeInfo).filter(([key]) => key !== 'lnet').map(([key, node], index) => (
                  <motion.div
                    key={key}
                    className={`${styles.archStorageNode} ${styles.nodeClickable} ${key === 'mgs' && mgsHandshakeStep >= 2 ? styles.mgsPulse : ''} ${dataFlowStep >= 1 && key === 'mds' ? styles.nodeHighlight : ''} ${dataFlowStep >= 2 && key === 'oss' ? styles.nodePulse : ''}`}
                    style={{ '--node-color': key === 'mgs' && mgsHandshakeStep >= 2 ? '#F59E0B' : node.color } as React.CSSProperties}
                    onClick={() => {
                      if (key === 'mgs') {
                        triggerMgsHandshake()
                      } else {
                        setActiveModal(key)
                      }
                    }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={styles.archNodeIcon} style={{ background: key === 'mgs' && mgsHandshakeStep >= 2 ? 'rgba(245, 158, 11, 0.15)' : `${node.color}15`, color: key === 'mgs' && mgsHandshakeStep >= 2 ? '#F59E0B' : node.color }}>
                      <node.icon size={28} />
                    </div>
                    <div className={styles.archNodeInfo}>
                      <span className={styles.archNodeName}>{node.name}</span>
                      <span className={styles.archNodeFull}>{node.fullName}</span>
                      <span className={styles.archNodeTarget}>→ {node.target}</span>
                    </div>
                    {/* Click hint for all nodes */}
                    <div className={styles.nodeClickHint} style={{ '--hint-color': node.color } as React.CSSProperties}>
                      <Eye size={12} /> Click to learn more
                    </div>
                    <AnimatePresence>
                      {/* MGS Tooltip - shows during processing */}
                      {key === 'mgs' && mgsHandshakeStep >= 2 && mgsHandshakeStep < 4 && (
                        <motion.div
                          className={styles.mgsTooltip}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        >
                          <strong>Management Server (MGS)</strong>
                          <p>Holds the Cluster Map. Clients connect here once to discover file system topology.</p>
                        </motion.div>
                      )}
                      {dataFlowStep >= 1 && key === 'mds' && (
                        <motion.div
                          className={styles.archFlowBadge}
                          style={{ background: 'rgba(255, 118, 0, 0.15)', color: '#FF7600' }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          Metadata only
                        </motion.div>
                      )}
                      {dataFlowStep >= 2 && key === 'oss' && (
                        <motion.div
                          className={styles.archFlowBadge}
                          style={{ background: 'rgba(0, 194, 128, 0.15)', color: '#00C280' }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          Data stripes!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className={styles.archLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendLine} style={{ background: '#F59E0B', opacity: 0.7 }} />
                <span>Config/Registry (MGS)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendLine} style={{ background: '#FF7600', borderStyle: 'dashed' }} />
                <span>Control Path (Metadata)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendLine} style={{ background: '#00C280' }} />
                <span>Data Path (Bypasses MDS)</span>
              </div>
            </div>
          </motion.div>

          <motion.div className={styles.dataFlowTrigger} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
            <motion.button className={styles.writeFileButton} onClick={triggerDataFlow} disabled={dataFlowActive} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              {dataFlowActive ? (<><Activity size={20} className={styles.spinningIcon} />Writing Data...</>) : (<><Play size={20} />Write Data</>)}
            </motion.button>
            <p className={styles.triggerHint}>Watch metadata go to MDS while data bypasses directly to OSS</p>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 4: KV CACHE FABRIC ==================== */}
      <section className={styles.kvCacheSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeaderDark}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionBadge}>THE INFERENCE MULTIPLIER</span>
            <h2>Stop Buying GPUs for <span className={styles.textBrand}>Memory</span></h2>
            <p>Accelerate Large Context Inference by 20x.</p>
            <p className={styles.sectionExplanatory}>
              LLM inference is hitting a memory wall. Storing Key-Value (KV) cache on GPUs is expensive and limits concurrent users. DDN's KV Cache Fabric offloads this data to high-speed storage, expanding capacity by 1000x. This reduces Time to First Token (TTFT) by up to 20x and increases inference throughput by 60%, allowing you to serve more users without buying more GPUs.
            </p>
          </motion.div>

          <motion.div
            className={styles.kvCacheDemo}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Split Screen Benchmark */}
            <div className={styles.benchmarkSplit}>
              <div className={`${styles.benchmarkSide} ${standardTTFT >= 2000 ? styles.benchmarkOOM : ''}`}>
                <div className={styles.benchmarkHeader}>
                  <AlertCircle size={20} />
                  <span>Standard GPU Memory</span>
                </div>
                <div className={styles.benchmarkBar}>
                  <motion.div
                    className={`${styles.benchmarkFill} ${standardTTFT >= 2000 ? styles.benchmarkFillOOM : ''}`}
                    style={{ background: 'linear-gradient(90deg, #ED2738, #FE3546)' }}
                    animate={{
                      width: `${(standardTTFT / 2000) * 100}%`,
                      boxShadow: standardTTFT >= 2000 ? '0 0 30px rgba(237, 39, 56, 0.8)' : 'none'
                    }}
                  />
                  {/* OOM Flash Indicator */}
                  <AnimatePresence>
                    {standardTTFT >= 2000 && (
                      <motion.div
                        className={styles.oomIndicator}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <AlertTriangle size={16} />
                        <span>OOM</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={styles.benchmarkValue}>
                  <span>{standardTTFT}</span>
                  <span className={styles.benchmarkUnit}>ms TTFT</span>
                  {standardTTFT >= 2000 && (
                    <motion.span
                      className={styles.oomBadge}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      MEMORY EXCEEDED
                    </motion.span>
                  )}
                </div>
              </div>

              <div className={styles.benchmarkVs}>VS</div>

              <div className={styles.benchmarkSide}>
                <div className={styles.benchmarkHeader}>
                  <Zap size={20} style={{ color: '#00C280' }} />
                  <span>DDN KV Cache Fabric</span>
                </div>
                <div className={styles.benchmarkBar}>
                  <motion.div
                    className={styles.benchmarkFill}
                    style={{ background: 'linear-gradient(135deg, #00C280 0%, #1A81AF 100%)' }}
                    animate={{ width: `${(ddnTTFT / 2000) * 100}%` }}
                  />
                </div>
                <div className={styles.benchmarkValue}>
                  <span>{ddnTTFT}</span>
                  <span className={styles.benchmarkUnit}>ms TTFT</span>
                  {kvBenchmarkComplete && (
                    <motion.span
                      className={styles.speedupBadge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      20x Faster
                    </motion.span>
                  )}
                </div>
              </div>
            </div>

            {/* Run Benchmark - Moved up for visibility */}
            <motion.button
              className={styles.runBenchmarkBtn}
              onClick={runKvBenchmark}
              disabled={kvBenchmarkRunning}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {kvBenchmarkRunning ? (<><Activity size={18} className={styles.spinningIcon} />Running...</>) : (<><Play size={18} />Run Benchmark</>)}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 5: FILE LAYOUT (DoM & PFL) ==================== */}
      <section className={styles.layoutSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionEyebrow}>SMART OPTIMIZATION</span>
            <h2>Optimized for <span className={styles.textSuccess}>Every File Size</span></h2>
            <p>From 4KB Config Files to 100TB Checkpoints.</p>
            <p className={styles.sectionExplanatory}>
              AI workflows are chaotic, mixing tiny metadata files with massive model checkpoints. EXAScaler handles both automatically. Data on MDT (DoM) stores small files directly on the Metadata Target for instant access. Progressive File Layout (PFL) automatically stripes growing files across more disks to maximize bandwidth.
            </p>
          </motion.div>

          <motion.div
            className={styles.layoutDemo}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.sliderContainer}>
              <div className={styles.sliderLabel}>
                <span>File Size:</span>
                <motion.span
                  className={styles.sliderValue}
                  key={getFileSizeDisplay()}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  style={{
                    color: getFileSizeCategory() === 'dom' ? '#56809C' :
                           getFileSizeCategory() === 'pfl' ? '#FF7600' : '#00C280'
                  }}
                >
                  {getFileSizeDisplay()}
                </motion.span>
              </div>
              <div ref={sliderRef} className={styles.sliderTrack} onMouseDown={handleSliderMouseDown}>
                <div
                  className={styles.sliderProgress}
                  style={{
                    width: `${(Math.log10(fileSize) / 9) * 100}%`,
                    background: getFileSizeCategory() === 'dom' ? '#56809C' :
                                getFileSizeCategory() === 'pfl' ? '#FF7600' : '#00C280'
                  }}
                />
                <motion.div
                  className={styles.sliderHandle}
                  style={{
                    left: `${(Math.log10(fileSize) / 9) * 100}%`,
                    background: getFileSizeCategory() === 'dom' ? '#56809C' :
                                getFileSizeCategory() === 'pfl' ? '#FF7600' : '#00C280'
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
                <div className={styles.sliderMarkers}>
                  <span style={{ left: '0%' }}>1KB</span>
                  <span style={{ left: '33%' }}>1MB</span>
                  <span style={{ left: '66%' }}>1GB</span>
                  <span style={{ left: '100%' }}>1PB</span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={getFileSizeCategory()}
                className={styles.layoutCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: premiumEase }}
              >
                {getFileSizeCategory() === 'dom' && (
                  <>
                    <div className={styles.layoutHeader}>
                      <div className={styles.layoutBadge} style={{ background: 'rgba(86, 128, 156, 0.1)', color: '#56809C' }}>
                        <Zap size={14} style={{ marginRight: 6 }} />
                        Data on MDT
                      </div>
                      <span className={styles.layoutLatency}>~0.1ms latency</span>
                    </div>
                    <p className={styles.layoutDescription}>Small files stored entirely on flash-backed MDT. Zero network hops to OSS.</p>
                    <div className={styles.layoutGraphicApple}>
                      <div className={styles.fileSource}>
                        <motion.div
                          className={styles.fileIconApple}
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, ease: premiumEase }}
                        >
                          <FileText size={28} strokeWidth={1.5} />
                        </motion.div>
                        <span className={styles.fileLabel}>{getFileSizeDisplay()}</span>
                      </div>

                      <div className={styles.dataFlowContainer}>
                        <svg className={styles.flowSvg} viewBox="0 0 120 40">
                          <motion.path
                            d="M 0 20 L 120 20"
                            stroke="#56809C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: premiumEase }}
                          />
                          <motion.circle
                            cx="0"
                            cy="20"
                            r="4"
                            fill="#56809C"
                            initial={{ cx: 0 }}
                            animate={{ cx: [0, 120] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                          />
                        </svg>
                      </div>

                      <motion.div
                        className={styles.targetApple}
                        style={{ '--target-color': '#56809C' } as React.CSSProperties}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3, ease: premiumEase }}
                      >
                        <div className={styles.targetIcon}><Database size={24} strokeWidth={1.5} /></div>
                        <div className={styles.targetInfo}>
                          <span className={styles.targetName}>MDT</span>
                          <span className={styles.targetType}>Flash NVMe</span>
                        </div>
                      </motion.div>
                    </div>
                  </>
                )}
                {getFileSizeCategory() === 'pfl' && (
                  <>
                    <div className={styles.layoutHeader}>
                      <div className={styles.layoutBadge} style={{ background: 'rgba(255, 118, 0, 0.1)', color: '#FF7600' }}>
                        <Layers size={14} style={{ marginRight: 6 }} />
                        Progressive File Layout
                      </div>
                      <span className={styles.layoutLatency}>4-way stripe</span>
                    </div>
                    <p className={styles.layoutDescription}>Header on MDT for fast metadata. Body striped across OSTs for bandwidth.</p>
                    <div className={styles.layoutGraphicApple}>
                      <div className={styles.fileSource}>
                        <motion.div
                          className={styles.fileIconApple}
                          style={{ borderColor: '#FF7600', background: 'rgba(255, 118, 0, 0.08)' }}
                        >
                          <FileText size={28} strokeWidth={1.5} style={{ color: '#FF7600' }} />
                        </motion.div>
                        <span className={styles.fileLabel}>{getFileSizeDisplay()}</span>
                      </div>

                      <div className={styles.dataFlowContainerPfl}>
                        <svg className={styles.flowSvgPfl} viewBox="0 0 100 100">
                          {/* MDT path (top) */}
                          <motion.path
                            d="M 0 50 Q 30 50 50 20 L 100 20"
                            stroke="#56809C"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: premiumEase }}
                          />
                          {/* OST paths (bottom) */}
                          {[40, 55, 70, 85].map((y, i) => (
                            <motion.path
                              key={i}
                              d={`M 0 50 Q 30 50 50 ${y} L 100 ${y}`}
                              stroke="#FF7600"
                              strokeWidth="2"
                              strokeLinecap="round"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: premiumEase }}
                            />
                          ))}
                          {/* Animated dots */}
                          <motion.circle r="3" fill="#56809C" initial={{ opacity: 0 }} animate={{ opacity: 1, offsetDistance: ['0%', '100%'] }} style={{ offsetPath: 'path("M 0 50 Q 30 50 50 20 L 100 20")' }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }} />
                          {[40, 55, 70, 85].map((y, i) => (
                            <motion.circle key={i} r="3" fill="#FF7600" initial={{ opacity: 0 }} animate={{ opacity: 1, offsetDistance: ['0%', '100%'] }} style={{ offsetPath: `path("M 0 50 Q 30 50 50 ${y} L 100 ${y}")` }} transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }} />
                          ))}
                        </svg>
                      </div>

                      <div className={styles.targetGridPfl}>
                        <motion.div
                          className={styles.targetAppleSmall}
                          style={{ '--target-color': '#56809C' } as React.CSSProperties}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.2, ease: premiumEase }}
                        >
                          <Database size={16} strokeWidth={1.5} />
                          <span>MDT</span>
                          <span className={styles.targetSubtext}>Header</span>
                        </motion.div>
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className={styles.targetAppleSmall}
                            style={{ '--target-color': '#FF7600' } as React.CSSProperties}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: premiumEase }}
                          >
                            <HardDrive size={16} strokeWidth={1.5} />
                            <span>OST {i}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {getFileSizeCategory() === 'wide' && (
                  <>
                    <div className={styles.layoutHeader}>
                      <div className={styles.layoutBadge} style={{ background: 'rgba(0, 194, 128, 0.1)', color: '#00C280' }}>
                        <Maximize2 size={14} style={{ marginRight: 6 }} />
                        Wide Striping
                      </div>
                      <span className={styles.layoutLatency}>200+ OSTs</span>
                    </div>
                    <p className={styles.layoutDescription}>Massive files stripe across all OSTs. Maximum aggregate bandwidth.</p>
                    <div className={styles.layoutGraphicApple}>
                      <div className={styles.fileSource}>
                        <motion.div
                          className={styles.fileIconApple}
                          style={{ borderColor: '#00C280', background: 'rgba(0, 194, 128, 0.08)' }}
                        >
                          <FileText size={28} strokeWidth={1.5} style={{ color: '#00C280' }} />
                        </motion.div>
                        <span className={styles.fileLabel}>{getFileSizeDisplay()}</span>
                      </div>

                      <div className={styles.dataFlowContainerWide}>
                        <svg className={styles.flowSvgWide} viewBox="0 0 80 120">
                          {[...Array(12)].map((_, i) => {
                            const startY = 60
                            const endY = 10 + (i * 9)
                            return (
                              <motion.path
                                key={i}
                                d={`M 0 ${startY} C 30 ${startY} 50 ${endY} 80 ${endY}`}
                                stroke="#00C280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 + (i % 3) * 0.15 }}
                                transition={{ duration: 0.4, delay: i * 0.03, ease: premiumEase }}
                              />
                            )
                          })}
                          {[...Array(6)].map((_, i) => (
                            <motion.circle
                              key={i}
                              r="2.5"
                              fill="#00C280"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: [0, 1, 1, 0],
                                cx: [0, 80],
                                cy: [60, 10 + (i * 18)]
                              }}
                              transition={{
                                duration: 1.2,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatDelay: 0.3
                              }}
                            />
                          ))}
                        </svg>
                      </div>

                      <div className={styles.targetGridWide}>
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={styles.targetAppleMini}
                            style={{ '--target-color': '#00C280' } as React.CSSProperties}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + i * 0.025, ease: premiumEase }}
                          >
                            <HardDrive size={12} strokeWidth={1.5} />
                          </motion.div>
                        ))}
                        <motion.div
                          className={styles.moreTargets}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.6, ease: premiumEase }}
                        >
                          +188
                        </motion.div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 6: MULTI-TENANCY ==================== */}
      <section className={styles.multiTenancySection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeaderDark}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionBadge}>AI CLOUD & SECURITY</span>
            <h2>Add Tenants <span className={styles.textSuccess}>10x Faster</span></h2>
            <p>Secure Multi-Tenancy for the AI Cloud.</p>
            <p className={styles.sectionExplanatory}>
              Deploying AI-as-a-Service? EXAScaler enables fully isolated environments in seconds via API. Nodemaps securely map client IPs to specific file system views, preventing unauthorized access. Client-Side Encryption ensures data is encrypted before it leaves the client node. Quotas enforce strict capacity limits for users, groups, and projects.
            </p>
          </motion.div>

          <motion.div
            className={styles.tenantDemo}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEaseExpo }}
          >
            {/* Console Simulator */}
            <div className={styles.consoleWindow}>
              <div className={styles.consoleTitleBar}>
                <div className={styles.consoleDots}>
                  <span style={{ background: '#FF5F56' }} />
                  <span style={{ background: '#FFBD2E' }} />
                  <span style={{ background: '#27CA40' }} />
                </div>
                <span className={styles.consoleTitle}>EMF Console</span>
              </div>
              <div className={styles.consoleBody}>
                {consoleLines.map((line, i) => (
                  <motion.div
                    key={i}
                    className={styles.consoleLine}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                ))}
                <span className={styles.consoleCursor}>_</span>
              </div>
            </div>

            {/* Tenant Creation Steps */}
            <div className={styles.tenantSteps}>
              <motion.div className={`${styles.tenantStep} ${tenantStep >= 1 ? styles.tenantStepComplete : ''}`}>
                <div className={styles.tenantStepIcon}><FolderPlus size={20} /></div>
                <span>Directory</span>
                <span className={styles.tenantStepPath}>/exafs/ai-team-01</span>
              </motion.div>
              <motion.div className={`${styles.tenantStep} ${tenantStep >= 2 ? styles.tenantStepComplete : ''}`}>
                <div className={styles.tenantStepIcon}><Gauge size={20} /></div>
                <span>Project Quota</span>
                <span className={styles.tenantStepPath}>50TB / 10M inodes</span>
              </motion.div>
              <motion.div className={`${styles.tenantStep} ${tenantStep >= 3 ? styles.tenantStepComplete : ''}`}>
                <div className={styles.tenantStepIcon}><Globe size={20} /></div>
                <span>Network Isolation</span>
                <span className={styles.tenantStepPath}>VLAN/LNet</span>
              </motion.div>
            </div>

            <div className={styles.tenantControls}>
              <motion.button
                className={styles.createTenantBtn}
                onClick={createTenant}
                disabled={tenantCreating}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {tenantCreating ? (<><Activity size={18} className={styles.spinningIcon} />Creating...</>) : (<><Terminal size={18} />Execute Mutation</>)}
              </motion.button>
              <motion.button
                className={styles.securityBtn}
                onClick={() => setSecurityOverlay(!securityOverlay)}
                whileHover={{ y: -2 }}
              >
                <Shield size={18} />
                {securityOverlay ? 'Hide Security' : 'View Security'}
              </motion.button>
            </div>

            {/* Security Overlay */}
            <AnimatePresence>
              {securityOverlay && (
                <motion.div
                  className={styles.securityOverlay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className={styles.securityCard}>
                    <Key size={24} />
                    <span>Nodemap</span>
                    <p>Client identity mapping with Root Squash</p>
                  </div>
                  <div className={styles.securityCard}>
                    <Lock size={24} />
                    <span>Client Encryption</span>
                    <p>Data encrypted at rest and in transit</p>
                  </div>
                  <div className={styles.securityCard}>
                    <Layers3 size={24} />
                    <span>Tenant Isolation</span>
                    <p>Tenant A cannot see Tenant B's data</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 7: HOT POOLS (Enhanced) ==================== */}
      <section className={styles.hotPoolsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionEyebrow}>COST EFFICIENCY</span>
            <h2>Flash Performance at <span className={styles.textOrange}>HDD Prices</span></h2>
            <p>Automated Hot Pools & Tiering.</p>
            <p className={styles.sectionExplanatory}>
              Stop paying Flash prices for cold data. Hot Pools automatically migrate inactive data to cost-effective HDD tiers while keeping active datasets on high-performance NVMe. The best part? It's transparent. Users see a single namespace and files are recalled instantly upon access, so your data scientists never have to manage storage tiers manually.
            </p>
          </motion.div>

          <motion.div
            className={styles.tieringSimulator}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEaseExpo }}
          >
            {/* Flash Pool Capacity */}
            <div className={styles.flashCapacity}>
              <div className={styles.flashCapacityHeader}>
                <Flame size={20} style={{ color: '#ED2738' }} />
                <span>Flash Pool Capacity</span>
                <span className={styles.flashPercent}>{flashPoolPercent}%</span>
              </div>
              <div className={styles.flashCapacityBar}>
                <motion.div
                  className={styles.flashCapacityFill}
                  animate={{ width: `${flashPoolPercent}%` }}
                  style={{
                    background: flashPoolPercent > 95
                      ? 'linear-gradient(90deg, #ED2738, #FE3546)'
                      : flashPoolPercent > 80
                        ? 'linear-gradient(90deg, #FF7600, #FF8E0A)'
                        : 'linear-gradient(90deg, #00C280, #00C280)'
                  }}
                />
              </div>
              {spilloverActive && (
                <motion.div
                  className={styles.spilloverAlert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <AlertTriangle size={16} />
                  <span>Flash full - Writes continue to Spill Pool</span>
                  <Shield size={16} style={{ color: '#00C280' }} />
                </motion.div>
              )}
            </div>

            {/* Timer */}
            <div className={styles.timerDisplay}>
              <Timer size={24} />
              <div className={styles.timerValue}>
                <motion.span key={dayCounter} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Day {dayCounter}</motion.span>
                <span className={styles.timerMax}>/ 30</span>
              </div>
              <div className={styles.timerBar}>
                <motion.div className={styles.timerFill} animate={{ width: `${(dayCounter / 30) * 100}%` }} />
              </div>
            </div>

            {/* Pool Containers */}
            <div className={styles.poolsContainer}>
              <div className={styles.poolCard}>
                <div className={styles.poolHeader}>
                  <div className={styles.poolIcon} style={{ background: 'rgba(237, 39, 56, 0.15)', color: '#ED2738' }}><Flame size={24} /></div>
                  <div className={styles.poolInfo}><span className={styles.poolName}>NVMe (Hot)</span><span className={styles.poolType}>Flash Storage</span></div>
                </div>
                <div className={styles.poolArea}>
                  <AnimatePresence>
                    {hotPoolFiles.map(file => (
                      <motion.div
                        key={file.id}
                        className={`${styles.poolFile} ${file.age > 20 ? styles.fileCooling : ''}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                      >
                        <FileText size={14} />
                        {file.age > 20 && <Snowflake size={10} className={styles.coolingBadge} />}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className={styles.migrationArrow}>
                <motion.div animate={isMigrating && dayCounter > 25 ? { x: [0, 10, 0] } : {}} transition={{ duration: 0.5, repeat: Infinity }}><ArrowRight size={32} /></motion.div>
                <span>30 days</span>
              </div>

              <div className={styles.poolCard}>
                <div className={styles.poolHeader}>
                  <div className={styles.poolIcon} style={{ background: 'rgba(26, 129, 175, 0.15)', color: '#1A81AF' }}><Snowflake size={24} /></div>
                  <div className={styles.poolInfo}><span className={styles.poolName}>HDD (Cold)</span><span className={styles.poolType}>Capacity Storage</span></div>
                </div>
                <div className={styles.poolArea}>
                  <AnimatePresence>
                    {coldPoolFiles.map(file => (
                      <motion.div
                        key={file.id}
                        className={`${styles.poolFile} ${styles.coldFile} ${recallingFile === file.id ? styles.fileRecalling : ''}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                        onClick={() => recallFile(file.id)}
                        whileHover={{ scale: 1.1 }}
                      >
                        <FileText size={14} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {coldPoolFiles.length > 0 && <p className={styles.recallHint}>Click to recall</p>}
                </div>
              </div>
            </div>

            {/* Spill Pool */}
            {spillPoolFiles.length > 0 && (
              <motion.div
                className={styles.spillPool}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles.poolHeader}>
                  <div className={styles.poolIcon} style={{ background: 'rgba(86, 128, 156, 0.15)', color: '#56809C' }}><Shield size={24} /></div>
                  <div className={styles.poolInfo}><span className={styles.poolName}>Spill Pool (Safety Net)</span><span className={styles.poolType}>Overflow Storage</span></div>
                </div>
                <div className={styles.poolArea}>
                  {spillPoolFiles.map(file => (
                    <motion.div key={file.id} className={styles.poolFile} style={{ borderColor: '#56809C' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}><FileText size={14} /></motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className={styles.tieringControls}>
              <motion.button className={styles.addFilesButton} onClick={addHotPoolFiles} whileHover={{ y: -2 }} whileTap={{ y: 0 }}><FileText size={18} />Add Files</motion.button>
              <motion.button className={styles.startTimerButton} onClick={startMigration} disabled={isMigrating || hotPoolFiles.length === 0} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                {isMigrating ? (<><Activity size={18} className={styles.spinningIcon} />Aging Files...</>) : (<><Clock size={18} />Start 30-Day Timer</>)}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 8: EXTREME IOPS & COMPRESSION ==================== */}
      <section className={styles.iopsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeaderDark}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionBadge}>EXTREME IOPS</span>
            <h2><span className={styles.textSuccess}>20x Faster</span> mmap & <span className={styles.textBlue}>5:1</span> Compression</h2>
            <p>Squeezing every ounce of performance from the pipe.</p>
            <p className={styles.sectionExplanatory}>
              We optimize the I/O path so you don't have to. Client-Side Compression compresses data before it hits the wire, achieving up to 5:1 reduction for training data and 2:1 for checkpoints. Hot Nodes cache frequently read data directly on the client's local NVMe, bypassing the network entirely for repeated training epochs. Optimized mmap delivers 20x faster performance for memory-mapped operations compared to standard NFS.
            </p>
          </motion.div>

          <motion.div
            className={styles.iopsDemo}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Compression Visualization */}
            <div className={styles.compressionViz}>
              <div className={styles.compressionGauges}>
                <div className={styles.gauge}>
                  <div className={styles.gaugeLabel}>Compression Ratio</div>
                  <div className={styles.gaugeArc}>
                    <svg viewBox="0 0 120 60">
                      <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round" />
                      <motion.path
                        d="M 10 55 A 50 50 0 0 1 110 55"
                        fill="none"
                        stroke="#00C280"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: compressionRatio / 5 }}
                      />
                    </svg>
                    <span className={styles.gaugeValue}>{compressionRatio.toFixed(1)}:1</span>
                  </div>
                </div>
                <div className={styles.gauge}>
                  <div className={styles.gaugeLabel}>CPU Usage</div>
                  <div className={styles.gaugeArc}>
                    <svg viewBox="0 0 120 60">
                      <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round" />
                      <motion.path
                        d="M 10 55 A 50 50 0 0 1 110 55"
                        fill="none"
                        stroke="#1A81AF"
                        strokeWidth="8"
                        strokeLinecap="round"
                        animate={{ pathLength: cpuUsage / 100 }}
                      />
                    </svg>
                    <span className={styles.gaugeValue}>{Math.round(cpuUsage)}%</span>
                  </div>
                </div>
              </div>

              <div className={styles.dataComparison}>
                <div className={styles.dataBox}>
                  <span className={styles.dataLabel}>Data on Wire</span>
                  <div className={styles.dataBarContainer}>
                    <motion.div
                      className={styles.dataBar}
                      animate={{ width: `${100 / compressionRatio}%` }}
                      style={{ background: 'linear-gradient(90deg, #00C280, #1A81AF)' }}
                    />
                  </div>
                  <span className={styles.dataValue}>{(100 / compressionRatio).toFixed(0)}GB</span>
                </div>
                <div className={styles.dataBox}>
                  <span className={styles.dataLabel}>Original Data</span>
                  <div className={styles.dataBarContainer}>
                    <div className={styles.dataBar} style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.35))', width: '100%' }} />
                  </div>
                  <span className={styles.dataValue}>100GB</span>
                </div>
              </div>

              <div className={styles.dataTypeToggle}>
                <button className={`${styles.typeBtn} ${dataType === 'checkpoint' ? styles.typeBtnActive : ''}`} onClick={() => { setDataType('checkpoint'); setCompressionRatio(1) }}>AI Checkpoints (2:1)</button>
                <button className={`${styles.typeBtn} ${dataType === 'training' ? styles.typeBtnActive : ''}`} onClick={() => { setDataType('training'); setCompressionRatio(1) }}>Training Data (5:1)</button>
              </div>

              <motion.button className={styles.compressionBtn} onClick={runCompressionDemo} disabled={compressionDemo} whileHover={{ y: -2 }}>
                {compressionDemo ? (<><Activity size={18} className={styles.spinningIcon} />Compressing...</>) : (<><Minimize2 size={18} />Run Compression</>)}
              </motion.button>
            </div>

            {/* Hot Nodes */}
            <div className={styles.hotNodesViz}>
              <div className={styles.hotNodesHeader}>
                <Thermometer size={20} style={{ color: '#FF7600' }} />
                <span>Client-Side Hot Nodes</span>
                <button
                  className={`${styles.hotNodesToggle} ${hotNodesActive ? styles.hotNodesActive : ''}`}
                  onClick={() => setHotNodesActive(!hotNodesActive)}
                >
                  {hotNodesActive ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              <div className={styles.hotNodesDiagram}>
                <div className={styles.dgxNode}>
                  <Monitor size={32} />
                  <span>DGX/HGX Client</span>
                  {hotNodesActive && (
                    <motion.div className={styles.localNvme} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <HardDrive size={16} />
                      <span>Local NVMe Cache</span>
                    </motion.div>
                  )}
                </div>
                <div className={styles.hotNodesArrow}>
                  {hotNodesActive ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <span className={styles.bypassLabel}>Bypassed!</span>
                    </motion.div>
                  ) : (
                    <ArrowRight size={24} />
                  )}
                </div>
                <div className={`${styles.centralStorage} ${hotNodesActive ? styles.storageBypass : ''}`}>
                  <Database size={32} />
                  <span>Central Storage</span>
                </div>
              </div>
              <p className={styles.hotNodesDesc}>Epoch training reads bypass network entirely with local NVMe caching</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 9: HA FAILOVER ==================== */}
      <section className={styles.haSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionEyebrow}>RELIABILITY</span>
            <h2>Zero-Downtime <span className={styles.textBrand}>Failover</span></h2>
            <p>High Availability driven by Pacemaker & Corosync.</p>
            <p className={styles.sectionExplanatory}>
              In the event of a hardware failure, EXAScaler's High Availability (HA) stack keeps your AI jobs running. Resources automatically failover to a peer node in seconds, ensuring continuous data access. Active-Active Controllers serve data simultaneously for maximum performance. Online Upgrades let you update software and firmware without stopping your cluster.
            </p>
          </motion.div>

          <motion.div
            className={styles.haDemo}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.haCluster}>
              <motion.div className={`${styles.haNode} ${haState === 'failed' ? styles.haNodeFailed : ''}`} animate={haState === 'failing' ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.5 }}>
                <div className={styles.haNodeHeader}>
                  <Server size={24} />
                  <span>Node A</span>
                  <motion.div className={styles.statusDot} animate={{ background: haState === 'normal' ? '#00C280' : '#ED2738', boxShadow: haState === 'normal' ? '0 0 10px #00C280' : '0 0 10px #ED2738' }} />
                </div>
                <div className={styles.haNodeStatus}>{haState === 'normal' ? 'Active' : haState === 'failing' ? 'FENCING...' : 'Offline (Fenced)'}</div>
                <div className={styles.haManaging}>{haState === 'normal' && (<><div className={styles.managedTarget}>MDT 1</div><div className={styles.managedTarget}>MDT 2</div></>)}</div>
              </motion.div>

              <div className={styles.heartbeatContainer}>
                <svg className={styles.heartbeatSvg} viewBox="0 0 100 60">
                  {heartbeatActive ? (
                    <>
                      <motion.path d="M 10 30 Q 25 30 30 15 T 50 30 T 70 30 T 90 30" fill="none" stroke="#00C280" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity }} />
                      <motion.circle r="4" fill="#00C280" animate={{ cx: [10, 90], cy: [30, 30] }} transition={{ duration: 1, repeat: Infinity }} />
                    </>
                  ) : (
                    <line x1="10" y1="30" x2="90" y2="30" stroke="#ED2738" strokeWidth="2" strokeDasharray="5 5" />
                  )}
                </svg>
                <span className={styles.heartbeatLabel}>{heartbeatActive ? 'Heartbeat Active' : 'Connection Lost'}</span>
              </div>

              <motion.div className={`${styles.haNode} ${haState === 'failed' ? styles.haNodeActive : ''}`} animate={haState === 'failed' ? { borderColor: '#FEC600' } : {}}>
                <div className={styles.haNodeHeader}>
                  <Server size={24} />
                  <span>Node B</span>
                  <motion.div className={styles.statusDot} animate={{ background: haState === 'failed' ? '#FEC600' : '#FF7600', boxShadow: haState === 'failed' ? '0 0 10px #FEC600' : 'none' }} />
                </div>
                <div className={styles.haNodeStatus}>{haState === 'normal' ? 'Standby' : haState === 'failing' ? 'Detecting...' : 'Active (Takeover)'}</div>
                <div className={styles.haManaging}>{haState === 'failed' && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.managedTargetsGroup}><div className={styles.managedTarget}>MDT 1</div><div className={styles.managedTarget}>MDT 2</div></motion.div>)}</div>
              </motion.div>
            </div>

            <div className={styles.haControls}>
              {haState === 'normal' ? (
                <motion.button className={styles.killButton} onClick={triggerFailover} whileHover={{ y: -2 }} whileTap={{ y: 0 }}><Power size={18} />Kill Node A</motion.button>
              ) : (
                <motion.button className={styles.resetButton} onClick={resetFailover} whileHover={{ y: -2 }} whileTap={{ y: 0 }}><RotateCcw size={18} />Reset Demo</motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 10: FULL STACK OBSERVABILITY ==================== */}
      <section className={styles.observabilitySection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeaderDark}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionBadge}>OBSERVABILITY</span>
            <h2>See More. <span className={styles.textSuccess}>Diagnose Faster.</span></h2>
            <p>Full-stack visibility with DDN Insight.</p>
            <p className={styles.sectionExplanatory}>
              You can't fix what you can't see. The EXAScaler Management Framework (EMF) provides a single pane of glass for your entire cluster. Real-Time Monitoring tracks IOPS, throughput, and latency down to the specific job ID. Jobstats correlate storage performance directly to Slurm jobs and users. The integrated Log Agent automatically collects and uploads diagnostic data to DDN support, often resolving issues before you even notice them.
            </p>
          </motion.div>

          <motion.div
            className={styles.observabilityDemo}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: premiumEaseExpo }}
          >
            {/* Health Rings */}
            <div className={styles.healthRings}>
              {[
                { label: 'MGS', value: 100, color: '#56809C' },
                { label: 'MDS', value: 98, color: '#FF7600' },
                { label: 'OSS', value: 99, color: '#00C280' },
              ].map((ring, i) => (
                <motion.div
                  key={ring.label}
                  className={styles.healthRing}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={ring.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${ring.value * 2.51} 251`}
                      transform="rotate(-90 50 50)"
                      initial={{ strokeDasharray: '0 251' }}
                      whileInView={{ strokeDasharray: `${ring.value * 2.51} 251` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </svg>
                  <div className={styles.healthRingLabel}>
                    <span className={styles.healthValue}>{ring.value}%</span>
                    <span className={styles.healthName}>{ring.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Latency Chart */}
            <div className={styles.latencyGraph}>
              <div className={styles.latencyHeader}>
                <BarChart3 size={20} />
                <span>Latency Monitor</span>
                <div className={styles.liveIndicator}>
                  <span className={styles.liveDot} />
                  LIVE
                </div>
                <span className={styles.latencyHint}>Click spike to investigate</span>
              </div>
              <div
                className={styles.liveChartContainer}
                onClick={() => {
                  const lastSpike = liveLatency.findIndex((p, i) => p.isSpike && i > liveLatency.length - 10)
                  if (lastSpike >= 0) {
                    setChartPaused(true)
                    setSelectedSpike(lastSpike)
                  }
                }}
              >
                <svg className={styles.liveChartSvg} viewBox="0 0 500 100" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[20, 40, 60, 80].map(y => (
                    <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  ))}
                  {/* Main line */}
                  <path
                    d={liveLatency.length > 1 ? `M ${liveLatency.map((p, i) => `${(i / (liveLatency.length - 1)) * 500},${100 - p.value}`).join(' L ')}` : ''}
                    fill="none"
                    stroke="url(#liveGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Area fill */}
                  <path
                    d={liveLatency.length > 1 ? `M 0,100 L ${liveLatency.map((p, i) => `${(i / (liveLatency.length - 1)) * 500},${100 - p.value}`).join(' L ')} L 500,100 Z` : ''}
                    fill="url(#areaGradient)"
                  />
                  {/* Spike markers */}
                  {liveLatency.map((p, i) => p.isSpike && (
                    <circle
                      key={i}
                      cx={(i / (liveLatency.length - 1)) * 500}
                      cy={100 - p.value}
                      r="6"
                      fill="#ED2738"
                      className={styles.spikeMarker}
                    />
                  ))}
                  <defs>
                    <linearGradient id="liveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00C280" />
                      <stop offset="50%" stopColor="#1A81AF" />
                      <stop offset="100%" stopColor="#00C280" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(0, 194, 128, 0.3)" />
                      <stop offset="100%" stopColor="rgba(0, 194, 128, 0)" />
                    </linearGradient>
                  </defs>
                </svg>
                {chartPaused && (
                  <div className={styles.chartPausedOverlay}>
                    <Pause size={24} />
                    <span>PAUSED - Click to resume</span>
                  </div>
                )}
              </div>
              <div className={styles.chartControls}>
                <button
                  className={`${styles.chartControlBtn} ${chartPaused ? styles.chartControlActive : ''}`}
                  onClick={() => {
                    setChartPaused(!chartPaused)
                    if (chartPaused) setSelectedSpike(null)
                  }}
                >
                  {chartPaused ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}
                </button>
              </div>
            </div>

            {/* Drill Down Panel */}
            <AnimatePresence>
              {selectedSpike !== null && liveLatency[selectedSpike]?.spikeData && (
                <motion.div
                  className={styles.drillDown}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className={styles.drillDownHeader}>
                    <Search size={20} />
                    <span>Job Detective</span>
                    <button onClick={() => { setSelectedSpike(null); setChartPaused(false) }}><X size={16} /></button>
                  </div>
                  <div className={styles.drillDownBody}>
                    <div className={styles.drillDownItem}>
                      <span className={styles.drillDownLabel}>Slurm Job ID</span>
                      <span className={styles.drillDownValue}>{liveLatency[selectedSpike].spikeData?.jobId}</span>
                    </div>
                    <div className={styles.drillDownItem}>
                      <span className={styles.drillDownLabel}>User ID</span>
                      <span className={styles.drillDownValue}>{liveLatency[selectedSpike].spikeData?.uid}</span>
                    </div>
                    <div className={styles.drillDownItem}>
                      <span className={styles.drillDownLabel}>Latency</span>
                      <span className={styles.drillDownValue}>{Math.round(liveLatency[selectedSpike].value)}ms</span>
                    </div>
                    <div className={styles.drillDownItem}>
                      <span className={styles.drillDownLabel}>Path</span>
                      <span className={styles.drillDownValue}>/scratch/checkpoint</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Log Stream */}
            <div className={styles.logStream}>
              <div className={styles.logHeader}>
                <Eye size={20} />
                <span>Log Agent Stream</span>
                <span className={styles.logBadge}>Live</span>
              </div>
              <div className={styles.logBody}>
                {logEntries.map((entry, i) => (
                  <motion.div
                    key={i}
                    className={styles.logEntry}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {entry}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 11: PRODUCTION LESSONS ==================== */}
      <section className={styles.lessonsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEaseExpo }}
          >
            <span className={styles.sectionEyebrow}>REAL WORLD</span>
            <h2>Production <span className={styles.textGradient}>Lessons</span></h2>
            <p>What matters when running EXAScaler at scale</p>
          </motion.div>

          <div className={styles.lessonsGrid}>
            {productionLessons.map((lesson, index) => (
              <motion.div
                key={lesson.number}
                className={styles.lessonCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * stagger.fast, duration: duration.fast, ease: ease.outExpo }}
                whileHover={{ scale: 1.02, borderColor: '#00C280' }}
              >
                <span className={styles.lessonNumber}>{lesson.number}</span>
                <h4>{lesson.title}</h4>
                <p>{lesson.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: premiumEaseExpo }}
          >
            <p className={styles.ctaText}>See EXAScaler in action with a live demo tailored to your workload.</p>
            <motion.button className={styles.ctaButton} whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
              Schedule a Demo
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
      </PresentationWrapper>
    </div>
  )
}
