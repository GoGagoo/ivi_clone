import type { moviesCategoryPosterKey } from '@features/category-content/assets/movies-covers'
import type { serialsCategoryPosterKey } from '@shared/assets/images/category/serials-covers'
import type { homeCollectionsPosterKey } from '@features/home-collections/assets/home-posters'

export type AllPosterKeys = 
  | homeCollectionsPosterKey 
  | moviesCategoryPosterKey 
  | serialsCategoryPosterKey

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
	posterKey: AllPosterKeys
	link?: string
}

export interface ICategoryItemInput {
	id: number
	title: string
	urlTitle?: string
	genre?: string
	urlGenre?: string
	rating?: number
	actors?: string[]
	year?: string | number
	timing?: string
	country?: string
	urlCountry?: string
	restrict?: number
	isSubscribeContent?: boolean
	tags?: string[]
	urlTags?: string[]
	logo?: string
	posterKey: AllPosterKeys
	description?: string
	link?: string
}

const transformToCategoryItems = (data: ICategoryItemInput[]): ICategoryItem[] => {
	return data.map((item) => ({
		id: item.id,
		title: item.title,
		urlTitle: item.urlTitle || item.title.toLowerCase().replace(/\s+/g, '-'),
		genre: item.genre || '',
		urlGenre: item.urlGenre || '',
		rating: item.rating || 0,
		year: Number(item.year) || 0,
		timing: item.timing || '',
		country: item.country || '',
		urlCountry: item.urlCountry || '',
		restrict: item.restrict || 0,
		isSubscribeContent: item.isSubscribeContent || false,
		posterKey: item.posterKey,
		link: item.link,
	}))
}

export default transformToCategoryItems