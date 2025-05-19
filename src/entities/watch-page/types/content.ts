import type { homeCarouselLogoKey } from '@features/carousel-content/assets/posters/carousel/logos'
import type { homeCarouselPosterKey } from '@features/carousel-content/assets/posters/carousel/posters'

export interface ContentItem {
	id: number
	title: string
	urlTitle: string
	genre: string
	rating: number
	largeDescription: string
	actors?: string[]
	year: string
	restrict: number
	isSubscribeContent: boolean
	tags: string[]
	urlTags: string[]
	logo: homeCarouselLogoKey
	posterKey: homeCarouselPosterKey
}

export interface FilterParams {
  genre?: string
  country?: string
  year?: string
}

export interface CollectionsResponse {
  [x: string]: any
  items: ContentItem[]
}

export interface SearchContentItem {
	id: string
	title: string
	urlTitle: string
}

export interface SearchResponse {
	items: SearchContentItem[]
}