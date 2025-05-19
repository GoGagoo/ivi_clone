import type { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { EndpointBuilder } from '@reduxjs/toolkit/query'
import type { ContentItem } from '../../watch-page/types/content'

export const watchEndpoints = (builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	getContentOverview: builder.query<ContentItem, string>({
		query: (slug) => `/api/watch/${slug}`,
	}),
})