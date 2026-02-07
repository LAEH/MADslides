import { createContext, useContext, ReactNode, useMemo } from 'react'
import registryData from '../../data/slides-registry.json'

export interface SlideEntry {
  codeName: string
  project: string
  slideIndex: number
  title: string
  section: string
  layout: string
  description: string
  tags: string[]
  contentTags: string[]
  previewUrl: string
  sourceRef: string
}

export interface ProjectInfo {
  name: string
  port: number
  color: string
  path: string
}

interface RegistryContextType {
  slides: SlideEntry[]
  projects: Record<string, ProjectInfo>
  totalSlides: number
  getByCodeName: (codeName: string) => SlideEntry | undefined
  getByProject: (project: string) => SlideEntry[]
  searchSlides: (query: string) => SlideEntry[]
}

const RegistryContext = createContext<RegistryContextType | null>(null)

export function RegistryProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => {
    const slides = registryData.slides as SlideEntry[]
    const projects = registryData.projects as Record<string, ProjectInfo>

    return {
      slides,
      projects,
      totalSlides: slides.length,
      getByCodeName: (codeName: string) =>
        slides.find(s => s.codeName === codeName),
      getByProject: (project: string) =>
        slides.filter(s => s.project === project),
      searchSlides: (query: string) => {
        const q = query.toLowerCase().trim()
        if (!q) return slides
        return slides.filter(s =>
          s.codeName.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some(t => t.toLowerCase().includes(q)) ||
          s.section.toLowerCase().includes(q)
        )
      },
    }
  }, [])

  return (
    <RegistryContext.Provider value={value}>
      {children}
    </RegistryContext.Provider>
  )
}

export function useRegistry() {
  const ctx = useContext(RegistryContext)
  if (!ctx) throw new Error('useRegistry must be used within RegistryProvider')
  return ctx
}
