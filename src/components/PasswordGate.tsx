import { useState, useEffect, memo } from 'react'

const CORRECT_PASSWORD = 'ddn2026'
const STORAGE_KEY = 'ddn-slides-auth'

function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') setAuthed(true)
    setChecking(false)
    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 400)
    const t3 = setTimeout(() => setPhase(3), 700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setAuthed(true)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (checking) {
    return (
      <div style={overlayStyle}>
        <div style={spinnerStyle} />
      </div>
    )
  }

  if (authed) return <>{children}</>

  return (
    <div style={overlayStyle}>
      <div style={ringsContainerStyle}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 300 + i * 180,
              height: 300 + i * 180,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.04)',
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
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 1.5s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 480, padding: '0 32px' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 48,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>
            DDN Slides
          </div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
            Presentation Builder
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            placeholder="Enter access code"
            autoFocus
            style={{
              width: '100%',
              padding: '18px 28px',
              fontSize: 18,
              color: '#fff',
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 16,
              outline: 'none',
              boxSizing: 'border-box' as const,
              fontFamily: 'inherit',
              transition: 'border-color 0.3s',
            }}
          />
          {error && (
            <div style={{ color: 'rgba(239,68,68,0.8)', fontSize: 14, textAlign: 'center', marginTop: 8 }}>
              Invalid access code
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '18px',
              fontSize: 18,
              fontWeight: 600,
              color: '#000',
              background: '#fff',
              border: 'none',
              borderRadius: 16,
              cursor: 'pointer',
              marginTop: 20,
              fontFamily: 'inherit',
              transition: 'transform 0.15s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Access Demo
          </button>
        </form>
      </div>
    </div>
  )
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 99999,
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
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

export default memo(PasswordGate)
