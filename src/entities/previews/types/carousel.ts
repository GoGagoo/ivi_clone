import type { homeCarouselLogoKey } from '@features/carousel-content/assets/posters/carousel/logos'
import type { homeCarouselPosterKey } from '@features/carousel-content/assets/posters/carousel/posters'
import type { ContentItem } from '@entities/watch-page/types/content'

export interface CarouselPreview extends ContentItem {
	urlTitle: string
	logo: homeCarouselLogoKey
	description: string
	posterKey: homeCarouselPosterKey
}
