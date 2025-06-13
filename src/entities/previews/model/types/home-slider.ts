import type { homeCollectionsPosterKey } from '@features/home-collections/assets/home-posters'

export interface HomeSliderPreview {
	titleId: number
	title: string
	urlTitle: string
	items: {
		id: number
		title: string
		urlTitle: string
		genre: string
		urlGenre: string
		rating: number
		year: number
		timing: string
		country: string
		urlCountry: string
		restrict: number
		isSubscribeContent: boolean
		posterKey: homeCollectionsPosterKey
	}[]
}
