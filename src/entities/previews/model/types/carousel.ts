import type { homeCarouselLogoKey, homeCarouselPosterKey } from '@shared/types/carousel'
import type { ContentItem } from '@entities/watch-page/types/content'

export interface CarouselPreview extends ContentItem {
	urlTitle: string
	logo: homeCarouselLogoKey
	description: string
	posterKey: homeCarouselPosterKey
}
