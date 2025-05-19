import { useCheckCertificateQuery } from '@entities/api/rtkQuery'
import { Button } from '@shared/uikit'
import { CertificationDialog } from '@widgets/Dialogs/CertificationDialog/ui/CertificationDialog'
import { useState } from 'react'
import giftIcon from '/assets/gift.svg'

export const CertificateActivationBtn = () => {
	const [isCertificationDialogOpen, setIsCertificationDialogOpen] =
		useState(false)

	const { data: certificateData, refetch: refetchCertificate } =
		useCheckCertificateQuery()

	const hasCertificate = certificateData?.hasCertificate ?? false

	const setOpenCertificationDialog = () => {
		setIsCertificationDialogOpen(true)
	}

	return (
		<>
			{!hasCertificate ? (
				<Button
					onClick={setOpenCertificationDialog}
					variant='primary'
					className='rounded-2xl text-xs sm:text-sm md:text-lg flex items-center justify-center gap-2 w-full py-2 hover:brightness-125 transition duration-200 hover:scale-105'
				>
					<img className='max-w-9 md:max-w-12' src={giftIcon} />
					Активировать сертификат
				</Button>
			) : (
				<div className='flex items-center justify-center w-full rounded-2xl border border-green-500 text-green-600 font-semibold py-2 text-lg gap-2'>
					✅ Сертификат активирован
				</div>
			)}
			<CertificationDialog
				isOpen={isCertificationDialogOpen}
				onClose={() => {
					setIsCertificationDialogOpen(false)
					refetchCertificate()
				}}
			/>
		</>
	)
}
