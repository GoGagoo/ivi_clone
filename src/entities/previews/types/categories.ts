import type { homeCollectionsPosterKey } from '@features/home-collections/assets/home-posters'
import type { moviesCategoryPosterKey } from '@features/category-content/assets/movies-covers'
import type { serialsCategoryPosterKey } from '@features/category-content/assets/serials-covers'

export interface MovieCategory {
	id: number
	title: string
	posterKey: moviesCategoryPosterKey
	link: string
}

export interface SerialCategory {
	id: number
	title: string
	posterKey: serialsCategoryPosterKey
	link: string
}

export interface ICategoryItem {
	id: number
	title: string
	urlTitle: string
	genre: string
	urlGenre: string,
	rating: number
	year: number
	timing: string
	country: string
	urlCountry: string
	restrict: number
	isSubscribeContent: boolean
	posterKey: homeCollectionsPosterKey
	link?: string
}

const transformToCategoryItems = (data: any[]): ICategoryItem[] => {
	return data.map((item) => ({
		id: item.id,
		title: item.title,
		urlTitle: item.urlTitle || item.title.toLowerCase().replace(/\s+/g, '-'),
		genre: item.genre || '',
		urlGenre: item.urlGenre || '',
		rating: item.rating || 0,
		actors: item.actors || [],
		year: item.year || 0,
		timing: item.timing || '',
		country: item.country || '',
		urlCountry: item.urlCountry || '',
		restrict: item.restrict || 0,
		isSubscribeContent: item.isSubscribeContent || false,
		tags: item.tags || [],
		urlTags: item.urlTags || '',
		logo: item.logo || '',
		posterKey: item.posterKey,
		description: item.description,
		link: item.link,
	}))
}

export default transformToCategoryItems