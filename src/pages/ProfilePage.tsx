import { auth } from '@shared/api/firebase/auth'
import { Button, Divide } from '@shared/uikit'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
	const [authUser, setAuthUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setAuthUser(user)
			setLoading(false)
		})
		return () => unsubscribe()
	}, [])

	if (loading) return <div>Загрузка...</div>

	const userSignOut = () => {
		signOut(auth)
			.then(() => console.log('success'))
			.catch((e) => console.log(e))
			navigate('/')
	}

	const usernameFirstChar = authUser?.displayName?.charAt(0).toUpperCase()

	return (
		<>
			{authUser ? (
				<>
					<Divide />
					<div className='flex flex-row justify-between items-center mt-10'>
						<div className='space-x-7'>
							<span className='h-10 w-10 p-8 text-3xl font-bold rounded-3xl bg-[var(--subscribe-bg-from)] dark:bg-[var(--subscribe-color)]'>{usernameFirstChar}</span>
							<span className='text-2xl font-bold'>{`${authUser.displayName}`}</span>
						</div>
						<Button className='rounded-xl hover:bg-[var(--primary-color)] dark:hover:bg-[var(--hover-primary-color)] transition-colors hover:scale-105' onClick={userSignOut}>Выйти</Button>
					</div>
				</>
			) : null}
		</>
	)
}
