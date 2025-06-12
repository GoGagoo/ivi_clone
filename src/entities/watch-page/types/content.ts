import type { homeCarouselLogoKey } from '@shared/types/carousel'
import type { homeCarouselPosterKey } from '@shared/types/carousel'

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
  items: ContentItem[]
  [key: string]: unknown
}

export interface SearchContentItem {
	id: string
	title: string
	urlTitle: string
}

export interface SearchResponse {
	items: SearchContentItem[]
}