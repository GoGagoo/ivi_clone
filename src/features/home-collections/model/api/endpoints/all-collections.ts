import type { HomeSliderPreview } from '@/entities/previews/model/types/home-slider'
import type {
	CollectionsResponse,
	FilterParams,
} from '@entities/watch-page/types/content'
import type { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const allCollectionsEndpoints = (
	builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	getAllCollections: builder.query<Record<string, HomeSliderPreview>, void>({
		query: () => '/api/',
		transformResponse: (response: {
			collections: Array<Record<string, HomeSliderPreview>>
		}) => {
			const merged: Record<string, HomeSliderPreview> = {}

			for (const obj of response.collections) {
				for (const [key, value] of Object.entries(obj)) {
					merged[key] = value
				}
			}

			return merged
		},
	})
})
