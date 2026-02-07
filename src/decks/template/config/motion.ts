// Easing Curves
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.45, 0, 0.55, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  outCubic: [0.33, 1, 0.68, 1] as const,
  anticipate: [0.36, 0, 0.66, -0.56] as const,
  backOut: [0.34, 1.56, 0.64, 1] as const,
  circOut: [0, 0.55, 0.45, 1] as const,
} as const

// Spring Presets
export const spring = {
  responsive: { type: 'spring' as const, stiffness: 500, damping: 30, mass: 1 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 15, mass: 1 },
  gentle: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1 },
  snappy: { type: 'spring' as const, stiffness: 600, damping: 28, mass: 0.8 },
  slow: { type: 'spring' as const, stiffness: 150, damping: 20, mass: 1.2 },
} as const

// Duration Tokens
export const duration = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.3,
  smooth: 0.45,
  slow: 0.6,
  dramatic: 0.8,
  deliberate: 1.0,
} as const

// Stagger Delays
export const stagger = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
} as const

// Semantic Aliases
export const premiumEase = ease.outExpo
export const responsiveEase = ease.out
export const gentleEase = ease.outCubic

// Animation Variants
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

// Transition Presets
export const transitions = {
  instant: { duration: duration.instant, ease: ease.out },
  fast: { duration: duration.fast, ease: responsiveEase },
  normal: { duration: duration.normal, ease: ease.out },
  default: { duration: duration.normal, ease: premiumEase },
  smooth: { duration: duration.smooth, ease: premiumEase },
  slow: { duration: duration.slow, ease: premiumEase },
  dramatic: { duration: duration.dramatic, ease: premiumEase },
  spring: spring.responsive,
  playful: spring.bouncy,
} as const

// Reduced Motion
export const reducedMotion = {
  fadeOnly: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.instant },
  },
  subtle: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.fast, ease: ease.out },
  },
} as const

// Utilities
export function getMotionProps(
  full: typeof fadeInUp,
  prefersReduced: boolean
) {
  return prefersReduced ? reducedMotion.fadeOnly : full
}

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

export function getScaledDuration(
  baseDuration: number,
  tierScale: number = 1
): number {
  return baseDuration * tierScale
}
