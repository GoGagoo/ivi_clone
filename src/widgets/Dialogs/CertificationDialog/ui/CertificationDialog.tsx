import {
	useActivateCertificateMutation,
	useCheckCertificateQuery,
} from '@/shared/api/rtkQuery'
import { saveCertificateStatus } from '@shared/api/firebase/utils/statuses/saveCertificateStatus'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'
import { Button, Dialog, Input } from '@shared/uikit'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const certificationCodeSchema = z
	.string()
	.min(8, 'Промокод должен содержать минимум 8 символов')
	.max(16, 'Промокод не должен превышать 16 символов')

interface Props {
	isOpen: boolean
	onClose: () => void
}

export const CertificationDialog: React.FC<Props> = ({ isOpen, onClose }) => {
	const { user } = useAuthListener()
	const [certificationCode, setCertificationCode] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isCertificationFormOpen, setIsCertificationFormOpen] = useState(true)
	const [isCertificationSuccessOpen, setIsCertificationSuccessOpen] = useState(false)

	const [activateCertificate] = useActivateCertificateMutation()
	const { data: certificateData, refetch: refetchCertificate } =
		useCheckCertificateQuery(undefined, {
			skip: !user?.uid,
		})

	useEffect(() => {
		if (isOpen && certificateData?.hasCertificate) {
			setIsCertificationFormOpen(false)
			setIsCertificationSuccessOpen(true)
		}
	}, [isOpen, certificateData])

	const handleCertificationActivation = async () => {
		try {
			certificationCodeSchema.parse(certificationCode)
			setError(null)

			if (!user) throw new Error('Необходимо авторизоваться')

			const result = await activateCertificate({
				code: certificationCode,
			}).unwrap()

			if (!result.success) throw new Error('Ошибка активации сертификата')

			setIsCertificationFormOpen(true)
			setIsCertificationSuccessOpen(true)

			await refetchCertificate()
			await saveCertificateStatus(user.uid)

			setTimeout(() => {
				onClose()
				setCertificationCode('')
				setIsCertificationSuccessOpen(false)
			}, 4000)
		} catch (err: unknown) {
			setIsCertificationSuccessOpen(false)
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

	return (
		<>
			<Dialog
				variant='certification'
				isOpen={isOpen && isCertificationFormOpen && certificateData?.hasCertificate}
				onClose={onClose}
				title='Активация сертификата'
			>
					<div className='space-y-6'>
						<p className='text-gray-600'>
							Введите промокод для активации сертификата
						</p>
						<Input
							type='text'
							label='Промокод активации'
							value={certificationCode}
							icon='certificateActivation'
							onChange={(e) => {
								setCertificationCode(e.target.value.toUpperCase())
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
								onClick={handleCertificationActivation}
								className='flex-1 rounded-xl py-2'
								disabled={!certificationCode.trim()}
							>
								Активировать
							</Button>
						</div>
					</div>
				
			</Dialog>
			<Dialog
				variant='subscription'
				isOpen={
					isOpen && 
					(isCertificationSuccessOpen || certificateData?.hasCertificate)
				}
				onClose={() => {
					setIsCertificationSuccessOpen(false)
					onClose()
				}}
				title='Оформление подписки'
			>
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
							{certificateData?.hasCertificate 
							? "У вас уже есть активная сертификация!" 
							: "Сертификация успешно оформлена! 🎉"
						}
						</p>
					</div>
			</Dialog>
		</>
	)
}
