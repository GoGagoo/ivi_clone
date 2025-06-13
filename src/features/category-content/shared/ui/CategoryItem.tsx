import type { ICategoryItem } from '@entities/previews/model/types/categories'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export type CardVariant = 'category' | 'home'

interface Props<T extends ICategoryItem> {
  item: T
  variant?: CardVariant
  covers: Record<string, string>
}

export const CategoryItem = <T extends ICategoryItem>({
  item,
  variant = 'category',
  covers,
}: Props<T>) => {
	return (
		<Link
			to={`/watch/${item.urlTitle}`}
			className={clsx(
				'block relative group transition-transform duration-300 hover:scale-105',
				variant === 'home' && 'w-[100px] md:w-[160px]'
			)}
		>
			<div
				className={clsx(
					'relative overflow-hidden rounded-xl',
					variant === 'category'
						? 'w-40 md:w-80 h-24 md:h-48'
						: 'w-28 h-40 md:w-40 md:h-64'
				)}
			>
				<img
					className={clsx(
						'w-full h-full object-cover',
						variant !== 'category' && 'rounded-lg'
					)}
					src={covers[item.posterKey]}
					loading='lazy'
				/>

				{variant === 'home' && (
					<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100'>
						<div className='flex justify-between items-start'>
							<div className='bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
								{item.restrict}+
							</div>
							<div className='flex items-center  bg-opacity-70 rounded px-2 py-1'></div>
						</div>

						<div className='absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
							<p className='text-gray-300 text-xs mb-2'>
								<span className='text-xl font-bold'>{item.rating}</span>
								<br />
								{item.year}, {item.country}, {item.genre},
								<br />
								{item.timing}
							</p>
						</div>
					</div>
				)}
			</div>
			{variant === 'home' && (
				<div className='text-sm mt-1 w-full'>
					<p className='font-bold truncate'>{item.title}</p>
					{item.isSubscribeContent === true ? (
						<p className='text-[var(--subscribe-color)]'>Подписка</p>
					) : (
						<p>Бесплатно</p>
					)}
				</div>
			)}

			{variant === 'category' && (
				<p className='text-md mt-3 font-bold'>{item.title}</p>
			)}
		</Link>
	)
}
