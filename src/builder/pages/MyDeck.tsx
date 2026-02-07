import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid3X3, Trash2, Play, Rows, LayoutGrid, Shuffle, ArrowLeft } from 'lucide-react'
import { useMyDeck } from '../context/MyDeckContext'
import { useTheme } from '../context/ThemeContext'
import { useRegistry } from '../context/RegistryContext'
import Badge from '../components/shared/Badge'
import SlideIframe from '../components/shared/SlideIframe'
import { ease, fadeInUp, stagger } from '../config/motion'

export default function MyDeck() {
  const { 
    deck, 
    isEmpty, 
    removeSlide, 
    viewMode, 
    setViewMode, 
    playerMode, 
    setPlayerMode,
    addRandomSlides,
    clearDeck
  } = useMyDeck()
  
  const { slides } = useRegistry()
  const { theme } = useTheme()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // -- HEADER ACTIONS --
  const renderHeader = () => (
    <motion.div
      className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: ease.out }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{deck.name}</h1>
        <p className="text-secondary text-sm">
          {isEmpty
            ? 'Your personal deck — add slides from the catalog'
            : `${deck.slides.length} slide${deck.slides.length !== 1 ? 's' : ''} in your deck`}
        </p>
      </div>

      {!isEmpty && (
        <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-surface-elevated rounded-lg border border-border-default">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-surface-elevated-hover text-primary shadow-sm' : 'text-tertiary hover:text-secondary'}`}
                    title="Grid View"
                >
                    <LayoutGrid size={18} />
                </button>
                <button
                    onClick={() => setViewMode('player')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'player' ? 'bg-surface-elevated-hover text-primary shadow-sm' : 'text-tertiary hover:text-secondary'}`}
                    title="Player Mode"
                >
                    <Play size={18} />
                </button>
            </div>
            
            <div className="w-px h-8 bg-border-default mx-2" />

            {/* Dev Tools */}
            <button
                onClick={() => addRandomSlides(3, slides)}
                className="p-2 text-tertiary hover:text-primary transition-colors"
                title="Add Random Slides (Dev)"
            >
                <Shuffle size={18} />
            </button>
            <button
                onClick={clearDeck}
                className="p-2 text-tertiary hover:text-danger transition-colors"
                title="Clear Deck"
            >
                <Trash2 size={18} />
            </button>
        </div>
      )}
    </motion.div>
  )

  // -- PLAYER MODE --
  if (viewMode === 'player' && !isEmpty) {
    return (
        <div className="fixed inset-0 z-[200] bg-bg-page flex flex-col">
            {/* Player Toolbar */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-border-light bg-glass-bg backdrop-blur-md z-30">
                <button 
                    onClick={() => setViewMode('grid')}
                    className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="font-medium text-sm">Back to Editor</span>
                </button>

                <div className="flex items-center gap-1 p-1 bg-surface-elevated rounded-full border border-border-default">
                    <button
                        onClick={() => setPlayerMode('slide')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${playerMode === 'slide' ? 'bg-primary text-inverse shadow-sm' : 'text-secondary hover:text-primary'}`}
                    >
                        Presentation
                    </button>
                    <button
                        onClick={() => setPlayerMode('scroll')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${playerMode === 'scroll' ? 'bg-primary text-inverse shadow-sm' : 'text-secondary hover:text-primary'}`}
                    >
                        Scroll Article
                    </button>
                </div>

                <div className="w-24" /> {/* Spacer for balance */}
            </div>

            {/* Viewport */}
            <div className="flex-1 overflow-hidden relative bg-bg-secondary">
                {playerMode === 'slide' ? (
                    // HORIZONTAL SNAP SCROLL (PRESENTATION)
                    <div className="absolute inset-0 overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory">
                         {deck.slides.map((slide, index) => (
                            <div key={slide.id} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-8">
                                <div className="w-full max-w-[177vh] aspect-[16/9] shadow-2xl relative">
                                    <SlideIframe
                                        previewUrl={slide.previewUrl}
                                        title={slide.title}
                                        className="w-full h-full rounded-xl overflow-hidden"
                                        theme={theme}
                                    />
                                    {/* Slide Number */}
                                    <div className="absolute bottom-4 right-6 text-white/50 font-mono text-xs z-20 pointer-events-none">
                                        {index + 1} / {deck.slides.length}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // VERTICAL SCROLL (ARTICLE MODE)
                    <div 
                        ref={scrollContainerRef}
                        className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth"
                    >
                        <div className="max-w-[1000px] mx-auto px-4 py-20 space-y-24">
                            {/* Title Card */}
                             <div className="text-center space-y-6 mb-32">
                                <h1 className="text-6xl font-black tracking-tighter text-gradient-ddn pb-2">
                                    {deck.name}
                                </h1>
                                <p className="text-secondary text-xl font-light">
                                    A curated collection of {deck.slides.length} slides
                                </p>
                            </div>

                            {deck.slides.map((slide, index) => (
                                <motion.div 
                                    key={slide.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.8, ease: ease.out }}
                                    className="space-y-6"
                                >
                                    <div className="aspect-[16/9] w-full shadow-2xl rounded-2xl overflow-hidden border border-border-light bg-surface-card">
                                        <SlideIframe
                                            previewUrl={slide.previewUrl}
                                            title={slide.title}
                                            staticMode // Static in scroll mode for better performance? Or dynamic? Let's keep dynamic for now.
                                            theme={theme}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between px-2">
                                        <div className="flex items-center gap-3">
                                             <span className="text-xs font-mono text-tertiary">0{index + 1}</span>
                                             <h3 className="text-lg font-bold">{slide.title}</h3>
                                        </div>
                                        <Badge project={slide.project} />
                                    </div>
                                </motion.div>
                            ))}

                             {/* Footer */}
                             <div className="pt-32 pb-20 text-center border-t border-border-light mt-32">
                                <p className="text-tertiary text-sm font-mono uppercase tracking-widest">
                                    End of Deck
                                </p>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
  }

  // -- GRID MANAGEMENT MODE --
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      {renderHeader()}

      {isEmpty ? (
        <motion.div
          className="empty-state py-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-hover flex items-center justify-center mb-6">
            <Grid3X3 size={28} className="text-tertiary" />
          </div>
          <p className="text-lg text-secondary mb-2">Your deck is empty</p>
          <p className="text-sm text-tertiary mb-8 max-w-md">
            Browse the slide catalog, copy a code name, and tell Claude Code to render a customized version for your deck.
          </p>
          <div className="flex items-center gap-4">
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ddn-red text-white rounded-xl text-sm font-semibold hover:bg-ddn-red-hover transition-colors"
            >
                <Grid3X3 size={16} />
                Browse Slides
            </Link>
            <button
                onClick={() => addRandomSlides(5, slides)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-elevated text-primary border border-border-default rounded-xl text-sm font-semibold hover:bg-hover transition-colors"
            >
                <Shuffle size={16} />
                I'm Feeling Lucky
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout // Animate layout changes
        >
          <AnimatePresence>
            {deck.slides.map(slide => (
                <motion.div
                key={slide.id}
                layoutId={slide.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-5 space-y-3 relative group"
                >
                <div className="flex items-start justify-between">
                    <div>
                    <h3 className="text-sm font-semibold text-primary line-clamp-1">
                        {slide.title}
                    </h3>
                    <p className="text-xs text-tertiary font-mono mt-1">
                        {slide.project}
                    </p>
                    </div>
                    <button
                        onClick={() => removeSlide(slide.id)}
                        className="p-2 rounded-lg text-tertiary hover:text-danger hover:bg-hover transition-all opacity-0 group-hover:opacity-100"
                        title="Remove"
                    >
                    <Trash2 size={14} />
                    </button>
                </div>

                {/* Preview Thumbnail */}
                <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-bg-subtle border border-border-subtle relative">
                    <SlideIframe
                        previewUrl={slide.previewUrl}
                        title={slide.title}
                        staticMode
                        className="pointer-events-none"
                        theme={theme}
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                     <Badge project={slide.project} />
                     <p className="text-xs text-tertiary font-mono">
                        {new Date(slide.createdAt).toLocaleDateString()}
                    </p>
                </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
