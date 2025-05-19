import type { CollectionsResponse, FilterParams } from '@entities/watch-page/types/content'
import type { HomeSliderPreview } from '@entities/previews/types/home-slider'
import type { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const collectionsEndpoints = (
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
	}),
	getFilteredCollections: builder.query<CollectionsResponse, FilterParams>({
      query: (params) => ({
        url: '/api/collections',
        params: {
          ...(params.genre && { genre: params.genre }),
          ...(params.country && { country: params.country }),
          ...(params.year && { year: params.year })
        }
      }),
    })
})