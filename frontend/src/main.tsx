import { Suspense, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <Suspense fallback='Loading translations...'>
      <App />
    </Suspense>
  </StrictMode>,
)
