import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '../config/motion'
import BuilderNav from './BuilderNav'

export default function BuilderLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg text-primary">
      <BuilderNav />
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </div>
  )
}
