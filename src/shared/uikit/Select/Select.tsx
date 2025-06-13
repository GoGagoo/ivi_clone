import { Combobox as HeadlessCombobox } from '@headlessui/react'
import { type ReactNode, useState } from 'react'

type Option = {
	id: string | number
	name: string
	[key: string]: any
}

type ComboboxProps<T extends Option> = {
	options: T[]
	value: T
	onChange: (value: T) => void
	displayValue?: (option: T) => string
	withSearch?: boolean
	className?: string
	children: ReactNode
	filterFunction?: (query: string, option: T) => boolean
}

export const Select = <T extends Option>({
	options,
	value,
	onChange,
	displayValue = (option) => option.name,
	children,
	filterFunction,
	className,
	withSearch = true,
}: ComboboxProps<T>) => {
	const [query, setQuery] = useState('')

	const filteredOptions =
		query === ''
			? options
			: options.filter((option) =>
					filterFunction
						? filterFunction(query, option)
						: option.name.toLowerCase().includes(query.toLowerCase())
			  )

	return (
		<HeadlessCombobox value={value} onChange={onChange}>
			<div className={`relative ${className}`}>
				{children}

				<HeadlessCombobox.Options className='absolute right-0 z-50 mt-2 w-full min-w-[200px] max-h-60 overflow-y-auto origin-top-right rounded-xl bg-white dark:bg-[var(--primary-bg-color)] shadow-lg ring-1 ring-black/5 focus:outline-none'>
					{withSearch && (
						<div className='px-2 py-1'>
							<HeadlessCombobox.Input
								className='w-full border-0 bg-transparent text-sm focus:ring-0 text-gray-900 dark:text-white'
								onChange={(event) => setQuery(event.target.value)}
								displayValue={displayValue}
							/>
						</div>
					)}

					{filteredOptions.map((option) => (
						<HeadlessCombobox.Option
							key={option.id}
							value={option}
							className={({ selected }) =>
								`relative cursor-default select-none py-2 pl-3 pr-9 rounded-xl ${
									selected
										? 'bg-[var(--hover-primary-color)] dark:text-white'
										: 'dark:text-white hover:bg-zinc-400'
								}`
							}
						>
							{({ selected }) => (
								<div className='flex items-center gap-2'>
									{option.icon && (
										<span className='flex-shrink-0'>{option.icon}</span>
									)}
									<span
										className={`block truncate ${
											selected ? 'font-semibold' : 'font-normal'
										}`}
									>
										{option.name}
									</span>
								</div>
							)}
						</HeadlessCombobox.Option>
					))}
				</HeadlessCombobox.Options>
			</div>
		</HeadlessCombobox>
	)
}
