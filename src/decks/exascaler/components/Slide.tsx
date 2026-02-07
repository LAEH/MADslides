import { ReactNode, useEffect, useRef, useState } from 'react'
import { usePresentationMode } from './Layout'
import styles from './Slide.module.css'

interface SlideProps {
  children: ReactNode
  className?: string
}

export default function Slide({ children, className = '' }: SlideProps) {
  const presentation = usePresentationMode()
  const [slideIndex, setSlideIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // Register this slide on mount
  useEffect(() => {
    if (presentation && slideIndex === -1) {
      // Count existing slides by checking DOM
      const existingSlides = document.querySelectorAll('[data-slide]').length
      setSlideIndex(existingSlides)
    }
  }, [presentation, slideIndex])

  // Calculate scale to fit 16:9 container
  useEffect(() => {
    if (!presentation?.isPresentationMode || !containerRef.current || !contentRef.current) {
      setScale(1)
      return
    }

    const calculateScale = () => {
      const container = containerRef.current
      const content = contentRef.current
      if (!container || !content) return

      // Get the 16:9 container dimensions
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      // Get the natural content dimensions
      const contentWidth = content.scrollWidth
      const contentHeight = content.scrollHeight

      // Calculate scale to fit
      const scaleX = containerWidth / Math.max(contentWidth, 1)
      const scaleY = containerHeight / Math.max(contentHeight, 1)
      const newScale = Math.min(scaleX, scaleY, 1) // Don't scale up, only down

      setScale(newScale)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [presentation?.isPresentationMode])

  // In scroll mode, render normally
  if (!presentation?.isPresentationMode) {
    return (
      <div data-slide={slideIndex} className={className}>
        {children}
      </div>
    )
  }

  // In presentation mode, check if this slide is active
  const isActive = presentation.currentSlide === slideIndex

  return (
    <div
      data-slide={slideIndex}
      className={`${styles.slideWrapper} ${isActive ? styles.active : styles.hidden}`}
    >
      <div ref={containerRef} className={styles.slideContainer}>
        <div
          ref={contentRef}
          className={`${styles.slideContent} ${className}`}
          style={{ transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
