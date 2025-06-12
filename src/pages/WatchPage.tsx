import { useGetContentOverviewQuery } from '@/shared/api/rtkQuery'
import { homeCarouselLogos } from '@features/carousel-content/assets/posters/carousel/logos'
import { homeCarouselPosters } from '@features/carousel-content/assets/posters/carousel/posters'
import { SkeletonWatch } from '@shared/ui/Skeleton/SkeletonWatch'
import { Badge, Button } from '@shared/uikit'
import { Link, useParams } from 'react-router-dom'
import { NotFound } from './NotFound'

export const WatchPage = () => {
	const { slug } = useParams<{ slug: string }>()
	const { data: contentOverview, isLoading } = useGetContentOverviewQuery(slug!)

	if (isLoading) return <SkeletonWatch />
	if (!contentOverview) return <NotFound />

	const poster = homeCarouselPosters[contentOverview.posterKey] ?? ''
	const logo = homeCarouselLogos[contentOverview.logo] ?? ''

	const contentTags = contentOverview.tags

	return (
		<div className='pt-14 font-bold flex flex-col lg:flex-row'>
			<div className='xl:basis-1/3 lg:basis-2/5 w-full lg:w-auto'>
				<div className='flex flex-wrap text-xs md:text-lg gap-x-1'>
					<Link className='group relative w-max' to='/'>
						<span className='font-bold relative z-10 group-hover:text-white'>
							Мой Иви
						</span>
						<span className='absolute left-0 bottom-0 w-full h-0.5 transition-all bg-[var(--primary-bg-color)] dark:bg-[var(--secondary-color)] z-0 group-hover:h-full'></span>
					</Link>
					<span className='mx-1 text-gray-400'>/</span>
					<div className='group relative w-max'>
						<span className='font-bold relative z-10 group-hover:text-white'>
							{contentOverview.genre}
						</span>
						<span className='absolute left-0 bottom-0 w-full h-0.5 transition-all bg-[var(--primary-bg-color)] dark:bg-[var(--secondary-color)] z-0 group-hover:h-full'></span>
					</div>
					<span className='mx-1'>/</span>
					<span className='text-gray-100 dark:text-[var(--secondary-color)]'>
						{contentOverview.title}
					</span>
				</div>
				<div className='mt-10 lg:mt-24 space-y-4'>
					{logo && (
						<img
							src={logo}
							alt={contentOverview.title}
							className='w-auto h-10 md:h-20'
						/>
					)}
					<div className='flex gap-2 text-xs dark:text-[var(--secondary-color)]'>
						<p className='dark:text-green-600 text-red-800'>
							{contentOverview.rating}
						</p>
						<p>{contentOverview.year}</p>
						<p>{contentOverview.restrict}+</p>
					</div>
					<div className='flex'>
						{contentTags.map((tag, index) => (
							<Badge link={contentOverview.urlTags[index]} key={tag}>
								{tag}
							</Badge>
						))}
					</div>
					<p className='text-balance font-normal text-sm md:text-lg'>
						{contentOverview.largeDescription}
					</p>
					<Button className='bg-[var(--subscribe-color)] rounded-2xl hover:bg-pink-500 hover:scale-105 transform transition duration-300 w-full lg:w-auto lg:px-[105px] leading-4'>
						{contentOverview.isSubscribeContent === true ? (
							<>
								<p className='text-[15px] font-normal'>Смотреть</p>
								<p className='text-[13px] text-[var(--secondary-color)] font-normal'>
									по подписке Иви
								</p>
							</>
						) : (
							<>
								<p className='text-[15px] font-normal'>Смотреть</p>
							</>
						)}
					</Button>
					<p className='text-sm font-normal'>Первые 30 дней бесплатно</p>
				</div>
			</div>
			<div className='lg:basis-3/5 w-full lg:ml-10 mt-4 lg:mt-0 relative overflow-hidden rounded-3xl'>
				<img src={poster} className='w-full h-full object-fill inset-0' />
			</div>
		</div>
	)
}
