import { createServer, Request } from 'miragejs'
import {
	getCertificateCheckHandler,
	postCertificateActivateHandler,
} from './handlers/certificateHandlers'
import {
	getCollectionsHandler,
	getHomeHandler,
	getMoviesHandler,
	getSerialsHandler,
	getWatchHandler,
} from './handlers/contentHandlers'
import { getSearchHandler } from './handlers/searchHandlers'
import {
	getSubscriptionCheckHandler,
	postSubscriptionActivateHandler,
} from './handlers/subscriptionHandlers'

export function makeServer() {
	return createServer({
		routes() {
			this.urlPrefix = window.location.origin
			this.namespace = 'api'

			this.passthrough((req: Request) => {
				const url = new URL(req.url, window.location.origin)
				if (url.pathname.startsWith('/api/')) return false
				return true
			})

			this.get('/movies', getMoviesHandler)
			this.get('/serials', getSerialsHandler)
			this.get('/watch/:slug', getWatchHandler)
			this.get('', getHomeHandler)
			this.get('/collections', getCollectionsHandler)

			this.get('/search', getSearchHandler)

			this.post('/certificates/activate', postCertificateActivateHandler)
			this.get('/certificates/check', getCertificateCheckHandler)

			this.post('/subscriptions/activate', postSubscriptionActivateHandler)
			this.get('/subscriptions/check', getSubscriptionCheckHandler)
		},
	})
}
