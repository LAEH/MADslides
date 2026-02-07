import { useState, useRef, useEffect, useMemo, useCallback } from 'react'

interface SlideIframeProps {
  previewUrl: string
  title: string
  className?: string
  onLoad?: () => void
  staticMode?: boolean
  theme?: 'light' | 'dark'
}

const SLIDE_W = 1920
const SLIDE_H = 1080

/** Build iframe src with query params for static/dark mode. */
function buildIframeSrc(
  previewUrl: string,
  staticMode: boolean,
  theme: 'light' | 'dark' = 'dark',
): string {
  const url = new URL(previewUrl, window.location.origin)
  if (staticMode) url.searchParams.set('static', 'true')
  // Always pass theme (default dark)
  url.searchParams.set('theme', theme)
  return url.pathname + url.search
}

export default function SlideIframe({
  previewUrl,
  title,
  className = '',
  onLoad,
  staticMode = false,
  theme,
}: SlideIframeProps) {
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Lazy load with IntersectionObserver
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      })
    }, {
      rootMargin: '200px 0px', // Preload when close
      threshold: 0.01
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])


  const src = useMemo(
    () => buildIframeSrc(previewUrl, staticMode, theme),
    [previewUrl, staticMode, theme],
  )

  // Reset loaded state when src changes
  useEffect(() => {
    setLoaded(false)
  }, [src])

  // Measure once on mount, then only on actual resize (debounced)
  const updateScale = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const newScale = el.offsetWidth / SLIDE_W
    if (Math.abs(newScale - scaleRef.current) > 0.001) {
      scaleRef.current = newScale
      // Wait for visibility before triggering render
      if (!ready && isVisible) setReady(true)
    }
  }, [ready, isVisible])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Initial measure
    updateScale()

    // Debounced resize handler to prevent jitter
    let timeout: number
    const ro = new ResizeObserver(() => {
      clearTimeout(timeout)
      timeout = window.setTimeout(updateScale, 100)
    })
    ro.observe(el)

    return () => {
      clearTimeout(timeout)
      ro.disconnect()
    }
  }, [updateScale, isVisible])
  
  // Trigger ready when visible even if scale didn't change (initial load)
  useEffect(() => {
    if (isVisible && !ready && scaleRef.current > 0) {
      setReady(true)
    }
  }, [isVisible, ready])

  const scale = scaleRef.current

  return (
    <div
      ref={containerRef}
      className={`aspect-16-9 ${className}`}
      style={{ borderRadius: 'inherit' }}
    >
      {(!loaded || !ready) && <div className="skeleton" />}
      {ready ? (
        <iframe
          key={src}
          src={src}
          title={title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${SLIDE_W}px`,
            height: `${SLIDE_H}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center',
            pointerEvents: 'none',
            border: 'none',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
            willChange: 'transform',
            contain: 'strict',
          }}
          onLoad={() => {
            setLoaded(true)
            onLoad?.()
          }}
        />
      ) : null}
    </div>
  )
}
