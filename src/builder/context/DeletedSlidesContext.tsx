import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import registryData from '../../data/slides-registry.json'

interface DeletedSlidesContextType {
  deletedSet: Set<string>
  isDeleted: (codeName: string) => boolean
  deleteSlide: (codeName: string) => void
  restoreSlide: (codeName: string) => void
  deletedCount: number
}

const DeletedSlidesContext = createContext<DeletedSlidesContextType | null>(null)

const STORAGE_KEY = 'ddn-deleted-slides'

// Get valid codeNames from registry
const validCodeNames = new Set(
  (registryData.slides as { codeName: string }[]).map(s => s.codeName)
)

function loadDeleted(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as string[]
      // Filter out codeNames that no longer exist in the registry
      const valid = parsed.filter(cn => validCodeNames.has(cn))
      // If we filtered anything, save the cleaned list
      if (valid.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(valid))
      }
      return new Set(valid)
    }
  } catch { /* ignore */ }
  return new Set()
}

function saveDeleted(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch { /* ignore */ }
}

export function DeletedSlidesProvider({ children }: { children: ReactNode }) {
  const [deletedSet, setDeletedSet] = useState(loadDeleted)

  useEffect(() => {
    saveDeleted(deletedSet)
  }, [deletedSet])

  const isDeleted = useCallback(
    (codeName: string) => deletedSet.has(codeName),
    [deletedSet]
  )

  const deleteSlide = useCallback((codeName: string) => {
    setDeletedSet(prev => {
      const next = new Set(prev)
      next.add(codeName)
      return next
    })
  }, [])

  const restoreSlide = useCallback((codeName: string) => {
    setDeletedSet(prev => {
      const next = new Set(prev)
      next.delete(codeName)
      return next
    })
  }, [])

  return (
    <DeletedSlidesContext.Provider value={{
      deletedSet,
      isDeleted,
      deleteSlide,
      restoreSlide,
      deletedCount: deletedSet.size,
    }}>
      {children}
    </DeletedSlidesContext.Provider>
  )
}

export function useDeletedSlides() {
  const ctx = useContext(DeletedSlidesContext)
  if (!ctx) throw new Error('useDeletedSlides must be used within DeletedSlidesProvider')
  return ctx
}
