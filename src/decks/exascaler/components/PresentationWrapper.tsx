import { ReactNode, useEffect, useRef } from 'react'
import { usePresentationMode } from './Layout'
import styles from './PresentationWrapper.module.css'

interface PresentationWrapperProps {
  children: ReactNode
}

export default function PresentationWrapper({ children }: PresentationWrapperProps) {
  const presentation = usePresentationMode()
  const contentRef = useRef<HTMLDivElement>(null)
  const isEmbedded = new URLSearchParams(window.location.search).get('embedded') === 'true'

  // Update sections visibility
  useEffect(() => {
    if (!contentRef.current) return

    const sections = contentRef.current.querySelectorAll(':scope > section')

    // Update total slides count
    if (presentation && sections.length > 0) {
      presentation.setTotalSlides(sections.length)
    }

    // Apply visibility styles
    sections.forEach((section, index) => {
      const el = section as HTMLElement

      if (!presentation?.isPresentationMode) {
        // Scroll mode - reset all styles
        el.style.cssText = ''
        // Reset child styles too
        const firstChild = el.firstElementChild as HTMLElement
        if (firstChild) {
          firstChild.style.marginTop = ''
          firstChild.style.marginBottom = ''
          firstChild.style.width = ''
        }
      } else {
        // Presentation mode
        if (index === presentation.currentSlide) {
          el.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            padding: 24px 32px;
            box-sizing: border-box;
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
            z-index: 10;
          `
          // Add margin auto to first child for safe vertical centering
          const firstChild = el.firstElementChild as HTMLElement
          if (firstChild) {
            firstChild.style.marginTop = 'auto'
            firstChild.style.marginBottom = 'auto'
            firstChild.style.width = '100%'
          }
        } else {
          el.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            padding: 24px 32px;
            box-sizing: border-box;
            visibility: hidden;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
          `
        }
      }
    })

    // Trigger resize event to reinitialize canvas and other responsive elements
    if (presentation?.isPresentationMode) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
        // Also trigger a scroll event to help IntersectionObserver
        window.dispatchEvent(new Event('scroll'))

        // Find the active section and scroll it into view within its container
        const activeSection = contentRef.current?.querySelector(':scope > section:not([style*="visibility: hidden"])')
        if (activeSection) {
          activeSection.scrollIntoView({ behavior: 'instant', block: 'start' })
        }
      }, 100)
    }
  }, [presentation?.isPresentationMode, presentation?.currentSlide, presentation])

  // Scroll mode
  if (!presentation?.isPresentationMode) {
    return (
      <div ref={contentRef} className={styles.scrollMode}>
        {children}
      </div>
    )
  }

  // Presentation mode
  return (
    <div className={styles.presentationMode} style={isEmbedded ? { top: 0 } : undefined}>
      <div className={styles.slideContainer} style={isEmbedded ? { width: '100vw', height: '100vh', borderRadius: 0, border: 'none', boxShadow: 'none' } : undefined}>
        <div ref={contentRef} className={styles.slideContent}>
          {children}
        </div>
      </div>
    </div>
  )
}
