import { useRef, useCallback, useEffect } from 'react'

interface AnimationStep {
  delay: number
  action: () => void
}

/**
 * useAnimationSequence - Memory-safe animation orchestration
 *
 * Handles multiple setTimeout/setInterval calls with proper cleanup
 * to prevent memory leaks and state updates on unmounted components.
 *
 * @example
 * const { runSequence, isRunning, cancel } = useAnimationSequence()
 *
 * const animate = () => {
 *   runSequence([
 *     { delay: 0, action: () => setStep(1) },
 *     { delay: 500, action: () => setStep(2) },
 *     { delay: 1000, action: () => setStep(3) },
 *   ], {
 *     onComplete: () => setStep(0)
 *   })
 * }
 */
export function useAnimationSequence() {
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])
  const intervalRefs = useRef<NodeJS.Timeout[]>([])
  const isRunningRef = useRef(false)
  const isMountedRef = useRef(true)

  // Cleanup all timers
  const cleanup = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout)
    intervalRefs.current.forEach(clearInterval)
    timeoutRefs.current = []
    intervalRefs.current = []
    isRunningRef.current = false
  }, [])

  // Cancel current animation
  const cancel = useCallback(() => {
    cleanup()
  }, [cleanup])

  // Run a sequence of timed actions
  const runSequence = useCallback((
    steps: AnimationStep[],
    options?: {
      onComplete?: () => void
      preventRerun?: boolean
    }
  ) => {
    // Prevent re-running if already running
    if (options?.preventRerun && isRunningRef.current) {
      return false
    }

    // Clean up any existing timers
    cleanup()
    isRunningRef.current = true

    // Schedule all steps
    steps.forEach(({ delay, action }) => {
      const timeout = setTimeout(() => {
        if (isMountedRef.current) {
          action()
        }
      }, delay)
      timeoutRefs.current.push(timeout)
    })

    // Handle completion
    if (options?.onComplete) {
      const maxDelay = Math.max(...steps.map(s => s.delay))
      const completeTimeout = setTimeout(() => {
        if (isMountedRef.current) {
          options.onComplete?.()
          isRunningRef.current = false
        }
      }, maxDelay + 50) // Small buffer after last action
      timeoutRefs.current.push(completeTimeout)
    }

    return true
  }, [cleanup])

  // Create a managed interval
  const createInterval = useCallback((
    callback: () => void,
    intervalMs: number
  ) => {
    const interval = setInterval(() => {
      if (isMountedRef.current) {
        callback()
      }
    }, intervalMs)
    intervalRefs.current.push(interval)
    return interval
  }, [])

  // Clear a specific interval
  const clearManagedInterval = useCallback((interval: NodeJS.Timeout) => {
    clearInterval(interval)
    intervalRefs.current = intervalRefs.current.filter(i => i !== interval)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      cleanup()
    }
  }, [cleanup])

  return {
    runSequence,
    createInterval,
    clearManagedInterval,
    cancel,
    isRunning: () => isRunningRef.current,
  }
}

export default useAnimationSequence
