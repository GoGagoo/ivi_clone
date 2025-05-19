import App from '@app/App'
import { makeServer } from '@mocks/mirageServer'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from './app/providers/StoreProvider'
import './globals.css'

if (process.env.NODE_ENV === 'development') makeServer()

createRoot(document.getElementById('root')!).render(
	<StoreProvider>
		<StrictMode>
			<App />
		</StrictMode>
	</StoreProvider>
)
