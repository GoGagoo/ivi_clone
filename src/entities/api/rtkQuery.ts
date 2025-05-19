import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@shared/api/firebase/auth/constants'
import { certificatesEndpoints } from './endpoints/certificates'
import { collectionsEndpoints } from './endpoints/collections'
import { searchEndpoints } from './endpoints/search'
import { subscriptionsEndpoints } from './endpoints/subscriptions'
import { previewsEndpoints } from './endpoints/previews'
import { watchEndpoints } from './endpoints/watch'

const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem('firebaseUserToken')

		if (token) headers.set('Authorization', `Bearer ${token}`)

		return headers
	},
})

export const rtkQuery = createApi({
	reducerPath: 'baseApi',
	baseQuery,
	endpoints: (builder) => ({
		...previewsEndpoints(builder),
		...watchEndpoints(builder),
		...collectionsEndpoints(builder),
		...searchEndpoints(builder),
		...certificatesEndpoints(builder),
		...subscriptionsEndpoints(builder)
	}),
})

export const {
	useActivateCertificateMutation,
	useActivateSubscriptionMutation,
	useCheckCertificateQuery,
	useCheckSubscriptionQuery,
	useGetMoviesPreviewsQuery,
	useGetSerialsPreviewsQuery,
	useGetAllCollectionsQuery,
	useGetSearchedContentQuery,
	useGetFilteredCollectionsQuery,
	useGetCarouselPreviewsQuery,
	useGetContentOverviewQuery,
} = rtkQuery
