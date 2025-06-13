import { HomeCollections } from '@/features/home-collections/ui/HomeCollections'
import { CertificateActivationBtn } from '@/widgets/Home/ui/CertificateActivationBtn'
import { SubscribeActivationBtn } from '@/widgets/Home/ui/SubscribeActivationBtn'
import { HomeCarousel } from '../features/home-collections/ui/HomeCarousel'

export const Home = () => {
	return (
		<main>
			<HomeCarousel />
			<div className='flex gap-4 md:gap-8'>
				<SubscribeActivationBtn />
				<CertificateActivationBtn />
			</div>
			<div className='mt-10'>
				<HomeCollections />
			</div>
		</main>
	)
}
