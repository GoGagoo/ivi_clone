import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['class'],
	theme: {
		fontFamily: {
			sans: ['iviSansBase', 'sans-serif'],
		},
		extend: {
			colors: {
				primary: 'var(--primary-color)',
				secondary: 'var(--secondary-color)',
				background: 'var(--bg-color)',
				'primary-bg': 'var(--primary-bg-color)',
				'hover-primary': 'var(--hover-primary-color)',

				subscribe: 'var(--subscribe-color)',
				'subscribe-from': 'var(--subscribe-bg-from)',
				'subscribe-to': 'var(--subscribe-bg-to)',
			},
		},
	},
	plugins: [
		require('tailwind-scrollbar-hide')
	],
}

export default config
