/**
 * About Page - MADslides Vision & Architecture
 */

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Hero */}
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">MADslides</h1>
        <p className="text-xl text-secondary leading-relaxed">
          AI-powered slide creation with a curated library, tokenized design system,
          and flexible publishing.
        </p>
      </header>

      {/* Vision */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Vision</h2>
        <p className="text-secondary leading-relaxed mb-4">
          Leverage Claude or Antigravity to create beautiful, consistent slides.
          Start from a template or from scratch. A solid grid system enables bento-like
          displays where slides become canvases for components and content cards.
        </p>
      </section>

      {/* Workflow */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Workflow</h2>
        <ol className="space-y-4 text-secondary">
          <li className="flex gap-4">
            <span className="text-primary font-mono font-bold">01</span>
            <div>
              <strong className="text-primary">Ignite</strong>
              <p>Open AI on this folder. All installs run automatically - fonts, dependencies,
              everything. The AI opens localhost and you're ready.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-mono font-bold">02</span>
            <div>
              <strong className="text-primary">Browse the Library</strong>
              <p>Curated examples of excellent web slides. Pick the ones that fit your story
              and add them to your deck.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-mono font-bold">03</span>
            <div>
              <strong className="text-primary">Speak with AI</strong>
              <p>Describe modifications in natural language. The AI edits using the tokenized
              design system - ensuring consistency across every change.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-mono font-bold">04</span>
            <div>
              <strong className="text-primary">Expand the Library</strong>
              <p>Need a new diagram type? A unique layout? The AI creates it and adds it
              to the library for future use.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-mono font-bold">05</span>
            <div>
              <strong className="text-primary">Publish</strong>
              <p>Your deck becomes a web app. Toggle between presentation mode and scroll mode
              for different contexts. Share a URL.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* Design Principles */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Design Principles</h2>
        <div className="grid gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
            <h3 className="font-semibold mb-1">Tokenized Everything</h3>
            <p className="text-sm text-secondary">Colors, spacing, typography, motion - all defined as design tokens.
            No hardcoded values. Theme-aware by default.</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
            <h3 className="font-semibold mb-1">Apple Rigor</h3>
            <p className="text-sm text-secondary">Impeccable layouts. Precise spacing. Every pixel intentional.
            The kind of polish that makes interfaces feel inevitable.</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
            <h3 className="font-semibold mb-1">Desktop First, Mobile Ready</h3>
            <p className="text-sm text-secondary">Design on desktop with 16:9 slides. Toggle scroll mode and the same
            content adapts beautifully for mobile publishing.</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
            <h3 className="font-semibold mb-1">Library as Foundation</h3>
            <p className="text-sm text-secondary">The library isn't just examples - it's the source of truth.
            Every new creation enriches it. Quality compounds.</p>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
        <div className="font-mono text-sm text-secondary space-y-2 p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
          <p><span className="text-primary">/src/shared/</span> - Unified design tokens & system</p>
          <p><span className="text-primary">/src/slides/</span> - Library of slide components</p>
          <p><span className="text-primary">/src/builder/</span> - UI for browsing & deck building</p>
          <p><span className="text-primary">/src/data/</span> - Slide registry & metadata</p>
        </div>
      </section>

      {/* Current Focus */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Current Focus</h2>
        <p className="text-secondary leading-relaxed">
          Consolidating and strengthening the Library. These are the best slides selected from
          several decks - now being unified under one tokenized design system with impeccable
          layouts and spacing. Once the foundation is solid, we build the AI editing experience.
        </p>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t" style={{ borderColor: 'var(--border-light)' }}>
        <p className="text-sm text-tertiary">
          This app is a git repo. Clone it, open your AI, and ignite.
        </p>
      </footer>
    </div>
  )
}
