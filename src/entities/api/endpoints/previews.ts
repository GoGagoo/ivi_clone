import type { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { EndpointBuilder } from '@reduxjs/toolkit/query'
import type { CarouselPreview } from '../../previews/types/carousel'
import type { MovieCategory, SerialCategory } from '../../previews/types/categories'

export const previewsEndpoints = (
	builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	getMoviesPreviews: builder.query<MovieCategory[], void>({
		query: () => '/api/movies',
	}),
	getSerialsPreviews: builder.query<SerialCategory[], void>({
		query: () => '/api/serials',
	}),
	getCarouselPreviews: builder.query<CarouselPreview[], void>({
		query: () => '/api/',
		transformResponse: (response: { carouselPreviews: CarouselPreview[] }) =>
			response.carouselPreviews,
	}),
})