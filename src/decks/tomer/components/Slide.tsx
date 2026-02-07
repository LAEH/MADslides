import { ReactNode, useEffect, useRef, useState, useCallback } from 'react'
import { usePresentationMode } from './Layout'
import styles from './Slide.module.css'

interface SlideProps {
  children: ReactNode
  className?: string
  index: number // Required - explicit index for deterministic ordering
}

/**
 * Slide Component
 *
 * Renders content as a slide in presentation mode or inline in scroll mode.
 * Uses explicit index prop for deterministic slide ordering (no global state).
 *
 * @example
 * <Slide index={0} className={styles.heroSlide}>
 *   <HeroContent />
 * </Slide>
 */
export default function Slide({ children, className = '', index }: SlideProps) {
  const presentation = usePresentationMode()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const resizeTimeoutRef = useRef<number | null>(null)

  // Debounced scale calculation - avoids layout thrashing
  const calculateScale = useCallback(() => {
    if (!presentation?.isPresentationMode || !containerRef.current || !contentRef.current) {
      setScale(1)
      return
    }

    const container = containerRef.current
    const content = contentRef.current

    // Get the 16:9 container dimensions
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // Get the natural content dimensions
    const contentWidth = content.scrollWidth
    const contentHeight = content.scrollHeight

    // Calculate scale to fit - clamp between 0.5 and 1 (never scale up)
    const scaleX = containerWidth / Math.max(contentWidth, 1)
    const scaleY = containerHeight / Math.max(contentHeight, 1)
    const newScale = Math.min(scaleX, scaleY, 1)

    setScale(newScale)
  }, [presentation?.isPresentationMode])

  // Debounced resize handler - 150ms debounce for smooth resizing
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      window.clearTimeout(resizeTimeoutRef.current)
    }
    resizeTimeoutRef.current = window.setTimeout(calculateScale, 150)
  }, [calculateScale])

  // Calculate scale on presentation mode or slide change
  useEffect(() => {
    if (!presentation?.isPresentationMode) {
      setScale(1)
      return
    }

    // Small delay to let content render, then calculate
    const timer = window.setTimeout(calculateScale, 50)
    window.addEventListener('resize', handleResize)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [presentation?.isPresentationMode, presentation?.currentSlide, calculateScale, handleResize])

  // In scroll mode, render normally without wrapper overhead
  if (!presentation?.isPresentationMode) {
    return (
      <div data-slide={index} className={`${styles.scrollSlide} ${className}`}>
        {children}
      </div>
    )
  }

  // In presentation mode, check if this slide is active
  const isActive = presentation.currentSlide === index

  return (
    <div
      data-slide={index}
      className={`${styles.slideWrapper} ${isActive ? styles.active : styles.hidden}`}
      aria-hidden={!isActive}
    >
      <div ref={containerRef} className={styles.slideContainer}>
        <div
          ref={contentRef}
          className={`${styles.slideContent} ${className}`}
          style={{
            transform: `scale(${scale})`,
            // GPU-accelerated transform for 60fps
            willChange: isActive ? 'transform' : 'auto',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
