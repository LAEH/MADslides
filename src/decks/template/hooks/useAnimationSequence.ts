import { useRef, useCallback, useEffect } from 'react'

interface AnimationStep {
  delay: number
  action: () => void
}

export function useAnimationSequence() {
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])
  const intervalRefs = useRef<ReturnType<typeof setInterval>[]>([])
  const isRunningRef = useRef(false)
  const isMountedRef = useRef(true)

  const cleanup = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout)
    intervalRefs.current.forEach(clearInterval)
    timeoutRefs.current = []
    intervalRefs.current = []
    isRunningRef.current = false
  }, [])

  const cancel = useCallback(() => {
    cleanup()
  }, [cleanup])

  const runSequence = useCallback((
    steps: AnimationStep[],
    options?: {
      onComplete?: () => void
      preventRerun?: boolean
    }
  ) => {
    if (options?.preventRerun && isRunningRef.current) {
      return false
    }

    cleanup()
    isRunningRef.current = true

    steps.forEach(({ delay, action }) => {
      const timeout = setTimeout(() => {
        if (isMountedRef.current) {
          action()
        }
      }, delay)
      timeoutRefs.current.push(timeout)
    })

    if (options?.onComplete) {
      const maxDelay = Math.max(...steps.map(s => s.delay))
      const completeTimeout = setTimeout(() => {
        if (isMountedRef.current) {
          options.onComplete?.()
          isRunningRef.current = false
        }
      }, maxDelay + 50)
      timeoutRefs.current.push(completeTimeout)
    }

    return true
  }, [cleanup])

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

  const clearManagedInterval = useCallback((interval: ReturnType<typeof setInterval>) => {
    clearInterval(interval)
    intervalRefs.current = intervalRefs.current.filter(i => i !== interval)
  }, [])

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
