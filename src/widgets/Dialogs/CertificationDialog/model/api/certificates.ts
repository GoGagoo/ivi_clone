import type { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { EndpointBuilder } from '@reduxjs/toolkit/query'

export const certificatesEndpoints  = (builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, string, 'baseApi'>) => ({
	activateCertificate: builder.mutation<{ success: boolean }, { code: string }>({
		query: (body) => ({
			url: '/api/certificates/activate',
			method: 'POST',
			body
		}),
	}), 
	checkCertificate: builder.query<{ hasCertificate: boolean }, void>({
		query: () => '/api/certificates/check',
	}),
})