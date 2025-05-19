import { Label as LabelComponent } from '@headlessui/react'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

interface Props {
	children?: ReactNode
	htmlFor?: string
}

export const Label: FC<Props> = ({ children, htmlFor }) => {
	return (
		<LabelComponent
			htmlFor={htmlFor}
			className={clsx(
				'peer',
				'absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-3 z-10',
				'origin-[0] font-bold start-2.5 cursor-pointer',
				'peer-focus:text-gray-400 peer-placeholder-shown:scale-100',
				'peer-placeholder-shown:translate-y-0 peer-focus:scale-75',
				'peer-focus:-translate-y-4'
			)}
		>
			{children}
		</LabelComponent>
	)
}
