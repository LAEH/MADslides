import { useState, useCallback, useRef, useEffect } from 'react'

type Phase = 'loading' | 'ready'

export function useIframePreloader(totalCount: number) {
  const [loadedSet, setLoadedSet] = useState<Set<string>>(() => new Set())
  const [phase, setPhase] = useState<Phase>('loading')
  const timeoutRef = useRef<number>()

  const loadedCount = loadedSet.size
  const progress = totalCount > 0 ? loadedCount / totalCount : 0

  const markLoaded = useCallback((codeName: string) => {
    setLoadedSet(prev => {
      if (prev.has(codeName)) return prev
      const next = new Set(prev)
      next.add(codeName)
      return next
    })
  }, [])

  // Transition to ready when all loaded
  useEffect(() => {
    if (phase === 'loading' && loadedCount >= totalCount && totalCount > 0) {
      setPhase('ready')
    }
  }, [loadedCount, totalCount, phase])

  // 15-second safety timeout
  useEffect(() => {
    if (phase !== 'loading') return
    timeoutRef.current = window.setTimeout(() => {
      setPhase('ready')
    }, 15000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [phase])

  return { progress, loadedCount, totalCount, phase, markLoaded }
}
