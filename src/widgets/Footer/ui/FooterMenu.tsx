import { CertificationDialog } from '@/widgets'
import { SubscriptionDialog } from '@widgets/Dialogs/SubscriptionDialog/ui/SubscriptionDialog'
import { useCheckCertificateQuery } from '@entities/api/rtkQuery'
import { Button } from '@shared/uikit'
import { useState } from 'react'
import { MdOutlineMail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import shareIcon from '/assets/footer-share-icon.svg'

export const FooterMenu = () => {
	const [isCertificationDialogOpen, setIsCertificationDialogOpen] = useState(false)
	const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false)

	const { refetch: refetchCertificate } = useCheckCertificateQuery()

	const setOpenCertificationDialog = () => setIsCertificationDialogOpen(true)
	
	return (
		<div className='mt-10 mb-10 grid grid-cols-4 gap-5 font-bold'>
			<div>
				<ul className='text-xs md:text-lg text-[var(--secondary-color)]'>
					<li className='text-[var(--primary-color)]'>О нас</li>
					<Link to='https://corp.ivi.ru/'>
						<li className='hover:text-[var(--primary-color)]'>О компании</li>
					</Link>
					<Link to='https://corp.ivi.ru/career/#career-vacancy-block'>
						<li className='hover:text-[var(--primary-color)]'>Вакансии</li>
					</Link>
					<Link to='https://www.ivi.ru/pages/beta'>
						<li className='hover:text-[var(--primary-color)]'>
							Программа бета-тестирования
						</li>
					</Link>
					<Link to='https://www.ivi.ru/info/partners'>
						<li className='hover:text-[var(--primary-color)]'>
							Информация для партнёров
						</li>
					</Link>
					<Link to='https://corp.ivi.ru/advertisers/'>
						<li className='hover:text-[var(--primary-color)]'>
							Размещение рекламы
						</li>
					</Link>
					<Link to='https://www.ivi.ru/info/agreement'>
						<li className='hover:text-[var(--primary-color)]'>
							Пользовательское соглашение
						</li>
					</Link>
					<Link to='https://www.ivi.ru/info/confidential'>
						<li className='hover:text-[var(--primary-color)]'>
							Политика конфиденциальности
						</li>
					</Link>
					<Link to='https://www.ivi.ru/info/recomtech'>
						<li className='hover:text-[var(--primary-color)]'>
							На Иви применяются рекомендательные технологии
						</li>
					</Link>
					<Link to='https://www.ivi.ru/info/goryachaya-liniya-komplaens'>
						<li className='hover:text-[var(--primary-color)]'>Комплаенс</li>
					</Link>
					<Link to='https://www.ivi.ru/reviews'>
						<li className='hover:text-[var(--primary-color)]'>
							Оставить отзыв
						</li>
					</Link>
				</ul>
			</div>
			<div>
				<ul className='text-xs md:text-lg text-[var(--secondary-color)]'>
					<li className='text-[var(--primary-color)]'>Разделы</li>
					<Link to='/'>
						<li className='hover:text-[var(--primary-color)]'>Мой Иви</li>
					</Link>
					<Link to='https://www.ivi.ru/new'>
						<li className='hover:text-[var(--primary-color)]'>Что нового</li>
					</Link>
					<Link to='/movies'>
						<li className='hover:text-[var(--primary-color)]'>Фильмы</li>
					</Link>
					<Link to='/serials'>
						<li className='hover:text-[var(--primary-color)]'>Сериалы</li>
					</Link>
					<Link onClick={setOpenCertificationDialog} to='#'>
						<li className='bg-gradient-to-r from-[var(--subscribe-bg-from)] to-[var(--subscribe-bg-to)] inline-block text-transparent bg-clip-text'>
							Активация сертификата
						</li>
					</Link>
					<CertificationDialog
						isOpen={isCertificationDialogOpen}
						onClose={() => {
							setIsCertificationDialogOpen(false)
							refetchCertificate()
						}}
					/>
				</ul>
			</div>
			<div>
				<ul className='text-xs md:text-lg text-[var(--secondary-color)] '>
					<li className='text-[var(--primary-color)]'>Служба поддержки</li>
					<li className='font-normal'>
						Мы всегда готовы вам помочь. Наши операторы онлайн 24/7
					</li>
					<Link to='/support'>
						<Button className='mt-4 rounded-xl text-xs md:text-sm bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105'>
							Написать в чате
						</Button>
					</Link>
					<br />
					<a href='mailto:support@ivi.ru'>
						<Button className='mt-4 rounded-xl text-sm bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] transition-colors hover:scale-105 dark:hover:bg-[var(--hover-primary-color)]'>
							<li className='p-0 md:px-1 md:py-2'>
								<MdOutlineMail className='' size={20} />
							</li>
						</Button>
					</a>
					<Link to='https://ask.ivi.ru/'>
						<li className='hover:text-[var(--primary-color)] font-normal mt-4'>
							ask.ivi.ru
						</li>
						<span className='font-normal'>Ответы на вопросы</span>
					</Link>
				</ul>
			</div>
			<div>
				<ul className='text-lg grid place-items-center text-[var(--secondary-color)]'>
					<li className='mt-10'>
						<div className='bg-[#A869F0]'>
							<img
								className='h-7 md:h-14 shadow-[0px_-0px_19px_17px_#A869F0] md:shadow-[0px_-0px_49px_47px_#A869F0]'
								src={shareIcon}
							/>
						</div>
					</li>
					<p className='rounded-xl text-xs md:text-sm mt-20 text-center'>
						Смотрите фильмы, сериалы и мультфильмы без рекламы
					</p>
					<br />
				</ul>
				<SubscriptionDialog
					isOpen={isSubscriptionDialogOpen}
					onClose={() => setIsSubscriptionDialogOpen(false)}
				/>
			</div>
		</div>
	)
}
