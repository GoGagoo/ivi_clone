import type { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { EndpointBuilder } from '@reduxjs/toolkit/query'
import type { SerialCategory } from '@entities/previews/model/types/categories'

export const serialsPreviewsEndpoints = (
	builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	getSerialsPreviews: builder.query<SerialCategory[], void>({
		query: () => '/api/serials',
	})
})