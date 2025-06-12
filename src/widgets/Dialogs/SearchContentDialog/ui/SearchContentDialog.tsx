import { useGetSearchedContentQuery } from '@/shared/api/rtkQuery'
import { Dialog, Input } from '@shared/uikit'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebouncedValue } from '../lib/hooks/useDebouncedValue'

interface Props {
	isOpen: boolean
	onClose: () => void
}

export const SearchContentDialog: React.FC<Props> = ({ isOpen, onClose }) => {
	const [searchQuery, setSearchQuery] = useState('')

	const debouncedSearchQuery = useDebouncedValue(searchQuery)

	const { data, isLoading } = useGetSearchedContentQuery(debouncedSearchQuery, {
		skip: !debouncedSearchQuery.trim(),
	})

	useEffect(() => {
		if (!isOpen) setSearchQuery('')
	}, [isOpen])

	const handleClickResult = () => {
		setTimeout(() => {
			onClose()
		}, 0)
	}

	return (
		<Dialog
			variant='search'
			isOpen={isOpen}
			onClose={onClose}
			title='Поиск контента'
		>
			<div className='space-y-4'>
				<Input
					value={searchQuery}
					icon='search'
					label='Фильмы, сериалы, мультфильмы'
					variant='search'
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{isLoading ? (
					<ul className='space-y-2'>
						{Array.from({ length: 5 }).map((_, i) => (
							<li key={i} className='h-10 bg-gray-200 animate-pulse rounded' />
						))}
					</ul>
				) : (
					<>
						{data?.items?.length === 0 && <p>Ничего не найдено</p>}
						<ul className='overflow-y-auto max-h-56 space-y-2'>
							{data?.items?.map((item, index) => (
								<li
									key={`${item.id}-${index}`}
									className='p-2 rounded hover:bg-gray-100 dark:hover:bg-[var(--subscribe-color)]'
								>
									<Link
										to={`/watch/${item.urlTitle}`}
										onClick={handleClickResult}
										className='block w-full h-full'
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</>
				)}
			</div>
		</Dialog>
	)
}
