import type { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const subscriptionsEndpoints = (
	builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>
) => ({
	activateSubscription: builder.mutation<
		{ success: boolean },
		{ code: string }
	>({
		query: (body) => ({
			url: '/api/subscriptions/activate',
			method: 'POST',
			body,
		}),
	}),
	checkSubscription: builder.query<{ hasSubscription: boolean }, void>({
		query: () => '/api/subscriptions/check',
	}),
})
