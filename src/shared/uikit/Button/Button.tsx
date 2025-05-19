import { Button as HeadlessButton } from '@headlessui/react'
import type { FC, MouseEvent, ReactNode } from 'react'
import '../../../styles/vars.css'

import clsx from 'clsx'

interface Props {
	children: ReactNode
	title?: string
	size?: 'sm' | 'md' | 'lg'
	onClick: (e: MouseEvent<HTMLButtonElement>) => void
	variant?: 'primary' | 'secondary'
	className?: string
}

const sizeClasses = {
	sm: 'text-sm px-3 py-1.5',
	md: 'text-base px-4 py-2',
	lg: 'text-lg px-5 py-2.5',
}

const variantClasses = {
	primary:
		'bg-[var(--primary-bg-color)] text-white hover:bg-[var(--hover-primary-color)]',
	secondary:
		'bg-[var(--secondary-color)] hover:bg-pink-500 text-[var(--primary-color)]',
}
export const Button: FC<Props> = ({
	children,
	onClick,
	title,
	className = '',
	size = 'md',
	variant = 'primary',
}) => {
	return (
		<HeadlessButton
			as='button'
			type='button'
			onClick={onClick}
			className={clsx(
				'rounded-xl font-semibold transition-colors duration-200 outline-none',
				sizeClasses[size],
				variantClasses[variant],
				className
			)}
			title={title}
		>
			{children}
		</HeadlessButton>
	)
}
