import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a graceful fallback UI.
 *
 * Uses DDN design tokens for consistent styling.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error for debugging in development
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Caught error:', error)
      console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack)
    }
    // In production, this would send to an error tracking service (e.g., Sentry)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '24px',
            textAlign: 'center',
          }}
          role="alert"
          aria-live="assertive"
        >
          <div>
            {/* Error Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 24px',
                background: 'var(--color-danger-subtle, rgba(237, 39, 56, 0.1))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-danger, #ED2738)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            {/* Error Message */}
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--text-primary, #201E1E)',
                marginBottom: '8px',
                fontFamily: 'var(--font-sans, -apple-system, sans-serif)',
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-tertiary, #686162)',
                marginBottom: '24px',
                maxWidth: '400px',
                lineHeight: '1.5',
              }}
            >
              We encountered an error loading this page. Please try refreshing or go back.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleRetry}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary, #201E1E)',
                  background: 'var(--surface-secondary, #F0EEEE)',
                  border: '1px solid var(--border-default, rgba(0, 0, 0, 0.1))',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-sans, -apple-system, sans-serif)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--surface-tertiary, #DDDADA)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--surface-secondary, #F0EEEE)'
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  background: 'var(--color-primary, #ED2738)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-sans, -apple-system, sans-serif)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--color-primary-hover, #CB343B)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--color-primary, #ED2738)'
                }}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
