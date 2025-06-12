import { useGetFilteredCollectionsQuery } from '@/shared/api/rtkQuery'
import transformToCategoryItems from '@entities/previews/model/types/categories'
import { CategoryList } from '@features/category-content/shared/ui/CategoryList'
import {
	homeSliderPosters,
	type homeCollectionsPosterKey,
} from '@features/home-collections/assets/home-posters'
import { useSearchParams } from 'react-router-dom'
import { NotFound } from './NotFound'

export const CollectionPage = () => {
	const [searchParams] = useSearchParams()

	const genre = searchParams.get('genre') || undefined
	const country = searchParams.get('country') || undefined
	const year = searchParams.get('year') || undefined

	const { data: collections, isLoading } = useGetFilteredCollectionsQuery({
		genre,
		country,
		year,
	})

	if (isLoading) return <p>Загрузка...</p>
	if (!collections?.items?.length) return <NotFound />

	return (
		<div>
			<ul>
				{collections.items.map((item, index) => (
					<CategoryList
						key={`${item.id}-${index}`}
						data={transformToCategoryItems([
							{
								...item,
								posterKey: item.posterKey as homeCollectionsPosterKey, // явное приведение типа
							},
						])}
						variant='home'
						covers={homeSliderPosters}
					/>
				))}
			</ul>
		</div>
	)
}
