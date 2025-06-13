import clsx from 'clsx'

interface Props {
	className?: string
}

export const Divide: React.FC<Props> = ({ className }) => {
	return (
		<div>
			<hr className={clsx(
				'border-gray-500 border-solid border-1 mt-5',
				className
			)} />
		</div>
	)
}
