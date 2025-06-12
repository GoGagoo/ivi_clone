import type { HomeSliderPreview } from '@/entities/previews/model/types/home-slider'
import type {
	CollectionsResponse,
	FilterParams,
} from '@entities/watch-page/types/content'
import type { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const filteredCollectionsEndpoints = (
	builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	getFilteredCollections: builder.query<CollectionsResponse, FilterParams>({
		query: (params) => ({
			url: '/api/collections',
			params: {
				...(params.genre && { genre: params.genre }),
				...(params.country && { country: params.country }),
				...(params.year && { year: params.year }),
			},
		}),
	}),
})
