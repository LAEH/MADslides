import { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, Code2, Tag, FolderOpen, Layout } from 'lucide-react'
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

        {/* Right: Metadata Panel */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: ease.out }}
        >
          {/* Code Name */}
          <div className="glass-card p-6 cursor-default">
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={14} className="text-tertiary" />
              <span className="text-xs text-tertiary uppercase tracking-wider font-semibold">
                Code Name
              </span>
            </div>
            <div className="text-2xl font-mono font-bold text-primary mb-4 break-all">
              {slide.codeName}
            </div>
            <CopyButton text={slide.codeName} label="Copy code name" />
          </div>

          {/* Claude Prompt */}
          <div className="glass-card p-6 cursor-default">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-tertiary uppercase tracking-wider font-semibold">
                Claude Prompt
              </span>
            </div>
            <pre className="text-xs text-secondary font-mono leading-relaxed bg-hover rounded-lg p-4 whitespace-pre-wrap mb-4">
              {claudePrompt}
            </pre>
            <CopyButton text={claudePrompt} label="Copy prompt" />
          </div>

          {/* Metadata */}
          <div className="glass-card p-6 space-y-4 cursor-default">
            <div className="flex items-center gap-2">
              <Badge project={slide.project} />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-secondary">
                <FolderOpen size={14} className="text-tertiary shrink-0" />
                <span className="text-tertiary">Section:</span>
                <span className="text-primary">{slide.section}</span>
              </div>
              <div className="flex items-center gap-3 text-secondary">
                <Layout size={14} className="text-tertiary shrink-0" />
                <span className="text-tertiary">Layout:</span>
                <span className="text-primary">{slide.layout}</span>
              </div>
              <div className="flex items-start gap-3 text-secondary">
                <Tag size={14} className="text-tertiary shrink-0 mt-0.5" />
                <span className="text-tertiary">Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {slide.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-hover text-secondary text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border-default">
              <p className="text-xs text-tertiary leading-relaxed">
                {slide.description}
              </p>
            </div>

            <div className="pt-2">
              <p className="text-xs text-tertiary font-mono break-all">
                {slide.sourceRef}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
