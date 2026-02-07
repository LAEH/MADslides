import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePerformance } from './PerformanceProvider'
import styles from './KVCacheAnimation.module.css'

// ============================================
// TYPE DEFINITIONS
// ============================================

interface FabricCell {
  id: number
  row: number
  col: number
  active: boolean
}

interface VRAMCell {
  id: number
  state: 'empty' | 'filling' | 'active'
  row: number
  col: number
}

interface Projectile {
  id: string
  startTime: number
  yOffset: number
}

type VRAMCellState = VRAMCell['state']

// ============================================
// ANIMATION CONSTANTS (No Magic Numbers)
// ============================================

const ANIMATION_CONFIG = {
  /** Duration for projectile to cross the bridge (ms) */
  PROJECTILE_DURATION_MS: 180,
  /** Interval between data transfers (ms) */
  TRANSFER_INTERVAL_MS: 700,
  /** VRAM fill threshold before flush (0-1) */
  FLUSH_THRESHOLD: 0.8,
  /** Delay between staggered projectiles (ms) */
  PROJECTILE_STAGGER_MS: 25,
  /** Max Y-axis offset for projectile spread (px) */
  PROJECTILE_Y_SPREAD: 20,
  /** Duration of accelerator flash effect (ms) */
  FLASH_DURATION_MS: 150,
  /** Duration cluster stays active (ms) */
  CLUSTER_ACTIVE_DURATION_MS: 200,
  /** Duration of flush effect (ms) */
  FLUSH_EFFECT_DURATION_MS: 300,
  /** Transition from 'filling' to 'active' state (ms) */
  FILL_TO_ACTIVE_DELAY_MS: 80,
  /** Projectile cleanup interval (ms) */
  CLEANUP_INTERVAL_MS: 50,
  /** Bandwidth display jitter interval (ms) */
  BANDWIDTH_JITTER_INTERVAL_MS: 120,
  /** Base bandwidth value (GB/s) */
  BANDWIDTH_BASE: 960,
  /** Bandwidth random jitter range (GB/s) */
  BANDWIDTH_JITTER_RANGE: 15,
  /** Min projectiles per transfer */
  MIN_PROJECTILES: 3,
  /** Max additional projectiles per transfer */
  MAX_EXTRA_PROJECTILES: 2,
  /** Cluster size for cell activation */
  CLUSTER_SIZE: 2,
  /** Cluster edge padding from grid border */
  CLUSTER_EDGE_PADDING: 2,
} as const

// Performance tier grid configurations
const GRID_CONFIG = {
  A: { fabricCols: 16, fabricRows: 16, vramCols: 10, vramRows: 10 },
  B: { fabricCols: 14, fabricRows: 14, vramCols: 9, vramRows: 9 },
  C: { fabricCols: 12, fabricRows: 12, vramCols: 8, vramRows: 8 },
} as const

// ============================================
// UTILITY FUNCTIONS (Pure, Testable)
// ============================================

/**
 * Generates a grid of cells with given dimensions
 */
function generateCellGrid<T>(
  rows: number,
  cols: number,
  createCell: (id: number, row: number, col: number) => T
): T[] {
  const cells: T[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push(createCell(row * cols + col, row, col))
    }
  }
  return cells
}

/**
 * Gets cluster of cell IDs around a center point using Manhattan distance
 */
function getCellCluster(
  centerRow: number,
  centerCol: number,
  size: number,
  maxRows: number,
  maxCols: number
): number[] {
  const cluster: number[] = []
  for (let dr = -size; dr <= size; dr++) {
    for (let dc = -size; dc <= size; dc++) {
      const row = centerRow + dr
      const col = centerCol + dc
      const isInBounds = row >= 0 && row < maxRows && col >= 0 && col < maxCols
      const isWithinManhattanDistance = Math.abs(dr) + Math.abs(dc) <= size + 1
      if (isInBounds && isWithinManhattanDistance) {
        cluster.push(row * maxCols + col)
      }
    }
  }
  return cluster
}

/**
 * Maps VRAM cell state to CSS class name suffix
 */
function getVRAMCellClassName(state: VRAMCellState): string {
  const stateClassMap: Record<VRAMCellState, string> = {
    empty: 'vramEmpty',
    filling: 'vramFilling',
    active: 'vramActive',
  }
  return stateClassMap[state]
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * KV Cache Animation - Block-to-Block Transfer Visualization
 *
 * Demonstrates high-velocity data injection from DDN Storage to GPU VRAM:
 * - Dense blue memory block grid with cluster activation
 * - Glass Accelerator bridge with particle physics
 * - Orange VRAM grid with green flush effect
 */
export default function KVCacheAnimation() {
  const performance = usePerformance()

  // Refs for cleanup (prevents memory leaks)
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set())
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set())
  const isMountedRef = useRef(true)

  // Grid configuration based on performance tier
  const gridConfig = useMemo(() => {
    return GRID_CONFIG[performance.tier] ?? GRID_CONFIG.A
  }, [performance.tier])

  // State
  const [fabricCells, setFabricCells] = useState<FabricCell[]>([])
  const [vramCells, setVramCells] = useState<VRAMCell[]>([])
  const [projectiles, setProjectiles] = useState<Projectile[]>([])
  const [vramFillProgress, setVramFillProgress] = useState(0)
  const [bandwidthDisplay, setBandwidthDisplay] = useState(ANIMATION_CONFIG.BANDWIDTH_BASE + 7)
  const [isAcceleratorFlashing, setIsAcceleratorFlashing] = useState(false)
  const [isVramFlushing, setIsVramFlushing] = useState(false)

  // ============================================
  // SAFE TIMEOUT/INTERVAL HELPERS
  // ============================================

  const safeTimeout = useCallback((callback: () => void, delay: number): NodeJS.Timeout => {
    const timeout = setTimeout(() => {
      if (isMountedRef.current) {
        callback()
      }
      timeoutsRef.current.delete(timeout)
    }, delay)
    timeoutsRef.current.add(timeout)
    return timeout
  }, [])

  const safeInterval = useCallback((callback: () => void, delay: number): NodeJS.Timeout => {
    const interval = setInterval(() => {
      if (isMountedRef.current) {
        callback()
      }
    }, delay)
    intervalsRef.current.add(interval)
    return interval
  }, [])

  // Cleanup all timeouts and intervals on unmount
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      timeoutsRef.current.forEach(clearTimeout)
      intervalsRef.current.forEach(clearInterval)
      timeoutsRef.current.clear()
      intervalsRef.current.clear()
    }
  }, [])

  // ============================================
  // GRID INITIALIZATION
  // ============================================

  useEffect(() => {
    const newFabricCells = generateCellGrid<FabricCell>(
      gridConfig.fabricRows,
      gridConfig.fabricCols,
      (id, row, col) => ({ id, row, col, active: false })
    )
    setFabricCells(newFabricCells)

    const newVramCells = generateCellGrid<VRAMCell>(
      gridConfig.vramRows,
      gridConfig.vramCols,
      (id, row, col) => ({ id, row, col, state: 'empty' })
    )
    setVramCells(newVramCells)
  }, [gridConfig])

  // ============================================
  // DATA TRANSFER LOGIC
  // ============================================

  const triggerDataTransfer = useCallback(() => {
    if (performance.prefersReducedMotion) return

    const { fabricRows, fabricCols, vramRows, vramCols } = gridConfig
    const { CLUSTER_SIZE, CLUSTER_EDGE_PADDING } = ANIMATION_CONFIG

    // Select random cluster center (with edge padding)
    const centerRow = Math.floor(Math.random() * (fabricRows - CLUSTER_EDGE_PADDING * 2)) + CLUSTER_EDGE_PADDING
    const centerCol = Math.floor(Math.random() * (fabricCols - CLUSTER_EDGE_PADDING * 2)) + CLUSTER_EDGE_PADDING
    const clusterIds = getCellCluster(centerRow, centerCol, CLUSTER_SIZE, fabricRows, fabricCols)

    // 1. Activate source cluster
    setFabricCells(prev => prev.map(cell => ({
      ...cell,
      active: clusterIds.includes(cell.id)
    })))

    // 2. Fire projectiles immediately
    const projectileCount = ANIMATION_CONFIG.MIN_PROJECTILES +
      Math.floor(Math.random() * (ANIMATION_CONFIG.MAX_EXTRA_PROJECTILES + 1))

    const newProjectiles: Projectile[] = Array.from({ length: projectileCount }, (_, i) => ({
      id: `p-${Date.now()}-${i}`,
      startTime: Date.now() + i * ANIMATION_CONFIG.PROJECTILE_STAGGER_MS,
      yOffset: (Math.random() - 0.5) * ANIMATION_CONFIG.PROJECTILE_Y_SPREAD,
    }))
    setProjectiles(prev => [...prev, ...newProjectiles])

    // 3. Flash accelerator
    setIsAcceleratorFlashing(true)
    safeTimeout(() => setIsAcceleratorFlashing(false), ANIMATION_CONFIG.FLASH_DURATION_MS)

    // 4. Deactivate cluster after visual feedback
    safeTimeout(() => {
      setFabricCells(prev => prev.map(cell => ({ ...cell, active: false })))
    }, ANIMATION_CONFIG.CLUSTER_ACTIVE_DURATION_MS)

    // 5. Fill VRAM after projectiles arrive
    safeTimeout(() => {
      setVramFillProgress(prev => {
        const totalCells = vramRows * vramCols
        const fillIncrement = 1 / (vramCols * 1.2)
        const newFill = prev + fillIncrement

        // Check for flush threshold
        if (newFill >= ANIMATION_CONFIG.FLUSH_THRESHOLD) {
          setIsVramFlushing(true)
          safeTimeout(() => {
            setIsVramFlushing(false)
            setVramCells(prevCells => prevCells.map(cell => ({ ...cell, state: 'empty' })))
            setVramFillProgress(0)
          }, ANIMATION_CONFIG.FLUSH_EFFECT_DURATION_MS)
          return prev // Don't update progress during flush
        }

        // Fill cells progressively
        const cellsToFill = Math.floor(newFill * totalCells)
        setVramCells(prevCells => prevCells.map((cell, idx) => {
          if (idx < cellsToFill && cell.state === 'empty') {
            return { ...cell, state: 'filling' }
          }
          return cell
        }))

        // Transition filling -> active after delay
        safeTimeout(() => {
          setVramCells(prevCells => prevCells.map(cell =>
            cell.state === 'filling' ? { ...cell, state: 'active' } : cell
          ))
        }, ANIMATION_CONFIG.FILL_TO_ACTIVE_DELAY_MS)

        return newFill
      })
    }, ANIMATION_CONFIG.PROJECTILE_DURATION_MS)
  }, [gridConfig, performance.prefersReducedMotion, safeTimeout])

  // ============================================
  // ANIMATION LOOPS
  // ============================================

  // Projectile cleanup
  useEffect(() => {
    if (performance.prefersReducedMotion) return

    const interval = safeInterval(() => {
      const now = Date.now()
      const maxAge = ANIMATION_CONFIG.PROJECTILE_DURATION_MS + ANIMATION_CONFIG.CLEANUP_INTERVAL_MS
      setProjectiles(prev => prev.filter(p => now - p.startTime < maxAge))
    }, ANIMATION_CONFIG.CLEANUP_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      intervalsRef.current.delete(interval)
    }
  }, [performance.prefersReducedMotion, safeInterval])

  // Main transfer loop
  useEffect(() => {
    if (performance.prefersReducedMotion) return

    const interval = safeInterval(triggerDataTransfer, ANIMATION_CONFIG.TRANSFER_INTERVAL_MS)
    triggerDataTransfer() // Initial trigger

    return () => {
      clearInterval(interval)
      intervalsRef.current.delete(interval)
    }
  }, [triggerDataTransfer, performance.prefersReducedMotion, safeInterval])

  // Bandwidth jitter
  useEffect(() => {
    if (performance.prefersReducedMotion) return

    const interval = safeInterval(() => {
      setBandwidthDisplay(
        ANIMATION_CONFIG.BANDWIDTH_BASE + Math.floor(Math.random() * ANIMATION_CONFIG.BANDWIDTH_JITTER_RANGE)
      )
    }, ANIMATION_CONFIG.BANDWIDTH_JITTER_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      intervalsRef.current.delete(interval)
    }
  }, [performance.prefersReducedMotion, safeInterval])

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className={styles.container}>
      {/* KV Fabric - Left Side */}
      <div className={styles.fabricPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.panelIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className={styles.panelTitle}>
            <span className={styles.titleMain}>KV Fabric</span>
            <span className={styles.titleSub}>DDN Storage</span>
          </div>
        </div>
        <div
          className={styles.fabricGrid}
          style={{
            gridTemplateColumns: `repeat(${gridConfig.fabricCols}, 1fr)`,
            gridTemplateRows: `repeat(${gridConfig.fabricRows}, 1fr)`,
          }}
        >
          {fabricCells.map(cell => (
            <div
              key={cell.id}
              className={`${styles.fabricCell} ${cell.active ? styles.fabricActive : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Glass Accelerator - Center Bridge */}
      <div className={styles.acceleratorZone}>
        <div className={`${styles.glassAccelerator} ${isAcceleratorFlashing ? styles.flashing : ''}`}>
          {/* Projectile track */}
          <div className={styles.projectileTrack}>
            <AnimatePresence>
              {projectiles.map(projectile => {
                const elapsed = Date.now() - projectile.startTime
                const progress = Math.min(1, Math.max(0, elapsed / ANIMATION_CONFIG.PROJECTILE_DURATION_MS))

                if (progress <= 0) return null

                // Opacity fade in/out at edges
                const opacity = progress < 0.05
                  ? progress * 20
                  : progress > 0.95
                    ? (1 - progress) * 20
                    : 1

                return (
                  <motion.div
                    key={projectile.id}
                    className={styles.projectile}
                    style={{ top: `calc(50% + ${projectile.yOffset}px)` }}
                    initial={{ left: '-5%', opacity: 0, scale: 0.6 }}
                    animate={{
                      left: `${progress * 105}%`,
                      opacity,
                      scale: 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.02, ease: 'linear' }}
                  />
                )
              })}
            </AnimatePresence>
          </div>

          {/* Bandwidth Display */}
          <div className={styles.bandwidthDisplay}>
            <span className={styles.bandwidthValue}>{bandwidthDisplay}</span>
            <span className={styles.bandwidthUnit}>GB/s</span>
          </div>
        </div>
      </div>

      {/* GPU VRAM - Right Side */}
      <div className={`${styles.vramPanel} ${isVramFlushing ? styles.flushing : ''}`}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle} style={{ textAlign: 'right' }}>
            <span className={styles.titleMain}>GPU VRAM</span>
            <span className={styles.titleSub}>NVIDIA</span>
          </div>
          <div className={styles.panelIconGpu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>
        </div>
        <div
          className={styles.vramGrid}
          style={{
            gridTemplateColumns: `repeat(${gridConfig.vramCols}, 1fr)`,
            gridTemplateRows: `repeat(${gridConfig.vramRows}, 1fr)`,
          }}
        >
          {vramCells.map(cell => (
            <div
              key={cell.id}
              className={`${styles.vramCell} ${styles[getVRAMCellClassName(cell.state)]}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
