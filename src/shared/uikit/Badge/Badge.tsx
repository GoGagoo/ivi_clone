import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
	children: ReactNode
	link?: string
}

export const Badge: React.FC<Props> = ({ children, link }) => (
	<Link
		to={`/genre/${link}`}
		className='bg-blue-100 font-bold hover:bg-blue-200 text-xs sm:text-sm me-2 px-2.5 py-0.5 dark:bg-[var(--primary-bg-color)] rounded-md inline-flex items-center justify-center dark:hover:bg-slate-700 whitespace-nowrap'
	>
		{children}
	</Link>
)
