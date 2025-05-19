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

		const user = userCredential.user
		const idToken = await user.getIdToken()

		localStorage.setItem('firebaseUserToken', idToken)
		localStorage.setItem(
			'userData',
			JSON.stringify({
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
				username: user.displayName || 'user' + user.uid.slice(0, 4),
			})
		)

		await updateProfile(userCredential.user, {
			displayName: displayName,
		})

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

const logOut = async () => {
	try {
		await signOut(auth)
	} catch (error) {
		console.error(error)
	}
}

export { logOut, signIn, signUp }
