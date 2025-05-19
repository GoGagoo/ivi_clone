import { Divide } from '@shared/uikit'
import { FooterMenu } from './FooterMenu'
import { DownloadAppBlock } from './DownloadAppBlock'

export const Footer = () => {
	return (
		<footer className='mt-10 mb-10 md:mb-20 space-x-1'>
			<div className='space-y-6 leading-none mb-8 md:mb-16'>
				<p className='text-sm md:text-lg text-[var(--secondary-color)]'>
					Смотри телеканалы* круглосуточно, непрерывно и бесплатно.
				</p>
				<p className='text-sm md:text-lg text-[var(--secondary-color)]'>
					*Первый канал, Телеканал "Россия" (Россия-1), Телеканал "Матч ТВ",
					Телекомпания НТВ, Петербург - 5 канал, Телеканал "Россия - Культура",
					Российский информационный канал "Россия-24", Телеканал "Общественное
					телевидение России", ТВ ЦЕНТР
				</p>
			</div>
			<Divide />
			<FooterMenu />
			<Divide />
			<DownloadAppBlock />
		</footer>
	)
}
