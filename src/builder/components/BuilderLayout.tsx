import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '../config/motion'
import BuilderNav from './BuilderNav'
import AllSlidesBrowser from '../pages/AllSlidesBrowser'

export default function BuilderLayout() {
  const location = useLocation()
  const isLibrary = location.pathname === '/'
  const [hasVisitedLibrary, setHasVisitedLibrary] = useState(isLibrary)

  useEffect(() => {
    if (isLibrary) setHasVisitedLibrary(true)
  }, [isLibrary])

  return (
    <div className="min-h-screen bg-bg text-primary">
      <BuilderNav />

      {/* AllSlidesBrowser — persistently mounted once visited, hidden when on other routes */}
      {hasVisitedLibrary && (
        <main
          className="pt-[var(--nav-height)]"
          style={{ display: isLibrary ? 'block' : 'none' }}
        >
          <AllSlidesBrowser />
        </main>
      )}

      {/* Other routes via Outlet */}
      <AnimatePresence mode="wait">
        {!isLibrary && (
          <motion.main
            key={location.pathname}
            className="pt-[var(--nav-height)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            <Outlet />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
