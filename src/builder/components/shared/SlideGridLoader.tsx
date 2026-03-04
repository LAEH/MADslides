import { motion } from 'framer-motion'
import { spring } from '../../config/motion'

interface SlideGridLoaderProps {
  progress: number
  loadedCount: number
  totalCount: number
}

const RING_RADIUS = 40
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const GRID_COLS = 9

export default function SlideGridLoader({
  progress,
  loadedCount,
  totalCount,
}: SlideGridLoaderProps) {
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress)

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-32 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Progress Ring */}
      <div className="relative">
        <svg width="96" height="96" viewBox="0 0 96 96">
          {/* Background ring */}
          <circle
            cx="48"
            cy="48"
            r={RING_RADIUS}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="3"
          />
          {/* Progress ring */}
          <motion.circle
            cx="48"
            cy="48"
            r={RING_RADIUS}
            fill="none"
            stroke="var(--accent-green)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            animate={{ strokeDashoffset }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
            }}
          />
        </svg>

        {/* Counter in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-mono">
            <motion.span
              key={loadedCount}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring.responsive}
              className="inline-block text-secondary"
            >
              {loadedCount}
            </motion.span>
            <span className="text-tertiary"> / {totalCount}</span>
          </span>
        </div>
      </div>

      {/* Dot Grid */}
      <div
        className="flex flex-wrap justify-center gap-[3px]"
        style={{ maxWidth: `${GRID_COLS * 10}px` }}
      >
        {Array.from({ length: totalCount }, (_, i) => (
          <motion.div
            key={i}
            style={{
              width: 7,
              height: 5,
              borderRadius: 1,
            }}
            animate={{
              backgroundColor:
                i < loadedCount
                  ? 'var(--accent-green)'
                  : 'var(--color-border)',
            }}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>

      {/* Label */}
      <p className="text-sm text-tertiary">
        Building your library...
      </p>
    </motion.div>
  )
}
