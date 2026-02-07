/**
 * Performance Tier System for 60fps+ Sustained
 *
 * Priority targets (in order):
 * 1. Recent high-end iPhone + Safari (primary)
 * 2. Safari on iOS/iPadOS
 * 3. Chrome on Android (mobile)
 * 4. Safari on macOS (desktop)
 * 5. Chrome on macOS/Windows (desktop)
 *
 * Tier A: Full effects (blur, 3D, complex animations)
 * Tier B: Reduced blur (8px), simpler animations
 * Tier C: No blur, opacity-only animations
 */

import { useState, useEffect, useMemo } from 'react'

export type PerformanceTier = 'A' | 'B' | 'C'

interface DeviceInfo {
  isSafari: boolean
  isChrome: boolean
  isFirefox: boolean
  isMobile: boolean
  isIOS: boolean
  isAndroid: boolean
  isMacOS: boolean
  isHighEndDevice: boolean
  prefersReducedMotion: boolean
  devicePixelRatio: number
  hardwareConcurrency: number
}

interface PerformanceConfig {
  tier: PerformanceTier
  backdropBlur: number // px
  enableParallax: boolean
  enable3D: boolean
  enableComplexAnimations: boolean
  animationDuration: number // multiplier
  staggerDelay: number // multiplier
}

// Detect device and browser capabilities
function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isSafari: false,
      isChrome: false,
      isFirefox: false,
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isMacOS: false,
      isHighEndDevice: true,
      prefersReducedMotion: false,
      devicePixelRatio: 1,
      hardwareConcurrency: 4,
    }
  }

  const ua = navigator.userAgent
  const vendor = navigator.vendor || ''

  // Browser detection
  const isSafari = /Safari/.test(ua) && /Apple Computer/.test(vendor) && !/Chrome/.test(ua)
  const isChrome = /Chrome/.test(ua) && /Google Inc/.test(vendor)
  const isFirefox = /Firefox/.test(ua)

  // Platform detection
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isAndroid = /Android/.test(ua)
  const isMacOS = /Mac/.test(navigator.platform) && !isIOS
  const isMobile = isIOS || isAndroid || /Mobile/.test(ua)

  // Hardware detection
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  const devicePixelRatio = window.devicePixelRatio || 1

  // High-end device heuristics
  // iPhone 12+ typically has 6 cores, high DPR, and Safari
  // High-end Android typically has 8 cores
  const isHighEndDevice =
    (isIOS && hardwareConcurrency >= 6) || // Recent iPhones
    (isAndroid && hardwareConcurrency >= 8) || // High-end Android
    (!isMobile && hardwareConcurrency >= 8) // Desktop with 8+ cores

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return {
    isSafari,
    isChrome,
    isFirefox,
    isMobile,
    isIOS,
    isAndroid,
    isMacOS,
    isHighEndDevice,
    prefersReducedMotion,
    devicePixelRatio,
    hardwareConcurrency,
  }
}

// Determine performance tier based on device capabilities
function determineTier(info: DeviceInfo): PerformanceTier {
  // Reduced motion always gets Tier C
  if (info.prefersReducedMotion) return 'C'

  // Priority 1: Recent high-end iPhone + Safari → Tier A
  if (info.isIOS && info.isSafari && info.isHighEndDevice) return 'A'

  // Priority 2: Safari on iOS/iPadOS
  if (info.isIOS && info.isSafari) return 'A' // Safari handles backdrop-filter well

  // Priority 3: Chrome on Android (mobile) - backdrop-filter can be expensive
  if (info.isAndroid && info.isChrome) {
    return info.isHighEndDevice ? 'B' : 'C'
  }

  // Priority 4: Safari on macOS → Tier A (excellent compositor)
  if (info.isMacOS && info.isSafari) return 'A'

  // Priority 5: Chrome on macOS/Windows
  if (info.isChrome && !info.isMobile) {
    return info.isHighEndDevice ? 'A' : 'B'
  }

  // Firefox - tends to have issues with backdrop-filter
  if (info.isFirefox) return 'B'

  // Default based on hardware
  if (info.isHighEndDevice) return 'A'
  if (info.hardwareConcurrency >= 4) return 'B'
  return 'C'
}

// Get configuration for a given tier
function getTierConfig(tier: PerformanceTier, info: DeviceInfo): PerformanceConfig {
  const configs: Record<PerformanceTier, PerformanceConfig> = {
    A: {
      tier: 'A',
      backdropBlur: 20,
      enableParallax: true,
      enable3D: true,
      enableComplexAnimations: true,
      animationDuration: 1,
      staggerDelay: 1,
    },
    B: {
      tier: 'B',
      backdropBlur: 8,
      enableParallax: false,
      enable3D: false,
      enableComplexAnimations: true,
      animationDuration: 0.8,
      staggerDelay: 0.6,
    },
    C: {
      tier: 'C',
      backdropBlur: 0,
      enableParallax: false,
      enable3D: false,
      enableComplexAnimations: false,
      animationDuration: 0.5,
      staggerDelay: 0,
    },
  }

  return configs[tier]
}

// Main hook
export function usePerformanceTier(): PerformanceConfig & { deviceInfo: DeviceInfo } {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => getDeviceInfo())

  useEffect(() => {
    // Re-evaluate on mount (SSR safety)
    setDeviceInfo(getDeviceInfo())

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setDeviceInfo(getDeviceInfo())
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const tier = useMemo(() => determineTier(deviceInfo), [deviceInfo])
  const config = useMemo(() => getTierConfig(tier, deviceInfo), [tier, deviceInfo])

  return { ...config, deviceInfo }
}

// CSS custom properties generator for use in style tags
export function getPerformanceCSSVars(config: PerformanceConfig): string {
  return `
    --perf-blur: ${config.backdropBlur}px;
    --perf-animation-scale: ${config.animationDuration};
    --perf-stagger-scale: ${config.staggerDelay};
    --perf-parallax: ${config.enableParallax ? 1 : 0};
    --perf-3d: ${config.enable3D ? 1 : 0};
  `
}

// Utility to get tier-specific animation props for Framer Motion
export function getTierAnimationProps(config: PerformanceConfig) {
  if (config.tier === 'C') {
    // Minimal animations - opacity only
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    }
  }

  if (config.tier === 'B') {
    // Reduced animations - smaller movements
    return {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
      transition: {
        duration: 0.35 * config.animationDuration,
        ease: [0.22, 1, 0.36, 1]
      },
    }
  }

  // Tier A - full animations
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    },
  }
}

// Default export for convenience
export default usePerformanceTier
