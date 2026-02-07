import { Link, useLocation } from 'react-router-dom'
import { Grid3X3, Layers, Trash2, Sun, Moon, Info } from 'lucide-react'
import { useDeletedSlides } from '../context/DeletedSlidesContext'
import { useTheme } from '../context/ThemeContext'

const NAV_ITEMS = [
  { path: '/', label: 'Library', icon: Grid3X3 },
  { path: '/my-slides', label: 'My Deck', icon: Layers },
  { path: '/about', label: 'About', icon: Info },
]

export default function BuilderNav() {
  const location = useLocation()
  const { deletedCount } = useDeletedSlides()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="builder-nav">
      {/* Left: Logo + Title */}
      <Link to="/" className="flex items-center gap-3 mr-auto">
        <div className="w-8 h-8 rounded-full bg-active" />
        <span className="text-primary font-semibold text-sm tracking-tight hidden sm:block">
          Slide Builder
        </span>
      </Link>

      {/* Center: Nav Links */}
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const isActive = path === '/'
            ? !location.pathname.startsWith('/my-slides')
            : location.pathname.startsWith(path)
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-hover text-primary'
                  : 'text-tertiary hover:text-secondary hover:bg-hover'
              }`}
            >
              <Icon size={16} />
              <span className="hidden md:block">{label}</span>
            </Link>
          )
        })}
      </div>

      {/* Right: Theme toggle + Deleted count */}
      <div className="flex items-center gap-3 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-tertiary hover:text-primary hover:bg-hover transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        {deletedCount > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-tertiary font-mono">
            <Trash2 size={12} />
            <span>{deletedCount} hidden</span>
          </div>
        )}
      </div>
    </nav>
  )
}
