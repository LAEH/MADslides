import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import PasswordGate from './components/PasswordGate'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <PasswordGate>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PasswordGate>
    </ErrorBoundary>
  </React.StrictMode>,
)
