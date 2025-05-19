import { HomeCollections } from '@features/ui/HomeCollections'
import { HomeCarousel } from '../features/ui/HomeCarousel'
import { CertificateActivationBtn } from '@/widgets/Home/ui/CertificateActivationBtn'
import { SubscribeActivationBtn } from '@/widgets/Home/ui/SubscribeActivationBtn'

export const Home = () => {
	return (
		<main>
			<HomeCarousel />
			<div className='flex gap-8'>
				<SubscribeActivationBtn />
				<CertificateActivationBtn />
			</div>
			<div className='mt-10'>
				<HomeCollections />
			</div>
		</main>
	)
}
