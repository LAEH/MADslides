/**
 * Design System Reference
 * Clean, GitHub/Apple-inspired documentation
 * Access at: /design-system
 */

import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { COLORS, ACCENT, DARK, LIGHT, TINTS, ANIMATION, SPACING, alpha } from '../lib/design/tokens'
import '../../shared/design-tokens.css'

type ThemeMode = 'light' | 'dark'

// Copy hook
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1500)
  }
  return { copied, copy }
}

// Theme toggle
function ThemeToggle({ theme, setTheme }: { theme: ThemeMode; setTheme: (t: ThemeMode) => void }) {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
      style={{
        background: 'var(--bg-elevated)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-light)',
      }}
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}

// Elevated card with shadow
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl p-4 ${className}`}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {children}
    </div>
  )
}

// Card header
function CardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-3 pb-2" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      {description && <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{description}</p>}
    </div>
  )
}

// Compact color swatch
function ColorSwatch({ color, name }: { color: string; name: string }) {
  const { copy, copied } = useCopy()
  return (
    <div
      className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded cursor-pointer transition-colors"
      style={{ background: copied === color ? 'var(--bg-selected)' : 'transparent' }}
      onClick={() => copy(color)}
    >
      <div
        className="w-6 h-6 rounded shrink-0"
        style={{ background: color, border: '1px solid var(--border-light)' }}
      />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium block truncate" style={{ color: 'var(--text-primary)' }}>{name}</span>
        <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>{color}</code>
      </div>
      {copied === color && <Check size={12} style={{ color: 'var(--status-success)' }} className="shrink-0" />}
    </div>
  )
}

// CSS Variable swatch
function CSSVarSwatch({ varName, label }: { varName: string; label: string }) {
  const { copy, copied } = useCopy()
  return (
    <div
      className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded cursor-pointer transition-colors"
      onClick={() => copy(`var(${varName})`)}
    >
      <div
        className="w-6 h-6 rounded shrink-0"
        style={{ background: `var(${varName})`, border: '1px solid var(--border-light)' }}
      />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium block truncate" style={{ color: 'var(--text-primary)' }}>{label}</span>
        <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>{varName}</code>
      </div>
      {copied === `var(${varName})` && <Check size={12} style={{ color: 'var(--status-success)' }} className="shrink-0" />}
    </div>
  )
}

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<ThemeMode>('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    return () => document.documentElement.removeAttribute('data-theme')
  }, [theme])

  const T = theme === 'dark' ? DARK : LIGHT

  return (
    <div
      className="h-screen w-screen overflow-hidden flex"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)'
          : 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
      }}
    >
      {/* Sidebar */}
      <nav
        className="w-48 shrink-0 h-full overflow-y-auto"
        style={{
          background: theme === 'dark' ? 'rgba(20, 20, 20, 0.9)' : 'rgba(255, 255, 255, 0.8)',
          borderRight: '1px solid var(--border-light)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="p-3" style={{ borderBottom: '1px solid var(--border-light)' }}>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full"
              style={{ background: theme === 'dark' ? '#ffffff' : '#000000' }}
            />
            <div>
              <div className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>Design System</div>
              <div className="text-2xs" style={{ color: 'var(--text-muted)' }}>DDN Slides</div>
            </div>
          </div>
        </div>

        <div className="p-2" style={{ borderBottom: '1px solid var(--border-light)' }}>
          <div className="flex items-center justify-center px-2 py-1.5 rounded-md" style={{ background: 'var(--bg-tertiary)' }}>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>

        <div className="p-1.5">
          {[
            { id: 'colors', label: 'Colors' },
            { id: 'project', label: 'Project Colors' },
            { id: 'surfaces', label: 'Surfaces' },
            { id: 'text', label: 'Text' },
            { id: 'borders', label: 'Borders' },
            { id: 'tints', label: 'Tints' },
            { id: 'helpers', label: 'Helpers' },
            { id: 'spacing', label: 'Spacing' },
            { id: 'animation', label: 'Animation' },
            { id: 'usage', label: 'Usage' },
          ].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="block px-2.5 py-1.5 text-xs rounded-md transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="p-1.5 mt-auto" style={{ borderTop: '1px solid var(--border-light)' }}>
          <a href="/" className="block px-2.5 py-1.5 text-xs rounded-md transition-colors" style={{ color: 'var(--text-muted)' }}>
            ← Back to Slides
          </a>
        </div>
      </nav>

      {/* Main - Multi-column grid */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Design System</h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Visual tokens and components for DDN Slides</p>
          </div>

          {/* Multi-column grid */}
          <div className="grid grid-cols-3 gap-4">

            {/* ═══════════ COLORS SECTION ═══════════ */}
            <div className="col-span-3 mt-2 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="colors" style={{ color: 'var(--text-secondary)' }}>Brand Colors</h2>
            </div>

            {/* DDN / NVIDIA Brand Colors */}
            <Card>
              <CardHeader title="Brand Colors" description="Primary brand palette" />
              <div className="space-y-0.5">
                <ColorSwatch color={COLORS.ddn.red} name="DDN Red" />
                <ColorSwatch color={COLORS.ddn.redLight} name="DDN Red Light" />
                <ColorSwatch color={COLORS.nvidia.green} name="NVIDIA Green" />
                <ColorSwatch color={COLORS.nvidia.greenLight} name="NVIDIA Green Light" />
                <ColorSwatch color={COLORS.partner.supermicro} name="Supermicro" />
                <ColorSwatch color={COLORS.partner.aws} name="AWS Orange" />
              </div>
            </Card>

            {/* Accent Palette */}
            <Card className="col-span-2">
              <CardHeader title="Accent Palette" description="10 colors × light/dark — Apple HIG-inspired" />
              <div className="space-y-1">
                {(Object.keys(ACCENT) as (keyof typeof ACCENT)[]).map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 py-1 px-2 -mx-2 rounded transition-colors"
                  >
                    <span className="text-xs font-medium w-14 capitalize" style={{ color: 'var(--text-primary)' }}>{name}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-5 rounded" style={{ background: ACCENT[name].light, border: '1px solid var(--border-light)' }} />
                      <code className="text-2xs font-mono w-16" style={{ color: 'var(--text-muted)' }}>{ACCENT[name].light}</code>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-5 rounded" style={{ background: ACCENT[name].dark, border: '1px solid var(--border-light)' }} />
                      <code className="text-2xs font-mono w-16" style={{ color: 'var(--text-muted)' }}>{ACCENT[name].dark}</code>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* ═══════════ PROJECT COLORS SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="project" style={{ color: 'var(--text-secondary)' }}>Project Colors</h2>
            </div>

            {/* Project Colors */}
            <Card>
              <CardHeader title="Deck Identification" description="Color per deck type" />
              <div className="space-y-0.5">
                <ColorSwatch color={COLORS.project.exascaler} name="EXAScaler" />
                <ColorSwatch color={COLORS.project.strategy} name="Strategy" />
                <ColorSwatch color={COLORS.project.tomer} name="Tomer" />
                <ColorSwatch color={COLORS.project.template} name="Template" />
              </div>
            </Card>

            {/* Status Colors */}
            <Card>
              <CardHeader title="Status Colors" description="Feedback & state" />
              <div className="space-y-0.5">
                <ColorSwatch color={COLORS.status.success} name="Success" />
                <ColorSwatch color={COLORS.status.warning} name="Warning" />
                <ColorSwatch color={COLORS.status.error} name="Error" />
                <ColorSwatch color={COLORS.status.info} name="Info" />
              </div>
            </Card>

            {/* Chart Colors */}
            <Card>
              <CardHeader title="Chart Palette" description="10-color sequence" />
              <div className="space-y-1">
                {COLORS.chart.slice(0, 6).map((color, i) => (
                  <div key={i} className="flex items-center gap-2 py-0.5">
                    <div className="w-8 h-4 rounded" style={{ background: color }} />
                    <span className="text-2xs font-mono" style={{ color: 'var(--text-muted)' }}>[{i}]</span>
                    <code className="text-2xs" style={{ color: 'var(--text-secondary)' }}>{color}</code>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-light)' }}>
                <p className="text-2xs mb-2" style={{ color: 'var(--text-muted)' }}>Stacked preview</p>
                <div className="flex h-4 rounded overflow-hidden">
                  {COLORS.chart.map((color, i) => (
                    <div key={i} className="flex-1" style={{ background: color }} />
                  ))}
                </div>
              </div>
            </Card>

            {/* ═══════════ SURFACES SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="surfaces" style={{ color: 'var(--text-secondary)' }}>Surfaces (CSS Variables)</h2>
            </div>

            {/* Background Colors */}
            <Card>
              <CardHeader title="Backgrounds" description="Theme-aware surfaces" />
              <div className="space-y-0.5">
                <CSSVarSwatch varName="--bg-primary" label="Primary" />
                <CSSVarSwatch varName="--bg-secondary" label="Secondary" />
                <CSSVarSwatch varName="--bg-tertiary" label="Tertiary" />
                <CSSVarSwatch varName="--bg-card" label="Card" />
                <CSSVarSwatch varName="--bg-elevated" label="Elevated" />
                <CSSVarSwatch varName="--bg-input" label="Input" />
              </div>
            </Card>

            {/* ═══════════ TEXT SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="text" style={{ color: 'var(--text-secondary)' }}>Text Colors</h2>
            </div>

            {/* Text Colors */}
            <Card>
              <CardHeader title="Text Hierarchy" description="Theme-aware text" />
              <div className="space-y-2">
                {[
                  { varName: '--text-primary', label: 'Primary', sample: 'Headlines, titles' },
                  { varName: '--text-secondary', label: 'Secondary', sample: 'Body text, descriptions' },
                  { varName: '--text-tertiary', label: 'Tertiary', sample: 'Supporting text' },
                  { varName: '--text-muted', label: 'Muted', sample: 'Disabled, hints' },
                ].map((t) => (
                  <div key={t.varName} className="py-1">
                    <div className="text-sm font-medium" style={{ color: `var(${t.varName})` }}>{t.sample}</div>
                    <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>{t.varName}</code>
                  </div>
                ))}
              </div>
            </Card>

            {/* Typography Preview */}
            <Card className="col-span-2">
              <CardHeader title="Typography" description="articulat-cf + Geist Mono" />
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Display Heading</div>
                  <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>text-3xl font-bold</code>
                </div>
                <div>
                  <div className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Section Heading</div>
                  <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>text-xl font-semibold</code>
                </div>
                <div>
                  <div className="text-base" style={{ color: 'var(--text-secondary)' }}>Body text for paragraphs and descriptions that provide context.</div>
                  <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>text-base</code>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>Label Text</div>
                  <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>text-xs uppercase tracking-wider font-semibold</code>
                </div>
                <div>
                  <div className="font-mono text-lg tabular-nums" style={{ color: 'var(--text-primary)' }}>1,234,567.89</div>
                  <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>font-mono tabular-nums (metrics)</code>
                </div>
              </div>
            </Card>

            {/* ═══════════ BORDERS SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="borders" style={{ color: 'var(--text-secondary)' }}>Borders</h2>
            </div>

            {/* Border Colors */}
            <Card>
              <CardHeader title="Border Hierarchy" description="Theme-aware borders" />
              <div className="space-y-2">
                {[
                  { varName: '--border-light', label: 'Light' },
                  { varName: '--border-medium', label: 'Medium' },
                  { varName: '--border-strong', label: 'Strong' },
                ].map((b) => (
                  <div key={b.varName} className="flex items-center gap-3">
                    <div
                      className="w-20 h-8 rounded"
                      style={{ border: `2px solid var(${b.varName})`, background: 'var(--bg-card)' }}
                    />
                    <div>
                      <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{b.label}</div>
                      <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>{b.varName}</code>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* ═══════════ TINTS SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="tints" style={{ color: 'var(--text-secondary)' }}>Tints</h2>
            </div>

            {/* Brand Tints */}
            <Card>
              <CardHeader title="Brand Tints" description="bg + text pairs" />
              <div className="space-y-2">
                {Object.entries(TINTS.brand).map(([name, tint]) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{
                      background: theme === 'dark' ? tint.bgDark : tint.bg,
                      color: theme === 'dark' ? tint.textDark : tint.text,
                    }}
                  >
                    <span className="text-xs font-medium capitalize">{name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Project Tints */}
            <Card>
              <CardHeader title="Project Tints" description="Deck identification" />
              <div className="space-y-2">
                {Object.entries(TINTS.project).map(([name, tint]) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{
                      background: theme === 'dark' ? tint.bgDark : tint.bg,
                      color: theme === 'dark' ? tint.textDark : tint.text,
                    }}
                  >
                    <span className="text-xs font-medium capitalize">{name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* ═══════════ HELPERS SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="helpers" style={{ color: 'var(--text-secondary)' }}>Helper Functions</h2>
            </div>

            {/* Helper demos */}
            <Card className="col-span-3">
              <CardHeader title="alpha(), tint(), glow()" description="Programmatic color utilities from tokens.ts" />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs font-medium mb-2" style={{ color: 'var(--text-primary)' }}>alpha(color, opacity)</div>
                  <div className="flex gap-2">
                    {[0.1, 0.3, 0.5, 0.7, 1].map((op) => (
                      <div
                        key={op}
                        className="w-10 h-10 rounded"
                        style={{ background: alpha(COLORS.ddn.red, op) }}
                        title={`alpha('#ED2738', ${op})`}
                      />
                    ))}
                  </div>
                  <code className="text-2xs mt-2 block" style={{ color: 'var(--text-muted)' }}>
                    alpha('#ED2738', 0.1...1)
                  </code>
                </div>
                <div>
                  <div className="text-xs font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Glow Effects</div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded glow-ddn" style={{ background: COLORS.ddn.red }} />
                    <div className="w-10 h-10 rounded glow-nvidia" style={{ background: COLORS.nvidia.green }} />
                    <div className="w-10 h-10 rounded glow-exascaler" style={{ background: COLORS.project.exascaler }} />
                  </div>
                  <code className="text-2xs mt-2 block" style={{ color: 'var(--text-muted)' }}>
                    .glow-ddn / .glow-nvidia / .glow-exascaler
                  </code>
                </div>
                <div>
                  <div className="text-xs font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Glass Morphism</div>
                  <div
                    className="h-16 rounded-lg p-3 glass"
                    style={{ background: 'var(--glass-bg)' }}
                  >
                    <span className="text-xs" style={{ color: 'var(--text-primary)' }}>Glass card content</span>
                  </div>
                  <code className="text-2xs mt-2 block" style={{ color: 'var(--text-muted)' }}>
                    .glass / .glass-subtle / .glass-card
                  </code>
                </div>
              </div>
            </Card>

            {/* ═══════════ SPACING SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="spacing" style={{ color: 'var(--text-secondary)' }}>Spacing & Radius</h2>
            </div>

            {/* Radius */}
            <Card>
              <CardHeader title="Border Radius" description="SPACING.radius" />
              <div className="space-y-2">
                {Object.entries(SPACING.radius).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 shrink-0"
                      style={{
                        background: 'var(--entity-ddn)',
                        borderRadius: value,
                      }}
                    />
                    <div>
                      <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{name}</div>
                      <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>{value}px</code>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* ═══════════ ANIMATION SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="animation" style={{ color: 'var(--text-secondary)' }}>Animation</h2>
            </div>

            {/* Animation tokens */}
            <Card>
              <CardHeader title="Durations" description="ANIMATION.duration" />
              <div className="space-y-1">
                {Object.entries(ANIMATION.duration).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-2 py-1">
                    <code className="text-xs font-mono w-16" style={{ color: 'var(--text-primary)' }}>{name}</code>
                    <code className="text-2xs" style={{ color: 'var(--text-muted)' }}>{value}s</code>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="Easing Curves" description="ANIMATION.ease" />
              <div className="space-y-1">
                {Object.entries(ANIMATION.ease).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-2 py-1">
                    <code className="text-xs font-mono w-16" style={{ color: 'var(--text-primary)' }}>{name}</code>
                    <code className="text-2xs truncate" style={{ color: 'var(--text-muted)' }}>[{value.join(', ')}]</code>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="CSS Animations" description="Utility classes" />
              <div className="space-y-2">
                {[
                  { name: '.animate-fadeInUp', desc: 'Fade in from below' },
                  { name: '.animate-fadeIn', desc: 'Simple fade' },
                  { name: '.animate-scaleIn', desc: 'Scale from 0.96' },
                  { name: '.animate-pulse-soft', desc: 'Gentle pulse' },
                  { name: '.animate-glow-pulse', desc: 'Glowing pulse' },
                ].map((a) => (
                  <div key={a.name} className="py-1">
                    <code className="text-xs" style={{ color: 'var(--text-primary)' }}>{a.name}</code>
                    <div className="text-2xs" style={{ color: 'var(--text-muted)' }}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* ═══════════ USAGE SECTION ═══════════ */}
            <div className="col-span-3 mt-6 mb-1">
              <h2 className="text-sm font-bold uppercase tracking-wider" id="usage" style={{ color: 'var(--text-secondary)' }}>Usage</h2>
            </div>

            <Card className="col-span-3">
              <CardHeader title="Importing Tokens" description="How to use the design system" />
              <pre
                className="p-3 rounded-lg text-2xs font-mono overflow-x-auto"
                style={{ background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5', color: 'var(--text-primary)' }}
              >
{`// CSS Variables (in any CSS file)
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

// TypeScript tokens
import { COLORS, DARK, LIGHT, alpha, tint } from '@/shared/lib/design/tokens';

// Theme-aware usage
const T = theme === 'dark' ? DARK : LIGHT;
const cardBg = T.bg.card;

// Helper functions
const overlay = alpha(COLORS.ddn.red, 0.1);
const badge = tint(COLORS.nvidia.green);`}
              </pre>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}
