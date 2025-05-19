import { useCheckSubscriptionQuery } from '@entities/api/rtkQuery'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'
import { Button } from '@shared/uikit'
import { SubscriptionDialog } from '@widgets/Dialogs/SubscriptionDialog/ui/SubscriptionDialog'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SubscribeBadge = () => {
	const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] =
		useState(false)

	const navigate = useNavigate()

	const { data: subscriptionData, refetch: refetchSubscription } =
		useCheckSubscriptionQuery()

	const { user } = useAuthListener()

	const hasSubscription = subscriptionData?.hasSubscription ?? false

	const handleOpenSubscribeDialog = () => {
		if (!user) {
			navigate('/login')
			return
		}
		setIsSubscriptionDialogOpen(true)
	}

	return (
		<>
			<Button
				onClick={handleOpenSubscribeDialog}
				className='h-auto hidden sm:inline whitespace-nowrap transform transition duration-300 hover:scale-105 px-10 lg:px-[60px] py-2 rounded-xl'
				size='sm'
				variant='subscription'
			>
				{hasSubscription ? 'Подписка активирована✅' : 'Оплатить подписку'}
			</Button>
			<SubscriptionDialog
				isOpen={isSubscriptionDialogOpen}
				onClose={() => {
					setIsSubscriptionDialogOpen(false)
					refetchSubscription()
				}}
			/>
		</>
	)
}
