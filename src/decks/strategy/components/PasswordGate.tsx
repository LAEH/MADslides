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
  const [focused, setFocused] = useState(false)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const verified = sessionStorage.getItem(STORAGE_KEY)
    if (verified === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 400)
    const t3 = setTimeout(() => setPhase(3), 700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
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
      <div style={overlayStyle} role="status" aria-label="Loading">
        <div style={spinnerStyle} />
      </div>
    )
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div style={overlayStyle}>
      {/* Ambient rings */}
      <div style={ringsContainerStyle}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 300 + i * 180,
              height: 300 + i * 180,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.06)',
              opacity: phase >= 1 ? 0.4 : 0,
              transform: phase >= 1 ? 'scale(1)' : 'scale(0.8)',
              transition: `all 1.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}
          />
        ))}
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 1.5s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 400, padding: '0 32px' }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: 56,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <img
            src="/logos/ddn/logo-ddn-full-color-on-dark.png"
            alt="DDN"
            style={{ height: 44, margin: '0 auto' }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Glass input container */}
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: 20,
            padding: 6,
            border: `1px solid ${error ? 'rgba(237,39,56,0.4)' : focused ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
            transition: 'border-color 0.3s, box-shadow 0.3s',
            boxShadow: focused
              ? '0 0 0 4px rgba(255,118,0,0.1), 0 8px 32px rgba(0,0,0,0.2)'
              : '0 4px 24px rgba(0,0,0,0.15)',
          }}>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Access code"
              autoFocus
              aria-label="Access code"
              aria-invalid={error || undefined}
              style={{
                width: '100%',
                padding: '16px 22px',
                fontSize: 18,
                fontWeight: 500,
                color: '#fff',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                boxSizing: 'border-box' as const,
                fontFamily: 'inherit',
                letterSpacing: '0.04em',
              }}
            />
          </div>

          {error && (
            <div role="alert" style={{
              color: '#FF7600',
              fontSize: 15,
              fontWeight: 500,
              textAlign: 'center',
              marginTop: 12,
            }}>
              Invalid access code
            </div>
          )}

          {/* Gradient submit button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '17px',
              fontSize: 18,
              fontWeight: 650,
              color: '#fff',
              background: 'linear-gradient(135deg, #ED2738, #FF7600)',
              border: 'none',
              borderRadius: 16,
              cursor: 'pointer',
              marginTop: 16,
              fontFamily: 'inherit',
              transition: 'transform 0.15s, opacity 0.15s',
              letterSpacing: '0.01em',
              boxShadow: '0 4px 16px rgba(237,39,56,0.25)',
            }}
            onMouseDown={e => {
              e.currentTarget.style.transform = 'scale(0.97)'
              e.currentTarget.style.opacity = '0.9'
            }}
            onMouseUp={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.opacity = '1'
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: '#374967',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 99999,
  fontFamily: "'articulat-cf', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
}

const ringsContainerStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
}

const spinnerStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.2)',
  borderTopColor: '#fff',
  animation: 'spin 1s linear infinite',
}
