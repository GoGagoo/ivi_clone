import mockSliderPreviews from '../data/mockHomeSliderPreviews.json' assert { type: 'json' }

export function getSearchHandler(schema: any, request: any) {
	const rawTitle = request.queryParams.title
	const titleQuery =
		typeof rawTitle === 'string' ? rawTitle.toLowerCase().trim() : ''

	if (!titleQuery) return { items: [] }

	const allCollection = mockSliderPreviews.collections.flatMap(
		(collectionObj) =>
			Object.values(collectionObj).flatMap((collection) =>
				Array.isArray(collection.items) ? collection.items : []
			)
	)

	const filtered = allCollection.filter((item) => {
		const title = item.title?.toLowerCase() || ''
		const urlTitle = item.urlTitle?.toLowerCase() || ''
		return title.includes(titleQuery) || urlTitle.includes(titleQuery)
	})

	return {
		items: filtered,
	}
}
