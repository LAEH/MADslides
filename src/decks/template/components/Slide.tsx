import { ReactNode, useEffect, useRef, useState, useCallback } from 'react'
import { usePresentationMode } from './Layout'
import styles from './Slide.module.css'

interface SlideProps {
  children: ReactNode
  className?: string
  index: number
}

export default function Slide({ children, className = '', index }: SlideProps) {
  const presentation = usePresentationMode()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const resizeTimeoutRef = useRef<number | null>(null)

  const calculateScale = useCallback(() => {
    if (!presentation?.isPresentationMode || !containerRef.current || !contentRef.current) {
      setScale(1)
      return
    }

    const container = containerRef.current
    const content = contentRef.current

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const contentWidth = content.scrollWidth
    const contentHeight = content.scrollHeight

    const scaleX = containerWidth / Math.max(contentWidth, 1)
    const scaleY = containerHeight / Math.max(contentHeight, 1)
    const newScale = Math.min(scaleX, scaleY, 1)

    setScale(newScale)
  }, [presentation?.isPresentationMode])

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      window.clearTimeout(resizeTimeoutRef.current)
    }
    resizeTimeoutRef.current = window.setTimeout(calculateScale, 150)
  }, [calculateScale])

  useEffect(() => {
    if (!presentation?.isPresentationMode) {
      setScale(1)
      return
    }

    // Only calculate and listen if this slide is active or about to be (adjacent)
    // For now, strict 'isActive' check is best for performance. 
    // If adjacent pre-calculation is needed, we can expand logic later.
    const isActive = presentation.currentSlide === index

    if (isActive) {
      calculateScale()
      window.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [presentation?.isPresentationMode, presentation?.currentSlide, index, calculateScale, handleResize])

  // In scroll mode, render normally
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
            willChange: isActive ? 'transform' : 'auto',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
