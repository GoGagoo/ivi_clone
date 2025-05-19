import { signIn } from '@shared/api/firebase/lib/hooks/useAuth'
import { Button, Input } from '@shared/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
	email: z
		.string()
		.min(1, 'Эл. почта обязательна')
		.email('Введите корректную эл. почту'),
	password: z
		.string()
		.min(1, 'Пароль обязателен')
		.min(6, 'Пароль должен содержать минимум 6 символов'),
})

type FormData = z.infer<typeof schema>

export const Login = () => {
	const [firebaseError, setFirebaseError] = useState<string | null>(null)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid, isDirty },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const onSubmit = async (data: FormData) => {
		setFirebaseError(null)

		try {
			await signIn(data.email, data.password)
			navigate('/')
		} catch (error: any) {
			console.error('Registration error:', error.code, error.message)

			if (error.code) {
				switch (error.code) {
					case 'auth/email-already-in-use':
					case 'auth/invalid-email':
						setError('email', { type: 'manual', message: error.message })
						break
					case 'auth/weak-password':
						setError('password', { type: 'manual', message: error.message })
						break
					default:
						setFirebaseError(error.message)
				}
			} else {
				setFirebaseError(error.message || 'Произошла неизвестная ошибка')
			}
		}
	}

	return (
		<div className='grid place-items-center space-y-4 mt-14'>
			<p className='text-xl md:text-4xl font-bold'>Вход в систему Иви</p>
			<div className='border rounded-xl bg-[#3f3a5d] border-secondary-color w-[300px] md:w-[600px]'>
				<div className='my-10'>
					<div className='grid place-items-center col-md-6 offset-md-3 col-xs-12'>
						<Link className='text-md text-[var(--secondary-color)] hover:text-white dark:hover:text-white dark:text-gray-300' to='/register'>
							У вас нет аккаунта? Создайте
						</Link>
						<form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
							<fieldset className='mt-5 px-10 lg:px-0 max-w-auto'>
								<div className='min-h-[80px] w-full'>
									<Input
										{...register('email')}
										type='email'
										icon='email'
										label='Эл. почта'
									/>
									{errors.email && (
										<p className='text-sm text-red-500 my-2'>
											{errors.email.message}
										</p>
									)}
								</div>
								<div className='min-h-[80px]'>
									<Input
										{...register('password')}
										type='password'
										icon='password'
										label='Пароль'
									/>
									{errors.password && (
										<p className='text-sm text-red-500 my-2'>
											{errors.password.message}
										</p>
									)}
									{firebaseError && (
										<div className='grid mt-5 place-items-center text-sm  text-red-500'>
											{firebaseError}
										</div>
									)}
								</div>
							</fieldset>
							<div className='place-items-center'>
								<div className='mt-3'>
									<Button
										className='border border-[#858585] rounded-xl focus:border-white outline-none focus:ring-2 transition-colors ease-in-out duration-300 dark:hover:bg-[var(--hover-primary-color)] hover:bg-[var(--primary-color)]'
										disabled={!isValid || !isDirty}
										type='submit'
									>
										Войти в систему
									</Button>
								</div>
								<div className='mt-3'>
									<Button
										className='border border-[#858585] rounded-xl focus:border-white outline-none focus:ring-2 transition-colors ease-in-out duration-300 dark:hover:bg-[var(--hover-primary-color)] hover:bg-[var(--primary-color)]'
										disabled={!isDirty}
										onClick={() => reset()}
									>
										Очистить форму
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
