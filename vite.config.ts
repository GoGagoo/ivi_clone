import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
      '@': resolve(__dirname, './src'),
      '@app': resolve(__dirname, './src/app'),
      '@entities': resolve(__dirname, './src/entities'),
      '@features': resolve(__dirname, './src/features'),
      '@mocks': resolve(__dirname, './src/mocks'),
      '@shared': resolve(__dirname, './src/shared'),
      '@pages': resolve(__dirname, './src/pages'),
      '@widgets': resolve(__dirname, './src/widgets'),
    },
	},
})
