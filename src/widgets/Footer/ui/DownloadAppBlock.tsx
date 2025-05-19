import { Button } from '@shared/uikit'
import { BsTv } from 'react-icons/bs'
import { FaApple, FaGooglePlay, FaVk } from 'react-icons/fa'
import { FaLinkedinIn, FaOdnoklassniki, FaXTwitter } from 'react-icons/fa6'
import { MdDevicesOther } from 'react-icons/md'
import { PiTelegramLogo } from 'react-icons/pi'
import { SiHuawei, SiViber } from 'react-icons/si'

export const DownloadAppBlock = () => {
	return (
		<div className='mt-14'>
			<div className='flex flex-wrap gap-3'>
				<Button className='rounded-xl bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105 min-w-[180px] sm:min-w-[200px]'>
					<div className='flex items-center gap-2'>
						<FaApple size={24} />
						<div className='flex flex-col'>
							<p className='text-[9px] text-left text-[var(--secondary-color)]'>
								Загрузить в
							</p>
							<p className='text-sm'>App Store</p>
						</div>
					</div>
				</Button>

				<Button className='rounded-xl bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105 min-w-[180px] sm:min-w-[200px]'>
					<div className='flex items-center gap-2'>
						<FaGooglePlay size={24} />
						<div className='flex flex-col'>
							<p className='text-[9px] text-left text-[var(--secondary-color)]'>
								Доступно в
							</p>
							<p className='text-sm'>Google Play</p>
						</div>
					</div>
				</Button>

				<Button className='rounded-xl bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105 min-w-[180px] sm:min-w-[200px]'>
					<div className='flex items-center gap-2'>
						<BsTv size={24} />
						<div className='flex flex-col'>
							<p className='text-[9px] text-left text-[var(--secondary-color)]'>
								Смотрите на
							</p>
							<p className='text-sm'>Smart TV</p>
						</div>
					</div>
				</Button>

				<Button className='rounded-xl bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105 min-w-[180px] sm:min-w-[200px]'>
					<div className='flex items-center gap-2'>
						<SiHuawei size={24} />
						<div className='flex flex-col'>
							<p className='text-[9px] text-left text-[var(--secondary-color)]'>
								Откройте в
							</p>
							<p className='text-sm'>App Gallery</p>
						</div>
					</div>
				</Button>

				<Button className='rounded-xl bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105 min-w-[180px] sm:min-w-[200px]'>
					<div className='flex items-center gap-2'>
						<MdDevicesOther size={24} />
						<div className='flex flex-col'>
							<p className='text-sm'>Все устройства</p>
						</div>
					</div>
				</Button>
			</div>

			<div className='flex flex-wrap gap-3 mt-4'>
				<Button className='rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105'>
					<FaVk size={20} className='sm:w-6 sm:h-6' />
				</Button>
				<Button className='rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105'>
					<SiViber size={20} className='sm:w-6 sm:h-6' />
				</Button>
				<Button className='rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105'>
					<FaXTwitter size={20} className='sm:w-6 sm:h-6' />
				</Button>
				<Button className='rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105'>
					<FaLinkedinIn size={20} className='sm:w-6 sm:h-6' />
				</Button>
				<Button className='rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105'>
					<FaOdnoklassniki size={20} className='sm:w-6 sm:h-6' />
				</Button>
				<Button className='rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center bg-[var(--primary-bg-color)] hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105'>
					<PiTelegramLogo size={20} className='sm:w-6 sm:h-6' />
				</Button>
			</div>

			<div className='mt-6 sm:mt-9 font-bold text-[var(--secondary-color)] text-sm sm:text-base'>
				<p>© 2025 ООО «Иви.ру»</p>
				<p className='mt-2'>
					HBO ® and related service marks are the property of Home Box Office,
					Inc
				</p>
			</div>
		</div>
	)
}
