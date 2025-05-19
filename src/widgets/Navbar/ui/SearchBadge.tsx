import { SearchContentDialog } from '@/widgets'
import { IoSearch } from 'react-icons/io5'
import { useState } from 'react'

export const SearchBadge = () => {
	const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
	
	const setOpenSearchDialog = () => {
		setIsSearchDialogOpen(true)
	}

	return (
		<div
			onClick={setOpenSearchDialog}
			className='h-auto text-lg xl:gap-2 items-center font-bold text-secondary-color transform transition duration-500 cursor-pointer hover:text-slate-100 dark:text-[var(--secondary-color)] dark:hover:text-slate-100 hover:scale-105'
		>
			<div>
				<IoSearch className='max-w-14 xs:max-w-8 md:max-w-none xl:hidden' />
			</div>
			<span className='hidden xl:inline'>Поиск</span>
			<SearchContentDialog
				isOpen={isSearchDialogOpen}
				onClose={() => {
					setIsSearchDialogOpen(false)
				}}
			/>
		</div>
	)
}
