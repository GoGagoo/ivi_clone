import { Button } from '@shared/uikit'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
	const navigate = useNavigate()

	return (
		<main className='grid min-h-full overflow-hidden place-items-center px-6 py-24 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<p className='text-lg font-semibold text-[var(--subscribe-color)]'>404</p>
				<h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance  sm:text-7xl'>
					Страница не найдена
				</h1>
				<p className='mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
					Извините, но этой страницы не существует
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<Button
						onClick={() => navigate(-1)}
						className='rounded-md bg-[var(--subscribe-color)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-pink-500 hover:scale-105 transition duration-300 focus-visible:outline-2'
					>
						Назад
					</Button>
					<a href='#' className='text-sm font-semibold hover:scale-105 transition duration-300'>
						Связаться с поддержкой <span>&rarr;</span>
					</a>
				</div>
			</div>
		</main>
	)
}
