import { Button } from '@/shared/uikit'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
	const navigate = useNavigate()

	return (
		<>
			<p className='text-subscribe-text'>Страница не найдена!</p>
			<hr />
			<Button onClick={() => navigate(-1)}>Вернуться назад</Button>
		</>
	)
}
