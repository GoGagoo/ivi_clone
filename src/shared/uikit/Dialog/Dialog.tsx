import {
	Description,
	Dialog as DialogComponent,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'

const variantClasses = {
	search: 'w-screen',
	certification: 'max-w-lg',
	subscription: 'max-w-xl',
}

interface Props {
	isOpen: boolean
	variant: 'search' | 'certification' | 'subscription'
	onClose: () => void
	title: string
	description?: string
	children: React.ReactNode
}

export const Dialog: React.FC<Props> = ({
	isOpen,
	onClose,
	title,
	variant = 'search',
	description,
	children,
}) => {
	return (
		<DialogComponent open={isOpen} onClose={onClose} className='relative z-50'>
			<div className='fixed bg-black/50 inset-0' />
			<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
				<DialogPanel
					className={`max-w-lg bg-[var(--bg-color)] space-y-4 rounded-xl border p-6 ${
						variantClasses[variant] || variantClasses.search
					}`}
				>
					<DialogTitle className='text-xl font-bold'>{title}</DialogTitle>
					{description && (
						<Description className='text-gray-600'>{description}</Description>
					)}
					{children}
				</DialogPanel>
			</div>
		</DialogComponent>
	)
}
