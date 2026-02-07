import { useState, useEffect, ReactNode, FormEvent } from 'react'

const CORRECT_PASSWORD = 'ddnai'
const STORAGE_KEY = 'ddn_auth_verified'

interface PasswordGateProps {
  children: ReactNode
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated this session
    const verified = sessionStorage.getItem(STORAGE_KEY)
    if (verified === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader} />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logoWrapper}>
            <img
              src="/ddn-logo.png"
              alt="DDN"
              style={styles.logo}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
          <h1 style={styles.title}>DDN Strategic Roadmap</h1>
          <p style={styles.subtitle}>NDA Protected Content</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                placeholder="Enter access code"
                style={{
                  ...styles.input,
                  ...(error ? styles.inputError : {}),
                }}
                autoFocus
              />
              {error && (
                <p style={styles.errorText}>Invalid access code</p>
              )}
            </div>
            <button type="submit" style={styles.button}>
              Access Presentation
            </button>
          </form>

          <p style={styles.footer}>
            Contact your DDN representative for access credentials
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
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
    padding: '24px',
    zIndex: 99998,
  },
  loader: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    borderTopColor: '#ED2738',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  card: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '48px 40px',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)',
  },
  logoWrapper: {
    marginBottom: '24px',
  },
  logo: {
    height: '48px',
    width: 'auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 8px 0',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '14px',
    color: '#ED2738',
    fontWeight: 600,
    margin: '0 0 32px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: '2px solid #e5e5e5',
    borderRadius: '12px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: '#ED2738',
    background: 'rgba(237, 39, 56, 0.03)',
  },
  errorText: {
    position: 'absolute',
    left: 0,
    bottom: '-24px',
    fontSize: '13px',
    color: '#ED2738',
    margin: 0,
  },
  button: {
    width: '100%',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    background: 'linear-gradient(135deg, #ED2738 0%, #c41e2e 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '8px',
  },
  footer: {
    fontSize: '13px',
    color: '#888888',
    margin: '32px 0 0 0',
  },
}
