import '../../shared/design-tokens.css'
import './styles/global.css'
import './styles/ddn-colors.css'
import './styles/demo-shared.css'
import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import PerformanceProvider from './components/PerformanceProvider'
import ErrorBoundary from './components/shared/ErrorBoundary'

import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const EXAScalerDemo = lazy(() => import('./pages/EXAScalerDemo'))

function PageLoader() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 32, height: 32, border: '2px solid #333',
          borderTopColor: '#00C280', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function ExascalerEntry() {
  const params = new URLSearchParams(window.location.search)
  const isStatic = params.get('static') === 'true'
  const isEmbedded = params.get('embedded') === 'true'
  const themeParam = params.get('theme')

  useEffect(() => {
    // Default to dark theme, only use light if explicitly requested
    const theme = themeParam === 'light' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme)
    
    // Also add class for Tailwind
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    return () => { 
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.classList.remove('dark')
    }
  }, [themeParam])

  useEffect(() => {
    if (!isStatic) return
    const s = document.createElement('style')
    s.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }'
    document.head.appendChild(s)
    return () => { s.remove() }
  }, [isStatic])

  useEffect(() => {
    if (!isEmbedded) return
    const s = document.createElement('style')
    s.textContent = [
      '[class*="presentationMode"] { top: 0 !important; padding: 0 !important; }',
      '[class*="presentationMain"] { height: 100vh !important; padding: 0 !important; }',
      '[class*="slideWrapper"] { top: 0 !important; bottom: 0 !important; }',
      '[class*="slideContainer"] { width: 100vw !important; height: 100vh !important; top: 0 !important; left: 0 !important; transform: none !important; max-width: none !important; max-height: none !important; border-radius: 0 !important; border: none !important; box-shadow: none !important; }',
    ].join('\n')
    document.head.appendChild(s)
    return () => { s.remove() }
  }, [isEmbedded])

  return (
    <MotionConfig reducedMotion={isStatic ? 'always' : 'never'}>
    <PerformanceProvider>
      <Layout>
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="*" element={<EXAScalerDemo />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </PerformanceProvider>
    </MotionConfig>
  )
}
