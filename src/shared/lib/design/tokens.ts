/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DDN SLIDES - UNIFIED DESIGN TOKENS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Single source of truth for all design tokens across all decks.
 * Based on DDN HyperPod design system.
 *
 * Usage:
 *   import { COLORS, TYPOGRAPHY, ANIMATION, getTheme } from '@/shared/lib/design/tokens';
 */

// ═══════════════════════════════════════════════════════════════════════════
// ACCENT PALETTE (Apple HIG-inspired, single source for derived colors)
// ═══════════════════════════════════════════════════════════════════════════

export const ACCENT = {
  red:    { light: '#FF383C', dark: '#FF4245' },
  orange: { light: '#FF8D28', dark: '#FF9230' },
  yellow: { light: '#FFCC00', dark: '#FFD600' },
  green:  { light: '#34C759', dark: '#30D158' },
  mint:   { light: '#00C8B3', dark: '#00DAC3' },
  cyan:   { light: '#00C0E8', dark: '#3CD3FE' },
  blue:   { light: '#0088FF', dark: '#0091FF' },
  indigo: { light: '#6155F5', dark: '#6D7CFF' },
  purple: { light: '#CB30E0', dark: '#DB34F2' },
  pink:   { light: '#FF2D55', dark: '#FF375F' },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// BRAND COLORS (Single source of truth)
// ═══════════════════════════════════════════════════════════════════════════

export const COLORS = {
  // DDN Brand
  ddn: {
    red: '#ED2738',      // Primary DDN red
    redLight: '#FE3546', // Lighter variant
    orange: '#FF4500',
  },

  // NVIDIA Brand
  nvidia: {
    green: '#76B900',
    greenLight: '#8BC34A',
  },

  // Partner Brands
  partner: {
    supermicro: '#0066B3',
    aws: '#FF9900',
  },

  // Project Colors (for slide deck identification)
  project: {
    exascaler: '#00C280',  // EXAScaler green
    strategy: '#70C5E8',   // Strategy blue
    tomer: '#FF7600',      // Tomer orange
    template: '#ED2738',   // Template red (DDN red)
  },

  // Status Colors (derived from ACCENT — light variants for static usage)
  status: {
    success: ACCENT.green.light,
    warning: ACCENT.orange.light,
    error: ACCENT.red.light,
    info: ACCENT.blue.light,
    live: ACCENT.green.light,
  },

  // Sentiment (derived from ACCENT)
  sentiment: {
    bullish: ACCENT.green.light,
    bearish: ACCENT.red.light,
    neutral: ACCENT.yellow.light,
  },

  // Chart palette
  chart: [
    '#ED2738',              // DDN red
    '#76B900',              // NVIDIA green
    ACCENT.blue.light,      // Blue
    ACCENT.purple.light,    // Purple
    ACCENT.orange.light,    // Orange
    ACCENT.cyan.light,      // Cyan
    ACCENT.yellow.light,    // Yellow
    ACCENT.mint.light,      // Mint
    ACCENT.pink.light,      // Pink
    ACCENT.indigo.light,    // Indigo
  ],
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TINTS (bg + text pairs for sentiment & brand badges/cards)
// ═══════════════════════════════════════════════════════════════════════════

export const TINTS = {
  sentiment: {
    bullish: { bg: `rgba(52, 199, 89, 0.1)`, text: ACCENT.green.light, bgDark: `rgba(48, 209, 88, 0.12)`, textDark: ACCENT.green.dark },
    bearish: { bg: `rgba(255, 56, 60, 0.1)`, text: ACCENT.red.light, bgDark: `rgba(255, 66, 69, 0.12)`, textDark: ACCENT.red.dark },
    neutral: { bg: `rgba(255, 204, 0, 0.1)`, text: ACCENT.yellow.light, bgDark: `rgba(255, 214, 0, 0.12)`, textDark: ACCENT.yellow.dark },
  },
  brand: {
    ddn: { bg: 'rgba(237, 39, 56, 0.08)', text: '#ED2738', bgDark: 'rgba(237, 39, 56, 0.1)', textDark: '#FE3546' },
    nvidia: { bg: 'rgba(118, 185, 0, 0.08)', text: '#76B900', bgDark: 'rgba(118, 185, 0, 0.1)', textDark: '#8BC34A' },
  },
  project: {
    exascaler: { bg: 'rgba(0, 194, 128, 0.1)', text: '#00C280', bgDark: 'rgba(0, 194, 128, 0.12)', textDark: '#00E094' },
    strategy: { bg: 'rgba(112, 197, 232, 0.1)', text: '#1A81AF', bgDark: 'rgba(112, 197, 232, 0.12)', textDark: '#70C5E8' },
    tomer: { bg: 'rgba(255, 118, 0, 0.1)', text: '#FF7600', bgDark: 'rgba(255, 118, 0, 0.12)', textDark: '#FF8C28' },
    template: { bg: 'rgba(237, 39, 56, 0.1)', text: '#ED2738', bgDark: 'rgba(237, 39, 56, 0.12)', textDark: '#FE3546' },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// DARK THEME
// ═══════════════════════════════════════════════════════════════════════════

export const DARK = {
  // Backgrounds (layered from darkest to lightest)
  bg: {
    primary: '#000000',     // Pure black
    secondary: '#0a0a0a',   // Obsidian
    tertiary: '#111111',    // Elevated
    card: '#141414',        // Card surfaces
    cardHover: '#1a1a1a',   // Card hover
    elevated: 'rgba(255,255,255,0.03)',
    elevatedHover: 'rgba(255,255,255,0.06)',
    input: 'rgba(255,255,255,0.05)',
    selected: 'rgba(59, 130, 246, 0.12)',
    track: 'rgba(255,255,255,0.06)',
    tooltip: 'rgba(30,30,30,0.95)',
  },

  // Text
  text: {
    primary: 'rgba(255,255,255,0.95)',
    secondary: 'rgba(255,255,255,0.7)',
    tertiary: 'rgba(255,255,255,0.5)',
    muted: 'rgba(255,255,255,0.3)',
    subtle: 'rgba(255,255,255,0.15)',
  },

  // Borders
  border: {
    light: 'rgba(255,255,255,0.08)',
    medium: 'rgba(255,255,255,0.12)',
    strong: 'rgba(255,255,255,0.2)',
  },

  // Glass morphism
  glass: {
    bg: 'rgba(28, 28, 30, 0.72)',
    border: 'rgba(255,255,255,0.1)',
    blur: 'blur(40px) saturate(180%)',
  },

  // Shadows
  shadow: {
    sm: '0 2px 8px rgba(0,0,0,0.3)',
    md: '0 4px 24px rgba(0,0,0,0.4)',
    lg: '0 8px 40px rgba(0,0,0,0.5)',
    glow: (color: string) => `0 0 40px ${color}40`,
  },

  // Overlays
  overlay: {
    light: 'rgba(0,0,0,0.8)',
    strong: 'rgba(0,0,0,0.95)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// LIGHT THEME
// ═══════════════════════════════════════════════════════════════════════════

export const LIGHT = {
  // Backgrounds
  bg: {
    primary: '#ffffff',
    secondary: '#f8f8f8',
    tertiary: '#f5f5f7',
    card: '#ffffff',
    cardHover: '#fafafa',
    elevated: 'rgba(0,0,0,0.02)',
    elevatedHover: 'rgba(0,0,0,0.04)',
    input: '#f3f4f6',
    selected: '#eff6ff',
    track: 'rgba(0,0,0,0.06)',
    tooltip: 'rgba(255,255,255,0.95)',
  },

  // Text
  text: {
    primary: '#1d1d1f',
    secondary: 'rgba(0,0,0,0.6)',
    tertiary: 'rgba(0,0,0,0.45)',
    muted: 'rgba(0,0,0,0.3)',
    subtle: 'rgba(0,0,0,0.15)',
  },

  // Borders
  border: {
    light: 'rgba(0,0,0,0.08)',
    medium: 'rgba(0,0,0,0.12)',
    strong: 'rgba(0,0,0,0.2)',
  },

  // Glass morphism
  glass: {
    bg: 'rgba(255,255,255,0.72)',
    border: 'rgba(255,255,255,0.5)',
    blur: 'blur(20px)',
  },

  // Shadows
  shadow: {
    sm: '0 2px 8px rgba(0,0,0,0.06)',
    md: '0 4px 24px rgba(0,0,0,0.08)',
    lg: '0 8px 40px rgba(0,0,0,0.12)',
    glow: (color: string) => `0 0 40px ${color}20`,
  },

  // Overlays
  overlay: {
    light: 'rgba(255,255,255,0.8)',
    strong: 'rgba(255,255,255,0.95)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════

export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    sans: "'articulat-cf', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Geist Mono', 'SF Mono', 'Consolas', monospace",
  },

  // Display - Hero headlines
  display: {
    lg: 'text-6xl font-bold tracking-tight',
    md: 'text-5xl font-bold tracking-tight',
    sm: 'text-4xl font-bold tracking-tight',
  },

  // Headings
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-medium',
  },

  // Body
  body: {
    lg: 'text-lg',
    md: 'text-base',
    sm: 'text-sm',
  },

  // Labels & UI
  label: {
    lg: 'text-sm font-semibold uppercase tracking-wider',
    md: 'text-xs font-semibold uppercase tracking-wider',
    sm: 'text-2xs font-semibold uppercase tracking-wider',
  },

  // Metrics (monospace numbers)
  metric: {
    lg: 'text-4xl font-bold font-mono tabular-nums',
    md: 'text-2xl font-bold font-mono tabular-nums',
    sm: 'text-lg font-bold font-mono tabular-nums',
    xs: 'text-sm font-bold font-mono tabular-nums',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION TOKENS
// ═══════════════════════════════════════════════════════════════════════════

export const ANIMATION = {
  // Easing curves (Apple-inspired)
  ease: {
    snap: [0.2, 0, 0, 1] as const,
    arrive: [0.32, 0.72, 0, 1] as const,
    out: [0, 0, 0.2, 1] as const,
    inOut: [0.4, 0, 0.2, 1] as const,
    springy: [0.175, 0.885, 0.32, 1.275] as const,
  },

  // Durations (in seconds for framer-motion)
  duration: {
    instant: 0.1,
    fast: 0.2,
    medium: 0.4,
    slow: 0.6,
    slower: 0.8,
  },

  // Spring configs (for framer-motion)
  spring: {
    snappy: { type: 'spring' as const, stiffness: 400, damping: 30 },
    bouncy: { type: 'spring' as const, stiffness: 300, damping: 20 },
    gentle: { type: 'spring' as const, stiffness: 120, damping: 20 },
    slow: { type: 'spring' as const, stiffness: 100, damping: 25 },
  },

  // Tween presets
  tween: {
    snap: { type: 'tween' as const, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
    arrive: { type: 'tween' as const, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    slow: { type: 'tween' as const, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },

  // Pulse animation
  pulse: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SPACING & LAYOUT
// ═══════════════════════════════════════════════════════════════════════════

export const SPACING = {
  // Slide dimensions
  slide: {
    width: 1920,
    height: 1080,
    aspectRatio: '16/9',
  },

  // Padding
  page: {
    x: 32,    // px-8
    y: 24,    // py-6
  },

  // Border radius
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export type ThemeMode = 'dark' | 'light';

/**
 * Get theme object based on mode
 */
export function getTheme(mode: ThemeMode) {
  return mode === 'dark' ? DARK : LIGHT;
}

/**
 * Create color with alpha
 */
export function alpha(color: string, opacity: number): string {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

/**
 * Create gradient background for accent callouts
 */
export function accentGradient(color: string, direction: 'left' | 'right' = 'right'): string {
  return `linear-gradient(to ${direction}, ${alpha(color, 0.2)}, transparent)`;
}

/**
 * Create accent border style
 */
export function accentBorder(color: string, opacity: number = 0.3): string {
  return `1px solid ${alpha(color, opacity)}`;
}

/**
 * Create glow box shadow
 */
export function glow(color: string, size: 'sm' | 'md' | 'lg' = 'md'): string {
  const sizes = { sm: 20, md: 40, lg: 80 };
  return `0 0 ${sizes[size]}px ${alpha(color, 0.4)}`;
}

/**
 * Create a tint pair (bg + text) from any color
 */
export function tint(color: string, bgOpacity: number = 0.1): { bg: string; text: string; border: string } {
  return {
    bg: alpha(color, bgOpacity),
    text: color,
    border: alpha(color, bgOpacity * 3),
  };
}

/**
 * Create full branded card style object
 */
export function brandCard(brandColor: string, isDark: boolean = true): {
  background: string;
  border: string;
  borderColor: string;
  hoverBackground: string;
} {
  const bgOp = isDark ? 0.08 : 0.04;
  const borderOp = isDark ? 0.15 : 0.1;
  const hoverOp = isDark ? 0.12 : 0.06;
  return {
    background: alpha(brandColor, bgOp),
    border: `1px solid ${alpha(brandColor, borderOp)}`,
    borderColor: alpha(brandColor, borderOp),
    hoverBackground: alpha(brandColor, hoverOp),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// CSS VARIABLES (for design-tokens.css integration)
// ═══════════════════════════════════════════════════════════════════════════

export const CSS_VARS = {
  dark: {
    // Backgrounds
    '--bg-primary': DARK.bg.primary,
    '--bg-secondary': DARK.bg.secondary,
    '--bg-tertiary': DARK.bg.tertiary,
    '--bg-card': DARK.bg.card,
    '--bg-card-hover': DARK.bg.cardHover,
    '--bg-elevated': DARK.bg.elevated,
    '--bg-input': DARK.bg.input,

    // Text
    '--text-primary': DARK.text.primary,
    '--text-secondary': DARK.text.secondary,
    '--text-tertiary': DARK.text.tertiary,
    '--text-muted': DARK.text.muted,

    // Borders
    '--border-light': DARK.border.light,
    '--border-medium': DARK.border.medium,
    '--border-strong': DARK.border.strong,

    // Glass
    '--glass-bg': DARK.glass.bg,
    '--glass-border': DARK.glass.border,

    // Shadows
    '--shadow-sm': DARK.shadow.sm,
    '--shadow-md': DARK.shadow.md,
    '--shadow-lg': DARK.shadow.lg,

    // Overlays
    '--overlay-light': DARK.overlay.light,
    '--overlay-strong': DARK.overlay.strong,
  },
  light: {
    // Backgrounds
    '--bg-primary': LIGHT.bg.primary,
    '--bg-secondary': LIGHT.bg.secondary,
    '--bg-tertiary': LIGHT.bg.tertiary,
    '--bg-card': LIGHT.bg.card,
    '--bg-card-hover': LIGHT.bg.cardHover,
    '--bg-elevated': LIGHT.bg.elevated,
    '--bg-input': LIGHT.bg.input,

    // Text
    '--text-primary': LIGHT.text.primary,
    '--text-secondary': LIGHT.text.secondary,
    '--text-tertiary': LIGHT.text.tertiary,
    '--text-muted': LIGHT.text.muted,

    // Borders
    '--border-light': LIGHT.border.light,
    '--border-medium': LIGHT.border.medium,
    '--border-strong': LIGHT.border.strong,

    // Glass
    '--glass-bg': LIGHT.glass.bg,
    '--glass-border': LIGHT.glass.border,

    // Shadows
    '--shadow-sm': LIGHT.shadow.sm,
    '--shadow-md': LIGHT.shadow.md,
    '--shadow-lg': LIGHT.shadow.lg,

    // Overlays
    '--overlay-light': LIGHT.overlay.light,
    '--overlay-strong': LIGHT.overlay.strong,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SCALES (for Tailwind integration)
// ═══════════════════════════════════════════════════════════════════════════

export const SCALES = {
  // Border radius scale
  radius: {
    none: '0px',
    sm: '4px',
    DEFAULT: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
  },

  // Font size scale (in rem)
  fontSize: {
    '2xs': ['0.625rem', { lineHeight: '0.875rem' }],   // 10px
    xs: ['0.75rem', { lineHeight: '1rem' }],           // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],       // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],          // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],       // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],        // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],         // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],    // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],      // 36px
    '5xl': ['3rem', { lineHeight: '1' }],              // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],           // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],            // 72px
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TAILWIND CONFIG EXPORT (for tailwind.config.js)
// ═══════════════════════════════════════════════════════════════════════════

export const TAILWIND_THEME = {
  colors: {
    // Entity/Brand colors (semantic naming)
    entity: {
      ddn: COLORS.ddn.red,
      'ddn-dark': COLORS.ddn.redLight,
      nvidia: COLORS.nvidia.green,
      'nvidia-light': COLORS.nvidia.greenLight,
      supermicro: COLORS.partner.supermicro,
    },

    // Project colors
    project: {
      exascaler: COLORS.project.exascaler,
      strategy: COLORS.project.strategy,
      tomer: COLORS.project.tomer,
      template: COLORS.project.template,
    },

    // Status colors
    status: {
      success: 'var(--status-success)',
      warning: 'var(--status-warning)',
      error: 'var(--status-error)',
      info: 'var(--status-info)',
      live: 'var(--status-live)',
    },

    // Theme-aware surface colors
    surface: {
      primary: 'var(--bg-primary)',
      secondary: 'var(--bg-secondary)',
      tertiary: 'var(--bg-tertiary)',
      card: 'var(--bg-card)',
      'card-hover': 'var(--bg-card-hover)',
      elevated: 'var(--bg-elevated)',
      input: 'var(--bg-input)',
    },

    // Theme-aware text colors
    content: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      tertiary: 'var(--text-tertiary)',
      muted: 'var(--text-muted)',
    },

    // Theme-aware border colors
    edge: {
      light: 'var(--border-light)',
      medium: 'var(--border-medium)',
      strong: 'var(--border-strong)',
    },
  },

  borderRadius: SCALES.radius,

  fontFamily: {
    sans: ['articulat-cf', 'sans-serif'],
    mono: ['Geist Mono', 'monospace'],
  },

  boxShadow: {
    'theme-sm': 'var(--shadow-sm)',
    'theme-md': 'var(--shadow-md)',
    'theme-lg': 'var(--shadow-lg)',
  },
} as const;
