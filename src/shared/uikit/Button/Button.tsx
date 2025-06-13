import '@app/styles/vars.css'
import { Button as HeadlessButton } from '@headlessui/react'
import type { FC, MouseEvent, ReactNode } from 'react'

import clsx from 'clsx'

interface Props {
	children: ReactNode
	loading?: boolean
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset' | undefined
	size?: 'sm' | 'md' | 'lg'
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	variant?: 'primary' | 'subscription'
	className?: string
}

const sizeClasses = {
	sm: 'text-sm px-3 py-1.5',
	md: 'text-base px-4 py-2',
	lg: 'text-lg px-5 py-2.5',
}

const variantClasses = {
	primary:
		'text-white disabled:text-[var(--secondary-color)] disabled:bg-[#0c0b12] disabled:cursor-not-allowed bg-[var(--primary-bg-color)]',
	subscription:
		'bg-[linear-gradient(to_right,var(--subscribe-bg-from),var(--subscribe-bg-to))] text-[var(--hover-primary-color)] dark:text-[var(--primary-color)]',
}

export const Button: FC<Props> = ({
	children,
	onClick,
	loading,
	disabled,
	className = '',
	size = 'md',
	variant = 'primary',
	type,
}) => {
	return (
		<HeadlessButton
			as='button'
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={clsx(
				'font-semibold cursor-pointer outline-none',
				sizeClasses[size],
				variantClasses[variant],
				className
			)}
		>
			{loading ? (
				<p className='place-items-center'>Проверка...</p>
			) : (
				children
			)}
		</HeadlessButton>
	)
}
