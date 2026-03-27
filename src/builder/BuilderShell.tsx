import { Routes, Route } from 'react-router-dom'
import { RegistryProvider } from './context/RegistryContext'
import { MyDeckProvider } from './context/MyDeckContext'
import { DeletedSlidesProvider } from './context/DeletedSlidesContext'
import { ThemeProvider } from './context/ThemeContext'
import BuilderLayout from './components/BuilderLayout'
import SlidePreview from './pages/SlidePreview'
import MyDeck from './pages/MyDeck'
import AboutPage from './pages/AboutPage'

// Builder-specific styles — only loaded when builder is accessed
import './styles/global.css'
import '../design-system/theme.css'
import './styles/builder.css'

export default function BuilderShell() {
  return (
    <ThemeProvider>
      <RegistryProvider>
        <MyDeckProvider>
          <DeletedSlidesProvider>
            <Routes>
              <Route element={<BuilderLayout />}>
                <Route index element={<></>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/my-slides" element={<MyDeck />} />
                <Route path="/:codeName" element={<SlidePreview />} />
              </Route>
            </Routes>
          </DeletedSlidesProvider>
        </MyDeckProvider>
      </RegistryProvider>
    </ThemeProvider>
  )
}
