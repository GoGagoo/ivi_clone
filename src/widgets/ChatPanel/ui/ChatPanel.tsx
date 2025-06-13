import { Button, Input } from '@shared/uikit'
import { useRef } from 'react'

interface Props {
	text: string
	onChangeText: (value: string) => void
	onSendText: () => void
	onSendFile: (file: File) => void
	onSendVoice: () => void
}

export const ChatPanel: React.FC<Props> = ({
	text,
	onChangeText,
	onSendText,
	onSendFile,
	onSendVoice,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) onSendFile(file)
	}

	return (
		<div className='flex gap-2 p-2 bg-white dark:bg-gray-800  rounded-xl border-gray-200 dark:border-gray-700'>
			<div className='flex flex-col sm:flex-row gap-2 p-2 bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700'>
				<div className='order-1 sm:order-none flex-1'>
					<Input
						type='text'
						value={text}
						onChange={(e) => onChangeText(e.target.value)}
						className='w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-full bg-gray-50 dark:bg-gray-700 text-[var(--primary-color)]'
						variant='search'
						placeholder='Введите сообщение...'
					/>
				</div>

				<div className='order-2 sm:order-none'>
					<Button
						disabled={!text}
						onClick={onSendText}
						className='w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full'
					>
						<span className='sm:hidden'>Отправить</span>
						<span className='hidden sm:inline'>↑</span>
					</Button>
				</div>

				<div className='order-3 sm:order-none flex gap-2 justify-center sm:justify-start'>
					<Input
						type='file'
						ref={fileInputRef}
						onChange={handleFileChange}
						className='hidden'
						accept='*'
					/>
					<Button
						onClick={() => fileInputRef.current?.click()}
						className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-full'
						aria-label='Прикрепить файл'
					>
						📎
					</Button>
					<Button
						onClick={onSendVoice}
						className='bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full'
						aria-label='Голосовое сообщение'
					>
						🎙
					</Button>
					<a
						href='/support?clone=true'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Button className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white p-2 rounded-full'>
							♊️
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}
