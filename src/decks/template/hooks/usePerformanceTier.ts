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
  backdropBlur: number
  enableParallax: boolean
  enable3D: boolean
  enableComplexAnimations: boolean
  animationDuration: number
  staggerDelay: number
}

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

  const isSafari = /Safari/.test(ua) && /Apple Computer/.test(vendor) && !/Chrome/.test(ua)
  const isChrome = /Chrome/.test(ua) && /Google Inc/.test(vendor)
  const isFirefox = /Firefox/.test(ua)

  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isAndroid = /Android/.test(ua)
  const isMacOS = /Mac/.test(navigator.platform) && !isIOS
  const isMobile = isIOS || isAndroid || /Mobile/.test(ua)

  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  const devicePixelRatio = window.devicePixelRatio || 1

  const isHighEndDevice =
    (isIOS && hardwareConcurrency >= 6) ||
    (isAndroid && hardwareConcurrency >= 8) ||
    (!isMobile && hardwareConcurrency >= 8)

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

function determineTier(info: DeviceInfo): PerformanceTier {
  if (info.prefersReducedMotion) return 'C'
  if (info.isIOS && info.isSafari && info.isHighEndDevice) return 'A'
  if (info.isIOS && info.isSafari) return 'A'
  if (info.isAndroid && info.isChrome) {
    return info.isHighEndDevice ? 'B' : 'C'
  }
  if (info.isMacOS && info.isSafari) return 'A'
  if (info.isChrome && !info.isMobile) {
    return info.isHighEndDevice ? 'A' : 'B'
  }
  if (info.isFirefox) return 'B'
  if (info.isHighEndDevice) return 'A'
  if (info.hardwareConcurrency >= 4) return 'B'
  return 'C'
}

function getTierConfig(tier: PerformanceTier): PerformanceConfig {
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

export function usePerformanceTier(): PerformanceConfig & { deviceInfo: DeviceInfo } {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => getDeviceInfo())

  useEffect(() => {
    setDeviceInfo(getDeviceInfo())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setDeviceInfo(getDeviceInfo())
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const tier = useMemo(() => determineTier(deviceInfo), [deviceInfo])
  const config = useMemo(() => getTierConfig(tier), [tier])

  return { ...config, deviceInfo }
}

export function getPerformanceCSSVars(config: PerformanceConfig): string {
  return `
    --perf-blur: ${config.backdropBlur}px;
    --perf-animation-scale: ${config.animationDuration};
    --perf-stagger-scale: ${config.staggerDelay};
    --perf-parallax: ${config.enableParallax ? 1 : 0};
    --perf-3d: ${config.enable3D ? 1 : 0};
  `
}

export function getTierAnimationProps(config: PerformanceConfig) {
  if (config.tier === 'C') {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    }
  }

  if (config.tier === 'B') {
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

export default usePerformanceTier
