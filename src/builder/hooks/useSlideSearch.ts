import { useState, useMemo } from 'react'
import { useRegistry, SlideEntry } from '../context/RegistryContext'

export function useSlideSearch() {
  const { slides, searchSlides } = useRegistry()
  const [query, setQuery] = useState('')
  const [projectFilter, setProjectFilter] = useState<string | null>(null)

  // Single search pass — both results and counts derive from this
  const searchResults = useMemo<SlideEntry[]>(
    () => (query ? searchSlides(query) : slides),
    [query, slides, searchSlides],
  )

  const results = useMemo(
    () => (projectFilter ? searchResults.filter(s => s.project === projectFilter) : searchResults),
    [searchResults, projectFilter],
  )

  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const s of searchResults) {
      counts[s.project] = (counts[s.project] || 0) + 1
    }
    return counts
  }, [searchResults])

  return {
    query,
    setQuery,
    projectFilter,
    setProjectFilter,
    results,
    resultCount: results.length,
    projectCounts,
  }
}
