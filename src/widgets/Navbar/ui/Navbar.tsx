import { useAuthListener } from '@shared/lib/hooks/useAuthListener'
import { Link } from 'react-router-dom'
import { AccountBadge } from './AccountBadge'
import { SearchBadge } from './SearchBadge'
import { StyledNavLink } from './StyledNavLink'
import { SubscribeBadge } from './SubscribeBadge'
import { ThemeToggler } from './ThemeToggler'
import iviLogo from '/assets/ivi-logo1.svg'

export const Navbar = () => {
	const { user } = useAuthListener()

	return (
		<nav>
			<div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4 lg:gap-4 mt-4'>
				<div className='grid grid-cols-[auto_auto] items-center gap-2 md:gap-4 lg:gap-9'>
					<Link to='/'>
						<img src={iviLogo} alt='Иви' className='max-w-9 md:max-w-none cursor-pointer' />
					</Link>

					<div className='grid grid-cols-[repeat(3,auto)] gap-2 md:gap-4 text-xs max-sm:text-sm sm:text-base font-bold text-secondary-color'>
						<StyledNavLink to='/movies'>Фильмы</StyledNavLink>
						<StyledNavLink to='/serials'>Сериалы</StyledNavLink>
						{user && <StyledNavLink to='/support'>Поддержка</StyledNavLink>}
					</div>
				</div>

				<div className=''></div>

				<div className='grid grid-cols-[auto_auto_auto_auto] items-center gap-1.5 sm:gap-4 md:gap-5 xl:gap-6'>
					<SubscribeBadge />
					<div className='flex-none md:flex-shrink-0 z-50'>
						<ThemeToggler />
					</div>
					<SearchBadge />
					<AccountBadge />
				</div>
			</div>
		</nav>
	)
}
