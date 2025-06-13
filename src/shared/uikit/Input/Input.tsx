import { Field, Input as InputComponent } from '@headlessui/react'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import { FiUser } from 'react-icons/fi'
import { IoSearch } from 'react-icons/io5'
import { RiLockPasswordLine } from "react-icons/ri"
import { MdOutlineEmail } from "react-icons/md"
import { VscGistSecret } from "react-icons/vsc"
import { IoCardOutline } from "react-icons/io5"
import { PiMedal } from "react-icons/pi"
import { CiCalendarDate } from "react-icons/ci"
import { Label } from '../Label/Label'

type IconType = 'none' | 'search' | 'user' | 'certificateActivation' | 'password' | 'email' | 'cvv' | 'cardNumber' | 'expiry'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	variant?: 'primary' | 'search'
	icon?: IconType
	className?: string
	children?: ReactNode
	error?: string | null
}

const variantClasses = {
	primary:
		'bg-[var(--bg-color)] border-b-[#858585] hover:border-b-[#D9D7E0] focus:outline-none focus:ring-0 focus:border-[#D9D7E0]',
	search:
		'bg-[#D9D7E0] border-b-[#D9D7E0] hover:border-b-[#858585] focus:outline-none focus:ring-0 focus:border-[#858585] text-[var(--primary-bg-color)]',
}

const iconConfig: Record<
	IconType,
	{
		component: React.ComponentType<{ className?: string }> | null
		className?: string
	}
> = {
	search: {
		component: IoSearch,
		className: 'absolute inset-y-3.5 end-2 flex items-center',
	},
	user: {
		component: FiUser,
		className: 'absolute inset-y-3.5 end-2 flex items-center',
	},
	certificateActivation: {
		component: PiMedal,
		className: 'absolute inset-y-3.5 end-2 flex items-center',
	},
	password: {
		component: RiLockPasswordLine,
		className: 'absolute inset-y-3.5 end-2 flex items-center',
	},
	email: {
		component: MdOutlineEmail,
		className: 'absolute inset-y-3.5 end-2 flex items-center',
	},
	cvv: {
		component: VscGistSecret,
		className: 'absolute inset-y-3.5 end-2 flex items-center',
	},
	expiry: {
		component: CiCalendarDate,
		className: 'absolute inset-y-3.5 h-6 end-2 flex items-center',
	},
	cardNumber: {
		component: IoCardOutline,
		className: 'absolute inset-y-3.5 end-2 flex items-center',
	},
	none: {
		component: null,
	},
}

export const Input = forwardRef<HTMLInputElement, Props>(
	(
		{
			placeholder = '',
			className,
			variant = 'primary',
			id = `input-${Math.random().toString(36).substr(2, 9)}`,
			label,
			icon = 'none',
			children,
			error,
			...rest
		},
		ref
	) => {
		const iconData = icon !== 'none' ? iconConfig[icon] : null
		const Icon = iconData?.component

		return (
			<Field className='relative'>
				<InputComponent
					ref={ref}
					placeholder={placeholder}
					id={id}
					className={clsx(
						'block outline-none rounded-2xl font-semibold transition-colors text-sm border-0 border-b-2 appearance-none cursor-text peer w-full',
						'px-4 pt-4 pb-3',
						variantClasses[variant],
						className,
						{
							'pr-10': icon !== 'none' || children,
						}
					)}
					{...rest}
				/>
				{label && <Label htmlFor={id}>{label}</Label>}

				{icon !== 'none' && Icon && <Icon className={iconData?.className} />}

				{children && (
					<div className='absolute inset-y-0 end-2 flex items-center'>
						{children}
					</div>
				)}

				{error && (
					<div className='text-red-500 text-xs mt-1'>{error}</div>
				)}
			</Field>
		)
	}
)

Input.displayName = 'Input'
