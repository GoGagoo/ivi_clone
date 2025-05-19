import { useGetMoviesPreviewsQuery } from '@entities/api/rtkQuery'
import { ContentFilter, ExpandableText } from '@/widgets'
import moviesCategoryCovers from '@features/category-content/assets/movies-covers'
import { CategoryList } from '@features/category-content/shared/ui/CategoryList'
import { Divide } from '@shared/uikit'
import { MoviesCategoryDescription } from '@widgets/CategoryPage/model/category-descriptions/MoviesCategoryDescription'
import { Link } from 'react-router-dom'
import transformToCategoryItems from '@entities/previews/types/categories'

export const MoviesPage = () => {
	const { data: moviesCollections } = useGetMoviesPreviewsQuery()

	return (
		<section>
			<Divide />
			<div className='pt-14 font-bold'>
				<div className='flex'>
					<Link className='group relative w-max' to='/'>
						<span className='font-bold relative z-10 group-hover:text-white'>
							Мой Иви
						</span>
						<span className='absolute left-0 bottom-0 w-full h-0.5 transition-all bg-[var(--primary-bg-color)] dark:bg-[var(--secondary-color)] z-0 group-hover:h-full'></span>
					</Link>
					<span className='mx-1 text-gray-400'>/</span>
					<span className='text-gray-100 dark:text-[var(--secondary-color)]'>
						Фильмы
					</span>
				</div>
				<h1 className='pt-6 text-3xl md:text-[48px] leading-[44px] font-bold'>
					Фильмы смотреть онлайн
				</h1>
				<ExpandableText
					previewContent={<MoviesCategoryDescription preview={true} />}
				>
					<MoviesCategoryDescription preview={false} />
				</ExpandableText>
				
				<ContentFilter />

				<h1 className='pt-6 text-2xl md:text-3xl leading-[44px] font-bold'>
					Фильмы-новинки
				</h1>
				{moviesCollections && (
					<CategoryList
						data={transformToCategoryItems(moviesCollections)}
						covers={moviesCategoryCovers}
						variant='category'
					/>
				)}
			</div>
		</section>
	)
}
