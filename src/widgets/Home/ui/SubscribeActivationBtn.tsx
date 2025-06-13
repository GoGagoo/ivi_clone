import { useCheckSubscriptionQuery } from '@/shared/api/rtkQuery'
import { Button } from '@shared/uikit'
import { SubscriptionDialog } from '@widgets/Dialogs/SubscriptionDialog/ui/SubscriptionDialog'
import { useState } from 'react'
import lightningIcon from '/assets/lightning.svg'

export const SubscribeActivationBtn = () => {
	const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] =
		useState(false)

	const { data: subscriptionData, refetch: refetchSubscription } =
		useCheckSubscriptionQuery()

	const hasSubscription = subscriptionData?.hasSubscription ?? false

	const setOpenASubscribeDialog = () => {
		setIsSubscriptionDialogOpen(true)
	}

	return (
		<>
			{!hasSubscription ? (
				<Button
					onClick={setOpenASubscribeDialog}
					className='rounded-2xl text-xs sm:text-sm md:text-lg flex items-center justify-center gap-2 w-full py-2 bg-[url(/assets/30-days-free-bg-image.svg)] hover:brightness-125 transition duration-200 hover:scale-105'
				>
					<img className='max-w-9 md:max-w-12' src={lightningIcon} />
					30 дней подписки бесплатно
				</Button>
			) : (
				<div className='flex items-center justify-center w-full rounded-2xl border border-green-500 text-green-600 font-semibold py-2 text-lg gap-2'>
					✅ Подписка активирована
				</div>
			)}
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
