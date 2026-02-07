import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { RegistryProvider } from './builder/context/RegistryContext'
import { MyDeckProvider } from './builder/context/MyDeckContext'
import { DeletedSlidesProvider } from './builder/context/DeletedSlidesContext'
import BuilderLayout from './builder/components/BuilderLayout'
import AllSlidesBrowser from './builder/pages/AllSlidesBrowser'
import SlidePreview from './builder/pages/SlidePreview'
import MyDeck from './builder/pages/MyDeck'
import AboutPage from './builder/pages/AboutPage'

const ExascalerEntry = lazy(() => import('./decks/exascaler/Entry'))
const StrategyEntry = lazy(() => import('./decks/strategy/Entry'))
const TomerEntry = lazy(() => import('./decks/tomer/Entry'))
const TemplateEntry = lazy(() => import('./decks/template/Entry'))
const DesignSystemPage = lazy(() => import('./shared/pages/DesignSystemPage'))

function RenderFallback() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      color: '#666',
      fontFamily: 'system-ui',
    }}>
      Loading...
    </div>
  )
}

export default function App() {
  const location = useLocation()

  // Render routes: no builder chrome, just the presentation
  if (location.pathname.startsWith('/render/')) {
    return (
      <Suspense fallback={<RenderFallback />}>
        <Routes>
          <Route path="/render/exascaler" element={<ExascalerEntry />} />
          <Route path="/render/strategy" element={<StrategyEntry />} />
          <Route path="/render/tomer" element={<TomerEntry />} />
          <Route path="/render/template" element={<TemplateEntry />} />
        </Routes>
      </Suspense>
    )
  }

  // Design system page: standalone, no builder chrome
  if (location.pathname === '/design-system') {
    return (
      <Suspense fallback={<RenderFallback />}>
        <DesignSystemPage />
      </Suspense>
    )
  }

  // Builder routes: full UI with nav, layout, contexts
  return (
    <RegistryProvider>
      <MyDeckProvider>
        <DeletedSlidesProvider>
          <Routes>
            <Route element={<BuilderLayout />}>
              <Route path="/" element={<AllSlidesBrowser />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/my-slides" element={<MyDeck />} />
              <Route path="/:codeName" element={<SlidePreview />} />
            </Route>
          </Routes>
        </DeletedSlidesProvider>
      </MyDeckProvider>
    </RegistryProvider>
  )
}
