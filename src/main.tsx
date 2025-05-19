import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import './globals.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
// if (import.meta.env.MODE === 'development') makeServer()

// createRoot(document.getElementById('root')!).render(<App />)
