import type { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { EndpointBuilder } from '@reduxjs/toolkit/query'
import type { MovieCategory } from '@entities/previews/model/types/categories'

export const moviesEndpoints = (
	builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	getMoviesPreviews: builder.query<MovieCategory[], void>({
		query: () => '/api/movies',
	})
})