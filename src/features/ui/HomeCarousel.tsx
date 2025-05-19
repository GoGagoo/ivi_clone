import { useGetCarouselPreviewsQuery } from '@entities/api/rtkQuery'
import { useCarousel } from '@features/carousel-content/lib/hooks/useCarousel'
import { Button } from '@shared/uikit'
import { useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { homeCarouselLogos } from '../carousel-content/assets/posters/carousel/logos'
import { homeCarouselPosters } from '../carousel-content/assets/posters/carousel/posters'
import { SkeletonCarousel } from '@shared/ui/Skeleton/SkeletonCarousel'

interface Props {
  autoSlide?: boolean
  autoSlideInterval?: number
}

export const HomeCarousel: React.FC<Props> = ({
  autoSlide = true,
  autoSlideInterval = 35000,
}) => {
  const { data: carouselItems, isLoading } = useGetCarouselPreviewsQuery()

  const images = useMemo(
    () =>
      carouselItems?.map(
        (item) =>
          homeCarouselPosters[
            item.posterKey as keyof typeof homeCarouselPosters
          ]
      ) || [],
    [carouselItems]
  )

  const logos = useMemo(
    () =>
      carouselItems?.map(
        (item) => homeCarouselLogos[item.logo as keyof typeof homeCarouselLogos]
      ) || [],
    [carouselItems]
  )

  const { currentIndex, goToNext, goToPrev } = useCarousel(
    images,
    autoSlide,
    autoSlideInterval
  )

  if (isLoading) return <SkeletonCarousel />
  if (!carouselItems?.length) return <div>No data available</div>

  const currentItem = carouselItems[currentIndex]
  const prevIndex = (currentIndex - 1 + images.length) % images.length
  const nextIndex = (currentIndex + 1) % images.length

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative flex items-center justify-center h-[500px]">
        <div className="absolute left-0 w-1/4 h-4/5 z-20 ml-8 rounded-3xl shadow-lg overflow-hidden transform transition-all duration-500">
          <img
            src={images[prevIndex]}
            className="w-full h-full object-cover brightness-50"
            alt="Previous slide"
          />
        </div>

        <button
          className="absolute left-[15%] z-40 p-3 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <FaChevronLeft size={24} className="text-white" />
        </button>

        <div className="relative w-2/3 h-4/5 z-30 rounded-3xl overflow-hidden shadow-xl">
          <Link to={`/watch/${currentItem.urlTitle}`} className="block h-full">
            <img
              src={images[currentIndex]}
              className="w-full h-full object-cover"
              alt={currentItem.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <div className="max-w-md mb-4">
                <img
                  src={logos[currentIndex]}
                  className="max-h-16 object-contain"
                  alt="Logo"
                />
              </div>
              <p className="text-white text-sm md:text-lg mb-4 line-clamp-3">
                {currentItem.description}
              </p>
              <Button className='px-6 py-2 text-lg font-semibold bg-[var(--subscribe-color)] rounded-xl hover:bg-pink-500 hover:scale-105 transform transition duration-300'>
									Смотреть
								</Button>
            </div>
          </Link>
        </div>

        <button
          className="absolute right-[15%] z-40 p-3 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <FaChevronRight size={24} className="text-white" />
        </button>

        <div className="absolute right-0 w-1/4 h-4/5 z-20 mr-8 rounded-3xl shadow-lg overflow-hidden transform transition-all duration-500">
          <img
            src={images[nextIndex]}
            className="w-full h-full object-cover brightness-50"
            alt="Next slide"
          />
        </div>
      </div>
    </div>
  )
}