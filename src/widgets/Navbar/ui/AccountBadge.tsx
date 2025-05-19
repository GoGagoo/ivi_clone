import { useAuthListener } from '@shared/lib/hooks/useAuthListener'
import { Button } from '@shared/uikit'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const AccountBadge = () => {
  const { user } = useAuthListener()

  const buttonContent = (
    <div className='flex items-center xl:gap-1'>
        <FiUser
          className='max-w-[25px] xl:max-w-none'
          color='#ffffff71'
          size={20}
        />
      <span className='hidden xl:inline'>{user ? 'Аккаунт' : 'Войти'}</span>
    </div>
  )

  return (
    <Link to={user ? '/profile/:slug' : '/login'}>
      <Button
        className='h-auto whitespace-nowrap text-secondary-color transform transition duration-500 dark:hover:bg-[var(--hover-primary-color)] hover:bg-[var(--primary-color)] hover:scale-105 rounded-xl'
        size='sm'
        variant='primary'
      >
        {buttonContent}
      </Button>
    </Link>
  )
}