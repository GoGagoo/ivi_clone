import type { ICategoryItem } from '@entities/previews/types/categories'
import { useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useHorizontalScroll } from '../lib/hooks/useHorizontalScroll'
import { CategoryItem, type CardVariant } from './CategoryItem'

interface Props {
  data: ICategoryItem[]
  covers: Record<string, string>
  variant?: CardVariant
  title?: string
}

export const CategoryList = ({
  data,
  covers,
  title,
  variant = 'category',
}: Props) => {
  const { scrollRef, showLeft, showRight, scroll, checkScroll } =
    useHorizontalScroll()

  useEffect(() => {
    if (data) setTimeout(checkScroll, 0)
  }, [data, checkScroll])

  return (
    <div className="relative">
      {title && <h1 className="text-2xl sm:text-3xl font-bold mt-5">{title}</h1>}
      <div className="relative flex items-center group">
        {showLeft && (
					<button
						onClick={() => scroll('left')}
						className="absolute left-0 z-10 h-full w-12 flex items-center justify-center transition-opacity opacity-80 hover:opacity-100"
					>
						<div className="bg-[var(--primary-bg-color)] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all">
							<FaChevronLeft size={20} className="text-white" />
						</div>
					</button>
				)}

        <div
          ref={scrollRef}
          className={`flex mt-5 overflow-x-auto scroll-smooth px-4 py-2 scrollbar-hide ${
            variant === 'category' ? 'gap-2.5' : 'gap-5 md:gap-4'
          }`}
        >
          {data.map((item) => (
            <CategoryItem
              key={item.id}
              item={item}
              variant={variant}
              covers={covers}
            />
          ))}
        </div>

        {showRight && (
					<button
						onClick={() => scroll('right')}
						className="absolute right-0 z-10 h-full w-12 flex items-center justify-center transition-opacity opacity-80 hover:opacity-100"
					>
						<div className="bg-[var(--primary-bg-color)] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all">
							<FaChevronRight size={20} className="text-white" />
						</div>
					</button>
				)}
      </div>
    </div>
  )
}