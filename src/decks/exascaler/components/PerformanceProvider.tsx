/**
 * Performance Provider Component
 *
 * Sets the performance tier attribute on document body and provides
 * performance configuration context to child components.
 *
 * Priority targets (in order):
 * 1. Recent high-end iPhone + Safari (primary)
 * 2. Safari on iOS/iPadOS
 * 3. Chrome on Android (mobile)
 * 4. Safari on macOS (desktop)
 * 5. Chrome on macOS/Windows (desktop)
 */

import { useEffect, createContext, useContext, ReactNode } from 'react'
import usePerformanceTier, { PerformanceTier } from '../hooks/usePerformanceTier'

interface PerformanceConfig {
  tier: PerformanceTier
  backdropBlur: number
  enableParallax: boolean
  enable3D: boolean
  enableComplexAnimations: boolean
  animationDuration: number
  staggerDelay: number
}

interface PerformanceContextValue extends PerformanceConfig {
  isMobile: boolean
  isSafari: boolean
  prefersReducedMotion: boolean
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null)

export function usePerformance(): PerformanceContextValue {
  const context = useContext(PerformanceContext)
  if (!context) {
    // Return default values if used outside provider
    return {
      tier: 'A',
      backdropBlur: 20,
      enableParallax: true,
      enable3D: true,
      enableComplexAnimations: true,
      animationDuration: 1,
      staggerDelay: 1,
      isMobile: false,
      isSafari: false,
      prefersReducedMotion: false,
    }
  }
  return context
}

interface PerformanceProviderProps {
  children: ReactNode
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const config = usePerformanceTier()

  // Set data attribute on body for CSS tier selection
  useEffect(() => {
    document.body.setAttribute('data-perf-tier', config.tier)

    // Set CSS custom properties directly on body
    document.body.style.setProperty('--perf-blur', `${config.backdropBlur}px`)
    document.body.style.setProperty('--perf-animation-scale', String(config.animationDuration))
    document.body.style.setProperty('--perf-stagger-scale', String(config.staggerDelay))
    document.body.style.setProperty('--perf-parallax', config.enableParallax ? '1' : '0')
    document.body.style.setProperty('--perf-3d', config.enable3D ? '1' : '0')

    // Log tier selection in development
    if (import.meta.env.DEV) {
      console.log(`[Performance] Tier ${config.tier} selected`, {
        device: config.deviceInfo.isMobile ? 'mobile' : 'desktop',
        browser: config.deviceInfo.isSafari ? 'Safari' : config.deviceInfo.isChrome ? 'Chrome' : 'Other',
        platform: config.deviceInfo.isIOS ? 'iOS' : config.deviceInfo.isAndroid ? 'Android' : config.deviceInfo.isMacOS ? 'macOS' : 'Other',
        cores: config.deviceInfo.hardwareConcurrency,
        reducedMotion: config.deviceInfo.prefersReducedMotion,
      })
    }

    return () => {
      document.body.removeAttribute('data-perf-tier')
    }
  }, [config])

  const contextValue: PerformanceContextValue = {
    tier: config.tier,
    backdropBlur: config.backdropBlur,
    enableParallax: config.enableParallax,
    enable3D: config.enable3D,
    enableComplexAnimations: config.enableComplexAnimations,
    animationDuration: config.animationDuration,
    staggerDelay: config.staggerDelay,
    isMobile: config.deviceInfo.isMobile,
    isSafari: config.deviceInfo.isSafari,
    prefersReducedMotion: config.deviceInfo.prefersReducedMotion,
  }

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  )
}

export default PerformanceProvider
