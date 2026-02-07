import { useState, useEffect } from 'react'

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    let resizeTimeout: number | null = null

    const checkMobile = () => {
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
