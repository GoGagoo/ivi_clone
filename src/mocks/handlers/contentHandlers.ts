import type { ContentItem } from '@entities/watch-page/types/content'
import { Response } from 'miragejs'
import mockMoviesPreviews from '../data/category-previews-data/mockMoviesPreviews.json' assert { type: 'json' }
import mockSerialsPreviews from '../data/category-previews-data/mockSerialsPreviews.json' assert { type: 'json' }
import mockCarouselPreviews from '../data/mockCarouselPreviews.json' assert { type: 'json' }
import mockContentOverview from '../data/mockContentOverview.json' assert { type: 'json' }
import mockSliderPreviews from '../data/mockHomeSliderPreviews.json' assert { type: 'json' }

export function getWatchHandler(schema: any, request: any) {
	const slug = request.params.slug
	const content = (
		mockContentOverview.contentOverview as unknown as ContentItem[]
	).find((item) => item.urlTitle === slug)

	if (!content) {
		return new Response(
			404,
			{},
			{
				errors: ['Content not found'],
			}
		)
	}

	return content
}

export function getHomeHandler() {
	return {
		carouselPreviews: mockCarouselPreviews.carouselPreviews,
		collections: mockSliderPreviews.collections,
	}
}

export function getCollectionsHandler(schema: any, request: any) {
	const { genre, country, year } = request.queryParams

	const allCollection = mockSliderPreviews.collections.flatMap(
		(collectionObj) =>
			Object.values(collectionObj).flatMap((collection) =>
				Array.isArray(collection.items) ? collection.items : []
			)
	)

	const filteredItems = allCollection.filter((item) => {
		const matchCountry =
			!country ||
			(country === 'foreign'
				? item.urlCountry !== 'ru'
				: item.urlCountry === country)
		const matchGenre = !genre || item.urlGenre === genre
		const matchYear = !year || String(item.year) === year

		return matchGenre && matchCountry && matchYear
	})

	return {
		items: filteredItems,
	}
}

export function getMoviesHandler() {
	return mockMoviesPreviews.moviesPreview
}

export function getSerialsHandler() {
	return mockSerialsPreviews.serialsPreview
}
