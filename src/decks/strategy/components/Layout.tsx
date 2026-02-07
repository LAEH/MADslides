import { ReactNode, useState, useEffect, useCallback, createContext, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Maximize2, Minimize2, Monitor, ScrollText, ChevronLeft, ChevronRight, X } from 'lucide-react'
import styles from './Layout.module.css'

// Mobile detection hook with debounced resize
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    let resizeTimeout: number | null = null

    const checkMobile = () => {
      // Check for mobile devices via user agent and screen width
      const userAgent = navigator.userAgent || navigator.vendor
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isMobileUA || isSmallScreen)
    }

    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
      resizeTimeout = window.setTimeout(checkMobile, 150)
    }

    checkMobile()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
    }
  }, [])

  return isMobile
}

// Slide names for navigation
const SLIDE_NAMES = [
  'Title',
  'Five Forces Reshaping AI',
  'DDN Enabling Technologies',
  'AI Transformation Platform',
  'Data Intelligence Platform',
  'AI Data-Compute Demand',
  'Use Case: Pediatric Cancer',
  'Infinia Roadmap',
  '2026 Strategy',
  'Strategy Evolution',
  'Architecture Update',
  'Architecture & Integrations',
  'NIXL/Dynamo Integration',
  'KV Cache Dashboard'
]

// Context for presentation mode
interface PresentationContextType {
  isPresentationMode: boolean
  currentSlide: number
  totalSlides: number
  goToSlide: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
  registerSlide: () => number
  setTotalSlides: (count: number) => void
}

const PresentationContext = createContext<PresentationContextType | null>(null)

export const usePresentationMode = () => useContext(PresentationContext)

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile()
  const [scrolled, setScrolled] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPresentationMode, setIsPresentationMode] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const [showSlideNav, setShowSlideNav] = useState(false)
  const [isEmbedded, setIsEmbedded] = useState(false)

  // URL param support: ?slide=N&embedded=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slideParam = params.get('slide')
    const embeddedParam = params.get('embedded')
    if (embeddedParam === 'true') {
      setIsEmbedded(true)
    }
    if (slideParam) {
      const slideNum = parseInt(slideParam, 10)
      if (!isNaN(slideNum) && slideNum >= 1) {
        setIsPresentationMode(true)
        setCurrentSlide(slideNum - 1)
      }
    }
  }, [])

  // Disable presentation mode on mobile
  useEffect(() => {
    if (isMobile && isPresentationMode) {
      setIsPresentationMode(false)
    }
  }, [isMobile, isPresentationMode])

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch((err) => {
        console.error('Fullscreen error:', err)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }, [])

  // Presentation mode toggle
  const togglePresentationMode = useCallback(() => {
    setIsPresentationMode(prev => !prev)
    setCurrentSlide(0)
    setShowSlideNav(false)
  }, [])

  // Slide navigation
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)))
    setShowSlideNav(false)
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }, [])

  const registerSlide = useCallback(() => {
    setTotalSlides(prev => prev + 1)
    return totalSlides
  }, [totalSlides])

  const updateTotalSlides = useCallback((count: number) => {
    setTotalSlides(count)
  }, [])

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (!isPresentationMode) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSlideNav && e.key === 'Escape') {
        setShowSlideNav(false)
        return
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'Escape') {
        setIsPresentationMode(false)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToSlide(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goToSlide(totalSlides - 1)
      } else if (e.key === 'g' || e.key === 'G') {
        setShowSlideNav(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPresentationMode, nextSlide, prevSlide, goToSlide, totalSlides, showSlideNav])

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Control body overflow in presentation mode
  useEffect(() => {
    if (isPresentationMode) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isPresentationMode])

  // Memoized presentation context value - prevents unnecessary re-renders
  const presentationContextValue = useMemo<PresentationContextType>(() => ({
    isPresentationMode,
    currentSlide,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    registerSlide,
    setTotalSlides: updateTotalSlides
  }), [isPresentationMode, currentSlide, totalSlides, goToSlide, nextSlide, prevSlide, registerSlide, updateTotalSlides])

  return (
    <PresentationContext.Provider value={presentationContextValue}>
      <div className={`${styles.layout} ${isPresentationMode ? styles.presentationMode : ''}`}>
        {/* Navigation - Liquid Context Top Bar */}
        {!isEmbedded && <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${isPresentationMode ? styles.presentationNav : ''}`}>
          <div className={styles.navInner}>
            {/* Logo - Left Aligned */}
            <Link to="/" className={styles.logo}>
              <img src="/ddn-logo.png" alt="DDN" className={styles.logoImg} />
            </Link>

            {/* Center Title */}
            <span className={styles.pageTitle}>Strategic Roadmap</span>

            {/* Right side controls */}
            <div className={styles.navControls}>
              {/* Slide Counter - clickable for navigation */}
              {isPresentationMode && totalSlides > 0 && (
                <button
                  className={styles.slideCounter}
                  onClick={() => setShowSlideNav(true)}
                  title="Click to navigate slides (or press G)"
                >
                  {currentSlide + 1} / {totalSlides}
                </button>
              )}

              {/* View Mode Toggle - Hidden on mobile */}
              {!isMobile && (
                <button
                  className={`${styles.viewModeBtn} ${isPresentationMode ? styles.active : ''}`}
                  onClick={togglePresentationMode}
                  title={isPresentationMode ? 'Switch to Scroll View' : 'Switch to Slide View'}
                >
                  {isPresentationMode ? <ScrollText size={18} /> : <Monitor size={18} />}
                  <span className={styles.viewModeLabel}>
                    {isPresentationMode ? 'Scroll' : 'Slides'}
                  </span>
                </button>
              )}

              {/* Fullscreen Button */}
              <button
                className={styles.fullscreenBtn}
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
        </nav>}

        {/* Main Content */}
        <main
          className={`${styles.main} ${isPresentationMode && !isEmbedded ? styles.presentationMain : ''}`}
          style={isEmbedded && isPresentationMode ? { position: 'fixed', inset: 0, padding: 0, margin: 0, overflow: 'hidden', background: '#E8E9EB' } : undefined}
        >
          {children}
        </main>

        {/* Presentation Navigation Arrows */}
        {isPresentationMode && !isEmbedded && (
          <>
            <button
              className={`${styles.slideNavBtn} ${styles.prevBtn}`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <button
              className={`${styles.slideNavBtn} ${styles.nextBtn}`}
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              aria-label="Next slide"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </>
        )}

        {/* Slide Navigation Modal */}
        {isPresentationMode && showSlideNav && !isEmbedded && (
          <div className={styles.slideNavModal} onClick={() => setShowSlideNav(false)}>
            <div className={styles.slideNavContent} onClick={e => e.stopPropagation()}>
              <div className={styles.slideNavHeader}>
                <h3>Go to Slide</h3>
                <button className={styles.slideNavClose} onClick={() => setShowSlideNav(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className={styles.slideNavList}>
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.slideNavItem} ${i === currentSlide ? styles.active : ''}`}
                    onClick={() => goToSlide(i)}
                  >
                    <span className={styles.slideNavNumber}>{i + 1}</span>
                    <span className={styles.slideNavName}>{SLIDE_NAMES[i] || `Slide ${i + 1}`}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer - hidden in presentation mode */}
        {!isPresentationMode && (
          <footer className={styles.footer}>
            <div className={styles.footerInner}>
              <span className={styles.footerText}>DDN · Enterprise AI Infrastructure · © {new Date().getFullYear()}</span>
            </div>
          </footer>
        )}
      </div>
    </PresentationContext.Provider>
  )
}
