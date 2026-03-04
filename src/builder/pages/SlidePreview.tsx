import { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, Copy, FolderOpen, Layout, Tag } from 'lucide-react'
import { ease } from '../config/motion'
import { useRegistry } from '../context/RegistryContext'
import { useDeletedSlides } from '../context/DeletedSlidesContext'
import { useTheme } from '../context/ThemeContext'
import SlideIframe from '../components/shared/SlideIframe'
import Badge from '../components/shared/Badge'
import CopyButton from '../components/shared/CopyButton'

export default function SlidePreview() {
  const { codeName } = useParams<{ codeName: string }>()
  const { slides, getByCodeName } = useRegistry()
  const { isDeleted } = useDeletedSlides()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const slide = codeName ? getByCodeName(codeName) : undefined

  const { prev, next } = useMemo(() => {
    const visible = slides.filter(s => !isDeleted(s.codeName))
    const idx = visible.findIndex(s => s.codeName === codeName)
    return {
      prev: idx > 0 ? visible[idx - 1] : undefined,
      next: idx < visible.length - 1 ? visible[idx + 1] : undefined,
    }
  }, [slides, codeName, isDeleted])

  if (!slide) {
    return (
      <div className="detail-container">
        <div className="empty-state py-20">
          <p className="text-lg mb-4">Slide not found</p>
          <Link to="/" className="text-ddn-red text-sm hover:underline">
            Back to browse
          </Link>
        </div>
      </div>
    )
  }

  const claudePrompt = `I want the "${slide.codeName}" slide with title "YOUR TITLE", subtitle "YOUR SUBTITLE"`

  return (
    <div className="detail-container">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to browse</span>
        </Link>
      </motion.div>

      <div className="detail-layout">
        {/* Left: Large Preview + Nav Arrows */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ease.out }}
        >
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-border-default bg-sunken">
              <SlideIframe
                previewUrl={slide.previewUrl}
                title={slide.title}
                theme={theme}
              />
            </div>

            {/* Prev / Next arrows */}
            {prev && (
              <button
                onClick={() => navigate(`/${prev.codeName}`)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-surface border border-border-default flex items-center justify-center text-tertiary hover:text-primary hover:border-border-hover hover:shadow-md transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {next && (
              <button
                onClick={() => navigate(`/${next.codeName}`)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-surface border border-border-default flex items-center justify-center text-tertiary hover:text-primary hover:border-border-hover hover:shadow-md transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Right: Metadata Sidebar */}
        <motion.aside
          className="slide-detail-sidebar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: ease.out }}
        >
          {/* Code Name + Badge */}
          <div className="slide-detail-section">
            <Badge project={slide.project} />
            <h2 className="slide-detail-codename">{slide.codeName}</h2>
            <p className="slide-detail-description">{slide.description}</p>
          </div>

          <div className="slide-detail-divider" />

          {/* Quick Copy Actions */}
          <div className="slide-detail-section">
            <CopyButton text={slide.codeName} label="Copy code name" />
            <CopyButton text={claudePrompt} label="Copy Claude prompt" />
          </div>

          <div className="slide-detail-divider" />

          {/* Metadata */}
          <div className="slide-detail-section slide-detail-meta">
            <div className="slide-detail-meta-row">
              <FolderOpen size={13} />
              <span className="slide-detail-meta-label">Section</span>
              <span className="slide-detail-meta-value">{slide.section}</span>
            </div>
            <div className="slide-detail-meta-row">
              <Layout size={13} />
              <span className="slide-detail-meta-label">Layout</span>
              <span className="slide-detail-meta-value">{slide.layout}</span>
            </div>
            <div className="slide-detail-meta-row" style={{ alignItems: 'flex-start' }}>
              <Tag size={13} style={{ marginTop: 2 }} />
              <span className="slide-detail-meta-label">Tags</span>
              <div className="flex flex-wrap gap-1">
                {slide.tags.map(tag => (
                  <span key={tag} className="slide-detail-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="slide-detail-divider" />

          {/* Source ref */}
          <div className="slide-detail-section">
            <p className="slide-detail-source">{slide.sourceRef}</p>
          </div>
        </motion.aside>
      </div>
    </div>
  )
}
