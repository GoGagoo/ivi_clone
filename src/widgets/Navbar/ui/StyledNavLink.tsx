import clsx from 'clsx'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
	to: string
	children: ReactNode
	className?: string
}

export const StyledNavLink: React.FC<Props> = ({ to, children, }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				clsx(
					'transform transition duration-500 cursor-pointer hover:text-slate-100 dark:text-[var(--secondary-color)] dark:hover:text-[var(--primary-color)] hover:scale-105',
					isActive && 'dark:text-gray-200 text-slate-100'
				)
			}
		>
			{children}
		</NavLink>
	)
}
