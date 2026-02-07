import { useState, useEffect, ReactNode } from 'react'

const MIN_WIDTH = 1024
const MIN_HEIGHT = 700

interface ScreenSizeGateProps {
  children: ReactNode
}

export default function ScreenSizeGate({ children }: ScreenSizeGateProps) {
  const [isValidSize, setIsValidSize] = useState(true)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setDimensions({ width, height })
      setIsValidSize(width >= MIN_WIDTH && height >= MIN_HEIGHT)
    }

    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  if (!isValidSize) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.icon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
          </div>
          <h1 style={styles.title}>Larger Screen Required</h1>
          <p style={styles.message}>
            This presentation is optimized for desktop viewing and requires a minimum screen size of {MIN_WIDTH}x{MIN_HEIGHT} pixels.
          </p>
          <div style={styles.currentSize}>
            Current: {dimensions.width} x {dimensions.height}
          </div>
          <p style={styles.hint}>
            Please view on a laptop, desktop, or expand your browser window.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    padding: '24px',
    zIndex: 99999,
  },
  content: {
    textAlign: 'center',
    maxWidth: '400px',
  },
  icon: {
    color: '#ED2738',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 16px 0',
  },
  message: {
    fontSize: '16px',
    color: '#a0a0a0',
    lineHeight: 1.6,
    margin: '0 0 20px 0',
  },
  currentSize: {
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(237, 39, 56, 0.15)',
    border: '1px solid rgba(237, 39, 56, 0.3)',
    borderRadius: '8px',
    color: '#ED2738',
    fontSize: '14px',
    fontFamily: 'monospace',
    marginBottom: '20px',
  },
  hint: {
    fontSize: '14px',
    color: '#666666',
    margin: 0,
  },
}
