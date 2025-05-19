import type { SearchResponse } from '@entities/watch-page/types/content'
import type { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { EndpointBuilder } from '@reduxjs/toolkit/query'

export const searchEndpoints = (
	builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	getSearchedContent: builder.query<SearchResponse, string>({
		query: (title: string) => `api/search?title=${encodeURIComponent(title)}`,
	}),
})