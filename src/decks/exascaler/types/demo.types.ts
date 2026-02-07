/**
 * Centralized Type Definitions for EXAScaler Demo
 * Single source of truth for all interfaces and types
 */

// ============================================
// PARTICLE SYSTEM TYPES
// ============================================

export interface DataPacket {
  x: number
  y: number
  lane: number
  speed: number
  width: number
  height: number
  hue: number
  brightness: number
  offset: number
}

export interface GlassShard {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  width: number
  height: number
  alpha: number
  glowColor: string
}

// ============================================
// HARDWARE TYPES
// ============================================

export type RackScale = 1500 | 5000 | 10000

export interface HotspotConfig {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number }>
  color: string
  specs: string[]
}

export interface SpotlightPosition {
  x: number
  y: number
}

// ============================================
// STATE TYPES
// ============================================

export type HeroPhase = 'bottleneck' | 'parallel'

export type KVPhase = 'idle' | 'prefill' | 'transfer' | 'decode'

export type HAState = 'normal' | 'failing' | 'failed'

export type CompressionDataType = 'checkpoint' | 'training'

// ============================================
// HOT POOLS TYPES
// ============================================

export interface HotPoolFile {
  id: number
  age: number
}

export interface PoolFile {
  id: number
}

// ============================================
// OBSERVABILITY TYPES
// ============================================

export interface LatencyDataPoint {
  value: number
  isSpike: boolean
  spikeData?: {
    jobId: string
    uid: string
  }
}

// ============================================
// ANIMATION TYPES
// ============================================

export interface AnimationStep {
  delay: number
  action: () => void
}

export interface AnimationSequenceConfig {
  steps: AnimationStep[]
  onComplete?: () => void
  cleanup?: () => void
}
