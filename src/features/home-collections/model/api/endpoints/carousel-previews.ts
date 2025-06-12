import type { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { EndpointBuilder } from '@reduxjs/toolkit/query'
import type { CarouselPreview } from '@entities/previews/model/types/carousel'

export const carouselPreviewsEndpoints = (
	builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	getCarouselPreviews: builder.query<CarouselPreview[], void>({
		query: () => '/api/',
		transformResponse: (response: { carouselPreviews: CarouselPreview[] }) =>
			response.carouselPreviews,
	}),
})