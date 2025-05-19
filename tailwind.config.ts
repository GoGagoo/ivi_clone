import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['iviSansBase', 'sans-serif'],
		},
		extend: {
			colors: {
				'primary-color': 'var(--primary-color)',
				'secondary-color': 'var(--secondary-color)',
				'hover-secondary-color': 'var(--hover-primary-color)',
				'subscribe-text': 'var(--subscribe-text)',
			},
		},
	},
	plugins: [],
}

export default config
