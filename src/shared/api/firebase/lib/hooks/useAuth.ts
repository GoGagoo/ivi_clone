import { auth } from '@shared/api/firebase/auth'
import { getAuthErrorMessage } from '@shared/api/firebase/utils/getAuthErrorMessage'
import { FirebaseError } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth'

const signUp = async (email: string, password: string, displayName: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)

		await updateProfile(userCredential.user, {
			displayName,
		})

		const user = userCredential.user
		const idToken = await user.getIdToken()

		localStorage.setItem('firebaseUserToken', idToken)

		return userCredential.user
	} catch (err) {
		if (err instanceof FirebaseError) {
			const errorMessage = getAuthErrorMessage(err.code)
			const error = new Error(errorMessage)
			throw error
		}
		throw new Error('Произошла неизвестная ошибка при регистрации')
	}
}

const signIn = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)

		const user = userCredential.user
		const idToken = await user.getIdToken()

		localStorage.setItem('firebaseUserToken', idToken)

		return userCredential.user
	} catch (err) {
		if (err instanceof FirebaseError) {
			throw new Error(getAuthErrorMessage(err.code))
		}
		throw new Error('Произошла неизвестная ошибка')
	}
}

const logOut = async (): Promise<void> => {
	try {
		await signOut(auth)
		localStorage.removeItem('firebaseUserToken')
	} catch (error) {
		console.error('Полная ошибка при выходе:', error)
		if (error instanceof Error)
			throw new Error(`Не удалось выйти из системы: ${error.message}`)

		throw new Error('Не удалось выйти из системы по неизвестной причине')
	}
}

export { logOut, signIn, signUp }
