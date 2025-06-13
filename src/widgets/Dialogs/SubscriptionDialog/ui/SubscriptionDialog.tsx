import {
	useActivateSubscriptionMutation,
	useCheckSubscriptionQuery,
} from '@/shared/api/rtkQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { saveSubscriptionStatus } from '@shared/api/firebase/utils/statuses/saveSubscriptionStatus'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'
import { Button, Dialog, Input } from '@shared/uikit'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const subscriptionSchema = z.object({
	cardNumber: z
		.string()
		.regex(/^\d{16}$/, 'Номер карты должен содержать ровно 16 цифр'),
	expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Формат: MM/YY'),
	cvv: z
		.string()
		.length(3, 'CVV должен содержать 3 цифры')
		.regex(/^\d+$/, 'CVV должен содержать только цифры'),
})

type SubscriptionForm = z.infer<typeof subscriptionSchema>

interface Props {
	isOpen: boolean
	onClose: () => void
}

export const SubscriptionDialog: React.FC<Props> = ({ isOpen, onClose }) => {
	const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(true)
  const [isSubscriptionSuccessOpen, setIsSubscriptionSuccessOpen] = useState(false)

	const { user } = useAuthListener()

	const [activateSubscription] = useActivateSubscriptionMutation()
	const { data: subscriptionData, refetch: refetchSubscription } =
		useCheckSubscriptionQuery(undefined, {
			skip: !user?.uid,
		})

	useEffect(() => {
    if (isOpen && subscriptionData?.hasSubscription) {
      setIsPaymentFormOpen(false)
      setIsSubscriptionSuccessOpen(true)
    }
  }, [isOpen, subscriptionData])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<SubscriptionForm>({
		resolver: zodResolver(subscriptionSchema),
	})

	const onSubmit = async (data: SubscriptionForm) => {
		if (!user?.uid) return

		try {
			const code = `${data.cardNumber.slice(0, 4)}-${data.expiry.replace(
				'/',
				''
			)}-${data.cvv}`
			const result = await activateSubscription({ code }).unwrap()

			if (!result.success) throw new Error('Ошибка при активации подписки')

			await refetchSubscription()
			await saveSubscriptionStatus(user.uid)
			
			setIsPaymentFormOpen(false)
      setIsSubscriptionSuccessOpen(true)

			setTimeout(() => {
				setIsSubscriptionSuccessOpen(false)
				reset()
				onClose()
			}, 4000)
		} catch (e) {
			console.error('Ошибка при сохранении подписки', e)
		}
	}

	return (
		<>
			<Dialog
				variant='subscription'
				isOpen={isOpen && isPaymentFormOpen && !subscriptionData?.hasSubscription}
				onClose={() => {
					setIsSubscriptionSuccessOpen(false)
					onClose()
				}}
				title='Оформление подписки'
			>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
					<p className='text-gray-600'>
						Введите промокод для активации сертификата
					</p>
					<Input
						placeholder='Номер карты'
						variant='search'
						type='text'
						icon='cardNumber'
						{...register('cardNumber')}
						maxLength={16}
						error={errors.cardNumber?.message}
					/>
					<div className='flex gap-4'>
						<Input
							placeholder='Срок действия (MM/YY)'
							variant='search'
							icon='expiry'
							maxLength={5}
							error={errors.expiry?.message}
							{...register('expiry')}
						/>
						<Input
							placeholder='CVV-код'
							variant='search'
							type='password'
							icon='cvv'
							maxLength={3}
							error={errors.cvv?.message}
							{...register('cvv')}
						/>
					</div>
					<div className='flex gap-4'>
						<Button onClick={onClose} className='flex-1 rounded-xl'>
							Отмена
						</Button>
						<Button
							type='submit'
							variant='primary'
							className='flex-1 rounded-xl'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Обработка...' : 'Оплатить'}
						</Button>
					</div>
				</form>
			</Dialog>
			<Dialog
				variant='subscription'
				isOpen={
					isOpen && 
					(isSubscriptionSuccessOpen || subscriptionData?.hasSubscription)
				}
				onClose={() => {
					setIsSubscriptionSuccessOpen(false)
					onClose()
				}}
				title='Оформление подписки'
			>
				<div className='text-center py-4'>
					<p className='text-green-600 font-semibold'>
						{subscriptionData?.hasSubscription 
							? "У вас уже есть активная подписка!" 
							: "Подписка успешно оформлена! 🎉"
						}
					</p>
				</div>
			</Dialog>
		</>
	)
}
