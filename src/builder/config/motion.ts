/**
 * Motion Grammar — Animation Design Tokens
 * Single source of truth for all animation values
 */

// Easing Curves
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.45, 0, 0.55, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
} as const

// Spring Presets
export const spring = {
  responsive: { type: 'spring' as const, stiffness: 500, damping: 30, mass: 1 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 15, mass: 1 },
  gentle: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1 },
} as const

// Duration Tokens (seconds)
export const duration = {
  instant: 0.1,
  micro: 0.15,
  fast: 0.25,
  medium: 0.4,
  slow: 0.6,
} as const

// Stagger Delays (seconds)
export const stagger = {
  fast: 0.04,
  normal: 0.06,
  slow: 0.1,
} as const

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

// Transition Presets
export const transitions = {
  instant: { duration: duration.instant, ease: ease.out },
  default: { duration: duration.medium, ease: ease.outExpo },
  fast: { duration: duration.fast, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.outExpo },
  spring: spring.responsive,
} as const
