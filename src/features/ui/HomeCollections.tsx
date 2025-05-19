import { useState } from 'react'
import { useGetAllCollectionsQuery } from '@entities/api/rtkQuery'
import type { ICategoryItem } from '@entities/previews/types/categories'
import { CategoryList } from '../category-content/shared/ui/CategoryList'
import { homeSliderPosters } from '../home-collections/assets/home-posters'
import { IoChevronForward } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { Button } from '@shared/uikit'

const INITIAL_COUNT = 2
const LOAD_MORE_COUNT = 2

export const HomeCollections = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const { data: collections, isLoading } = useGetAllCollectionsQuery()

  if (isLoading) return <p>Загрузка...</p>
  if (!collections) return <p>No data</p>

  const collectionEntries = Object.entries(collections)
  const visibleCollections = collectionEntries.slice(0, visibleCount)

  const transformCollectionItems = (items: any[]): ICategoryItem[] => {
    return items.map(item => ({	
      id: item.id,
      title: item.title,
      urlTitle: item.urlTitle || item.title.toLowerCase().replace(/\s+/g, '-'),
      genre: item.genre || '',
      urlGenre: item.urlGenre || '',
      rating: item.rating || 0,
      actors: item.actors || [],
      year: item.year || 0,
      timing: item.timing || '',
      country: item.country || '',
      urlCountry: item.urlCountry || '',
      restrict: item.restrict || 0,
      isSubscribeContent: item.isSubscribeContent || false,
      tags: item.tags || [],
      urlTags: item.urlTags || '',
      logo: item.logo || '',
      posterKey: item.posterKey,
      description: item.description,
      link: item.link
    }))
  }

  const handleLoadMoreItems = () => setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, collectionEntries.length))

  return (
    <div className='flex flex-col'>
      <div>
        {visibleCollections.map(([key, collection]) => (
          <section key={key}>
            <Link to={`/collections/${collection.urlTitle}`}>
              <h1 className='text-2xl md:text-3xl font-bold mt-5 group inline-flex items-center max-w-full hover:text-slate-100'>
                <span className='truncate'>{collection.title}</span>
                <IoChevronForward className='flex-shrink-0 ml-2' />
              </h1>
            </Link>
            <CategoryList
              data={transformCollectionItems(collection.items)}
              variant='home'
              covers={homeSliderPosters}
            />
          </section>
        ))}
        {visibleCount < collectionEntries.length && (
          <div className='flex justify-center'>
            <Button
              onClick={handleLoadMoreItems}
              className='mt-6 px-3 py-1 md:px-6 md:py-2 bg-[var(--bg-color)] text-[var(--primary-color)] rounded-xl text-sm md:text-lg hover:bg-[var(--hover-primary-color)] transition'
            >
              Показать ещё
            </Button>
        </div>
        )}
      </div>
    </div>
  )
}