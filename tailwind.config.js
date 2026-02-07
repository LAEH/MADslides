/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Semantic surface/text colors via CSS variables */
        'bg': 'var(--color-bg)',
        'surface': 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'sunken': 'var(--color-surface-sunken)',
        'primary': 'var(--color-text)',
        'secondary': 'var(--color-text-secondary)',
        'tertiary': 'var(--color-text-tertiary)',
        'inverse': 'var(--color-text-inverse)',
        'active': 'var(--color-active-bg)',
        'active-text': 'var(--color-active-text)',
        'hover': 'var(--color-hover-bg)',
        'border-default': 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',

        /* Apple HIG Accent Colors (theme-aware via CSS vars) */
        'accent': 'var(--color-accent)',
        'accent-blue': 'var(--accent-blue)',
        'accent-red': 'var(--accent-red)',
        'accent-green': 'var(--accent-green)',
        'accent-orange': 'var(--accent-orange)',
        'accent-yellow': 'var(--accent-yellow)',
        'accent-purple': 'var(--accent-purple)',
        'accent-pink': 'var(--accent-pink)',
        'accent-indigo': 'var(--accent-indigo)',
        'accent-teal': 'var(--accent-teal)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-mint': 'var(--accent-mint)',
        'accent-brown': 'var(--accent-brown)',

        /* Semantic intent */
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'danger': 'var(--color-danger)',
        'info': 'var(--color-info)',

        /* DDN brand colors */
        'ddn-red': '#ED2738',
        'ddn-red-hover': '#CB343B',
        'ddn-red-light': '#FE3546',
        'ddn-black': '#201E1E',
        'ddn-green': '#00C280',
        'ddn-orange': '#FF7600',
        'ddn-blue': '#1A81AF',
        'ddn-blue-light': '#70C5E8',
        'ddn-deep-blue': '#374967',
        'neutral': {
          0: '#FFFFFF',
          25: '#F5F6F8',
          50: '#F8F7F7',
          100: '#F0EEEE',
          200: '#DDDADA',
          300: '#B7BABA',
          400: '#9C9A94',
          500: '#807778',
          600: '#686162',
          700: '#494343',
          800: '#3F3B3C',
          900: '#201E1E',
          1000: '#000000',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Geist Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': 'var(--text-xs)',      /* 10px */
        'xs': 'var(--text-sm)',       /* 11px */
        'sm': 'var(--text-base)',     /* 13px */
        'base': 'var(--text-md)',     /* 14px */
        'lg': 'var(--text-lg)',       /* 18px */
        'xl': 'var(--text-xl)',       /* 24px */
        '2xl': 'var(--text-2xl)',     /* 30px */
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '28px',
      },
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'glow-red': 'var(--shadow-glow-red)',
        'glow-green': 'var(--shadow-glow-green)',
      },
    },
  },
  plugins: [],
}
