import { useSearchParams } from 'react-router-dom'
import { Loader } from '@shared/uikit'
import { useGetFilteredCollectionsQuery } from '@entities/api/rtkQuery'
import { CategoryList } from '@features/category-content/shared/ui/CategoryList'
import { homeSliderPosters } from '@features/home-collections/assets/home-posters'
import { NotFound } from './NotFound'
import transformToCategoryItems from '@entities/previews/types/categories'

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
            data={transformToCategoryItems([item])}
            variant='home'
            covers={homeSliderPosters}
          />
        ))}
      </ul>
    </div>
  )
}
