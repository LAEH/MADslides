/**
 * Motion Grammar - Premium Animation System
 * Single source of truth for all animation values
 *
 * Design Philosophy (The Curve Expert):
 * - Animation must feel RESPONSIVE first, pretty second
 * - No linear motion. Ever.
 * - Motion must preserve spatial continuity
 * - Small changes = fast and subtle
 * - Big transitions = slower with clear acceleration/deceleration
 */

// ============================================
// EASING CURVES - Cubic Bezier
// ============================================

export const ease = {
  // Responsive UI snap - fast exit, minimal tail
  out: [0.22, 1, 0.36, 1] as const,

  // Premium expo out - Apple-style deceleration
  outExpo: [0.16, 1, 0.3, 1] as const,

  // Smooth in-out for reversible animations
  inOut: [0.45, 0, 0.55, 1] as const,

  // Quart out - slightly bouncier feel
  outQuart: [0.25, 1, 0.5, 1] as const,

  // Soft landing - gentle deceleration
  outCubic: [0.33, 1, 0.68, 1] as const,

  // Anticipation - slight pull back before moving
  anticipate: [0.36, 0, 0.66, -0.56] as const,

  // Back out - slight overshoot then settle
  backOut: [0.34, 1.56, 0.64, 1] as const,

  // Circ out - sharp initial movement, soft landing
  circOut: [0, 0.55, 0.45, 1] as const,
} as const

// ============================================
// SPRING PRESETS - Physics-based motion
// ============================================

export const spring = {
  // Responsive - minimal overshoot, quick settle
  responsive: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
    mass: 1,
  },

  // Bouncy - playful delight with controlled overshoot
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 15,
    mass: 1,
  },

  // Gentle - smooth, no overshoot
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },

  // Snappy - quick response, slight overshoot
  snappy: {
    type: 'spring' as const,
    stiffness: 600,
    damping: 28,
    mass: 0.8,
  },

  // Slow - deliberate, weighty feel
  slow: {
    type: 'spring' as const,
    stiffness: 150,
    damping: 20,
    mass: 1.2,
  },
} as const

// ============================================
// DURATION TOKENS (aligned with CSS --duration-* variables)
// ============================================

export const duration = {
  instant: 0.1,     // 100ms - Micro-feedback: focus rings, toggles (CSS: --duration-instant)
  fast: 0.18,       // 180ms - Hover states, small reveals (CSS: --duration-fast)
  normal: 0.3,      // 300ms - Standard UI transitions (CSS: --duration-normal)
  smooth: 0.45,     // 450ms - Medium movements, card hovers (CSS: --duration-smooth)
  slow: 0.6,        // 600ms - Large reveals, hero entrances (CSS: --duration-slow)
  dramatic: 0.8,    // 800ms - Page transitions, major reveals (CSS: --duration-dramatic)
  deliberate: 1.0,  // 1000ms - Cinematic moments
} as const

// Legacy aliases for backwards compatibility
export const durationLegacy = {
  micro: duration.fast,
  medium: duration.normal,
  slower: duration.dramatic,
} as const

// ============================================
// STAGGER DELAYS (aligned with CSS --stagger-* variables)
// ============================================

export const stagger = {
  fast: 0.05,      // 50ms - Rapid cascade (CSS: --stagger-fast)
  normal: 0.08,    // 80ms - Standard list animation (CSS: --stagger-normal)
  slow: 0.12,      // 120ms - Deliberate reveal (CSS: --stagger-slow)
} as const

// ============================================
// INTENT-BASED PRESETS
// ============================================

// Semantic aliases
export const premiumEase = ease.outExpo
export const premiumEaseExpo = ease.outExpo
export const responsiveEase = ease.out
export const gentleEase = ease.outCubic

// Reusable animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const slideInRight = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 12 },
}

// ============================================
// TRANSITION PRESETS
// ============================================

export const transitions = {
  // Quick feedback for interactive elements (100ms)
  instant: { duration: duration.instant, ease: ease.out },

  // Fast hover states (180ms)
  fast: { duration: duration.fast, ease: responsiveEase },

  // Standard UI transition (300ms)
  normal: { duration: duration.normal, ease: ease.out },

  // Default - alias for normal
  default: { duration: duration.normal, ease: premiumEase },

  // Medium movements (450ms)
  smooth: { duration: duration.smooth, ease: premiumEase },

  // Deliberate, premium feel (600ms)
  slow: { duration: duration.slow, ease: premiumEaseExpo },

  // Page transitions (800ms)
  dramatic: { duration: duration.dramatic, ease: premiumEaseExpo },

  // Physics-based for drag/gesture
  spring: spring.responsive,

  // Bouncy for playful interactions
  playful: spring.bouncy,
} as const

// ============================================
// REDUCED MOTION ALTERNATIVES
// ============================================

export const reducedMotion = {
  // Instant state change, no animation
  fadeOnly: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.instant },
  },

  // Minimal, safe animation
  subtle: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.fast, ease: ease.out },
  },
} as const

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get animation props based on reduced motion preference
 */
export function getMotionProps(
  full: typeof fadeInUp,
  prefersReduced: boolean
) {
  return prefersReduced ? reducedMotion.fadeOnly : full
}

/**
 * Create staggered children animation
 */
export function createStaggerChildren(
  delayPerChild: number = stagger.normal,
  prefersReduced: boolean = false
) {
  return {
    animate: {
      transition: {
        staggerChildren: prefersReduced ? 0 : delayPerChild,
      },
    },
  }
}

/**
 * Get duration scaled by performance tier
 */
export function getScaledDuration(
  baseDuration: number,
  tierScale: number = 1
): number {
  return baseDuration * tierScale
}
