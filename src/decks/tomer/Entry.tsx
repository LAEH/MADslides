import '../../shared/design-tokens.css'
import './styles/global.css'
import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import Layout, { usePresentationMode } from './components/Layout'
import Slide from './components/Slide'
import { slides, totalSlides } from './slides'
import styles from './pages/Slides.module.css'

function SlidesContent() {
  const presentation = usePresentationMode()

  useEffect(() => {
    if (presentation) {
      presentation.setTotalSlides(totalSlides)
    }
  }, [presentation])

  return (
    <div className={styles.demo}>
      {slides.map((SlideComponent, index) => (
        <Slide key={index} index={index}>
          <SlideComponent />
        </Slide>
      ))}
    </div>
  )
}

export default function TomerEntry() {
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
    <Layout>
      <Routes>
        <Route path="*" element={<SlidesContent />} />
      </Routes>
    </Layout>
    </MotionConfig>
  )
}
