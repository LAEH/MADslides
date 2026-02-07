import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, RotateCcw, Sparkles } from 'lucide-react'
import { ease } from '../config/motion'
import { useSlideSearch } from '../hooks/useSlideSearch'
import { useRegistry } from '../context/RegistryContext'
import { useDeletedSlides } from '../context/DeletedSlidesContext'
import { useMyDeck } from '../context/MyDeckContext'
import { useTheme } from '../context/ThemeContext'
import SearchInput from '../components/shared/SearchInput'
import SlideIframe from '../components/shared/SlideIframe'

export default function AllSlidesBrowser() {
  const { projects } = useRegistry()
  const {
    query,
    setQuery,
    projectFilter,
    setProjectFilter,
    results,
    resultCount,
  } = useSlideSearch()
  const { isDeleted, deleteSlide, restoreSlide, deletedCount } = useDeletedSlides()
  const { theme } = useTheme()
  const { addSlide, deck } = useMyDeck()
  const [deleteMode, setDeleteMode] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)

  // Filter results based on deleted status
  const visibleResults = showDeleted
    ? results.filter(s => isDeleted(s.codeName))
    : results.filter(s => !isDeleted(s.codeName))

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: ease.out }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Library</h1>
            <p className="text-secondary text-sm">
              {visibleResults.length} slides
            </p>
          </div>
          <button
            onClick={() => setDeleteMode(!deleteMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              deleteMode
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'text-tertiary hover:text-secondary hover:bg-hover border border-transparent'
            }`}
          >
            <Trash2 size={16} />
            <span className="hidden sm:block">{deleteMode ? 'Done' : 'Curate'}</span>
          </button>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        className="filter-bar mb-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: ease.out }}
      >
        <SearchInput value={query} onChange={setQuery} />

        <button
          className={`filter-pill ${!projectFilter && !showDeleted ? 'active' : ''}`}
          onClick={() => { setProjectFilter(null); setShowDeleted(false) }}
        >
          All ({resultCount - results.filter(s => isDeleted(s.codeName)).length})
        </button>

        {Object.entries(projects).map(([key, proj]) => (
          <button
            key={key}
            className={`filter-pill ${projectFilter === key && !showDeleted ? 'active' : ''}`}
            onClick={() => { setProjectFilter(projectFilter === key ? null : key); setShowDeleted(false) }}
          >
            {proj.name} ({(results.filter(s => s.project === key && !isDeleted(s.codeName)).length)})
          </button>
        ))}

        {deletedCount > 0 && (
          <button
            className={`filter-pill ${showDeleted ? 'active' : ''}`}
            onClick={() => setShowDeleted(!showDeleted)}
          >
            Deleted ({deletedCount})
          </button>
        )}
      </motion.div>

      {/* Results - flat grid */}
      {visibleResults.length === 0 ? (
        <div className="empty-state py-20">
          <p className="text-lg mb-2">
            {showDeleted ? 'No deleted slides' : 'No slides found'}
          </p>
          <p className="text-sm text-secondary">
            {showDeleted ? 'All slides are visible' : 'Try a different search term or filter'}
          </p>
        </div>
      ) : (
        <motion.div className="minimap-grid" layout>
          <AnimatePresence>
          {visibleResults.map(slide => (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={slide.codeName}
                className="slide-card-wrapper group relative"
            >
              <Link to={`/${slide.codeName}`}>
                <div className="slide-card-minimal">
                  <SlideIframe
                    previewUrl={slide.previewUrl}
                    title={slide.title}
                    staticMode
                    theme={theme}
                  />
                </div>
              </Link>

              {slide.contentTags && slide.contentTags.length > 0 && (
                <div className="slide-card-labels">
                  {slide.contentTags.map(tag => (
                    <span key={tag} className="slide-card-label">{tag}</span>
                  ))}
                </div>
              )}

              {/* Actions Overlay */}
              {!deleteMode && !showDeleted && (
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {/* Add to Deck */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addSlide({
                                codeName: slide.codeName,
                                project: slide.project,
                                title: slide.title,
                                previewUrl: slide.previewUrl,
                                tags: slide.tags
                            })
                        }}
                        className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        title="Add to My Deck"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>

                    {/* AI Context Copy */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const context = `Project: ${slide.project}\nSlide: ${slide.title}\nCodeName: ${slide.codeName}\nFile: ${slide.sourceRef}\n\nI want to modify this slide. Please...`
                            navigator.clipboard.writeText(context)
                            alert("Copied AI Context to Clipboard!")
                        }}
                        className="p-2 rounded-full bg-indigo-500/60 hover:bg-indigo-600/80 text-white/90 hover:text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        title="Copy Context for AI"
                    >
                        <Sparkles size={16} />
                    </button>
                </div>
              )}

              {(deleteMode || showDeleted) && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (showDeleted) {
                      restoreSlide(slide.codeName)
                    } else {
                      deleteSlide(slide.codeName)
                    }
                  }}
                  className={`absolute top-2 right-2 z-20 p-2 rounded-lg transition-all duration-200 ${
                    showDeleted
                      ? 'bg-accent-green text-inverse hover:opacity-90'
                      : 'bg-accent-red text-inverse hover:opacity-90'
                  } shadow-lg`}
                >
                  {showDeleted ? <RotateCcw size={14} /> : <Trash2 size={14} />}
                </button>
              )}
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
