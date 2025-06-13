import { moviesEndpoints } from '@entities/movies/model/api/movies-previews'
import { serialsPreviewsEndpoints } from '@entities/serials/model/api/serials-previews'
import { watchEndpoints } from '@entities/watch-page/model/api/watch'
import { allCollectionsEndpoints } from '@features/home-collections/model/api/endpoints/all-collections'
import { carouselPreviewsEndpoints } from '@features/home-collections/model/api/endpoints/carousel-previews'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@shared/api/firebase/auth/constants'
import { certificatesEndpoints } from '@widgets/Dialogs/CertificationDialog/model/api/certificates'
import { searchEndpoints } from '@widgets/Dialogs/SearchContentDialog/model/api/search'
import { subscriptionsEndpoints } from '@widgets/Dialogs/SubscriptionDialog/model/api/subscriptions'
import { filteredCollectionsEndpoints } from '@entities/filtered-collection/model/api/filtered-collections'

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
		...allCollectionsEndpoints(builder),
		...carouselPreviewsEndpoints(builder),
		...certificatesEndpoints(builder),
		...filteredCollectionsEndpoints(builder),
		...moviesEndpoints(builder),
		...serialsPreviewsEndpoints(builder),
		...searchEndpoints(builder),
		...subscriptionsEndpoints(builder),
		...watchEndpoints(builder),
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
