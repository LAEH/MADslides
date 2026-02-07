import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { z } from 'zod'

// --- Zod Schemas ---

export const MySlideEntrySchema = z.object({
  id: z.string().uuid(),
  codeName: z.string(),
  project: z.string(),
  title: z.string(),
  previewUrl: z.string(),
  createdAt: z.string().datetime(), // Enforce ISO string
  tags: z.array(z.string()).optional(),
})

export type MySlideEntry = z.infer<typeof MySlideEntrySchema>

const DeckSchema = z.object({
  name: z.string(),
  slides: z.array(MySlideEntrySchema),
})

type DeckData = z.infer<typeof DeckSchema>

// --- Context Types ---

export type DeckViewMode = 'grid' | 'player'
export type PlayerMode = 'slide' | 'scroll'

interface MyDeckContextType {
  deck: DeckData
  isEmpty: boolean
  viewMode: DeckViewMode
  setViewMode: (mode: DeckViewMode) => void
  playerMode: PlayerMode
  setPlayerMode: (mode: PlayerMode) => void
  addSlide: (slide: Omit<MySlideEntry, 'id' | 'createdAt'>) => void
  removeSlide: (id: string) => void
  addRandomSlides: (count: number, allSlides: unknown[]) => void
  clearDeck: () => void
}

const MyDeckContext = createContext<MyDeckContextType | null>(null)

const STORAGE_KEY = 'ddn-my-deck'

// --- Storage Logic ---

function loadDeck(): DeckData {
  const defaultDeck: DeckData = { name: 'My Deck', slides: [] }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultDeck

    // Safe parse with Zod
    const parsed = JSON.parse(stored)
    const result = DeckSchema.safeParse(parsed)

    if (result.success) {
      return result.data
    } else {
      console.warn('MyDeckContext: Invalid deck data in localStorage, resetting.', result.error)
      return defaultDeck
    }
  } catch (error) {
    console.error('MyDeckContext: Failed to load deck from localStorage', error)
    return defaultDeck
  }
}

function saveDeck(deck: DeckData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck))
  } catch (error) {
    console.error('MyDeckContext: Failed to save deck to localStorage', error)
  }
}

// --- Provider ---

export function MyDeckProvider({ children }: { children: ReactNode }) {
  const [deck, setDeck] = useState<DeckData>(loadDeck)
  const [viewMode, setViewMode] = useState<DeckViewMode>('grid')
  const [playerMode, setPlayerMode] = useState<PlayerMode>('slide')

  // Persist on change
  useEffect(() => {
    saveDeck(deck)
  }, [deck])

  const addSlide = useCallback((slideRaw: Omit<MySlideEntry, 'id' | 'createdAt'>) => {
    const newSlide: MySlideEntry = {
      ...slideRaw,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setDeck(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }))
  }, [])

  // Input schema for random slides to ensure we don't ingest garbage
  const RandomSlideInputSchema = z.object({
    codeName: z.string(),
    project: z.string(),
    title: z.string(),
    previewUrl: z.string(),
    tags: z.array(z.string()).optional(),
  })

  const addRandomSlides = useCallback((count: number, allSlides: unknown[]) => {
    if (!Array.isArray(allSlides) || allSlides.length === 0) return

    const newSlides: MySlideEntry[] = []
    
    // Filter down to valid slides first to avoid trying to add invalid ones
    const validSourceSlides = allSlides.filter(s => RandomSlideInputSchema.safeParse(s).success)

    if (validSourceSlides.length === 0) {
      console.warn('MyDeckContext: No valid slides found in source array')
      return
    }
    
    for (let i = 0; i < count; i++) {
        const randomSlide = validSourceSlides[Math.floor(Math.random() * validSourceSlides.length)]
        // We know it parses because we filtered, but we let Zod infer the type logic implicitly 
        // or just cast/access safely.
        // Let's re-parse to be 100% type-safe in the push, or just trust the filter.
        const parsed = RandomSlideInputSchema.parse(randomSlide)

        newSlides.push({
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...parsed
        })
    }
    
    setDeck(prev => ({
        ...prev,
        slides: [...prev.slides, ...newSlides]
    }))
  }, [])

  const clearDeck = useCallback(() => {
    setDeck(prev => ({ ...prev, slides: [] }))
  }, [])

  const removeSlide = useCallback((id: string) => {
    setDeck(prev => ({
      ...prev,
      slides: prev.slides.filter(s => s.id !== id),
    }))
  }, [])

  return (
    <MyDeckContext.Provider value={{
      deck,
      isEmpty: deck.slides.length === 0,
      viewMode,
      setViewMode,
      playerMode,
      setPlayerMode,
      addSlide,
      removeSlide,
      addRandomSlides,
      clearDeck,
    }}>
      {children}
    </MyDeckContext.Provider>
  )
}

export function useMyDeck() {
  const ctx = useContext(MyDeckContext)
  if (!ctx) throw new Error('useMyDeck must be used within MyDeckProvider')
  return ctx
}
