import { saveCertificateStatus } from '@shared/api/firebase/utils/statuses/saveCertificateStatus'
import {
	useActivateCertificateMutation,
	useCheckCertificateQuery,
} from '@entities/api/rtkQuery'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'
import { Button, Dialog, Input } from '@shared/uikit'
import { useState } from 'react'
import { z } from 'zod'

const activationCodeSchema = z
	.string()
	.min(8, 'Промокод должен содержать минимум 8 символов')
	.max(16, 'Промокод не должен превышать 16 символов')

interface Props {
	isOpen: boolean
	onClose: () => void
}

export const CertificationDialog: React.FC<Props> = ({ isOpen, onClose }) => {
	const { user } = useAuthListener()
	const [activationCode, setActivationCode] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isSuccess, setIsSuccess] = useState(false)

	const [activateCertificate] = useActivateCertificateMutation()
	const { data: certificateData, refetch: refetchCertificate } =
		useCheckCertificateQuery(undefined, {
			skip: !user?.uid,
		})

	const handleActivate = async () => {
		try {
			activationCodeSchema.parse(activationCode)
			setError(null)

			if (!user) throw new Error('Необходимо авторизоваться')

			const result = await activateCertificate({
				code: activationCode,
			}).unwrap()

			if (!result.success) throw new Error('Ошибка активации сертификата')

			setIsSuccess(true)

			await refetchCertificate()
			await saveCertificateStatus(user.uid)

			setTimeout(() => {
				onClose()
				setActivationCode('')
				setIsSuccess(false)
			}, 4000)
		} catch (err: unknown) {
			setIsSuccess(false)
			if (err instanceof z.ZodError) {
				setError(err.errors[0].message)
			} else if (err && typeof err === 'object' && 'data' in err) {
				setError((err.data as { message: string }).message)
			} else if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('Произошла неизвестная ошибка')
			}
		}
	}

	const isActivated = certificateData?.hasCertificate || false

	return (
		<Dialog
			variant='certification'
			isOpen={isOpen}
			onClose={onClose}
			title='Активация сертификата'
		>
			{isActivated || isSuccess ? (
				<div className='flex flex-col items-center py-4 space-y-4'>
					<svg
						className='w-12 h-12 text-green-500'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M5 13l4 4L19 7'
						/>
					</svg>
					<p className='text-center'>
						Поздравляем! Сертификат успешно активирован.
					</p>
				</div>
			) : (
				<div className='space-y-6'>
					<p className='text-gray-600'>
						Введите промокод для активации сертификата
					</p>
					<Input
						type='text'
						label='Промокод активации'
						value={activationCode}
						icon='certificateActivation'
						onChange={(e) => {
							setActivationCode(e.target.value.toUpperCase())
							setError(null)
						}}
						error={error}
					/>
					<div className='flex gap-4'>
						<Button onClick={onClose} className='flex-1 rounded-xl py-2'>
							Отмена
						</Button>
						<Button
							variant='primary'
							onClick={handleActivate}
							className='flex-1 rounded-xl py-2'
							disabled={!activationCode.trim()}
						>
							Активировать
						</Button>
					</div>
				</div>
			)}
		</Dialog>
	)
}
