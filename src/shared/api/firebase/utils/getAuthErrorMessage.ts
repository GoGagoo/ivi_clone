export const getAuthErrorMessage = (firebaseError: string): string => {
	const errorMap: Record<string, string> = {
		'auth/invalid-email': 'Введите корректный email',
		'auth/email-already-in-use': 'Этот email уже зарегистрирован',
		'auth/user-not-found': 'Пользователь с таким email не найден',
		'auth/wrong-password': 'Неверный пароль',
		'auth/weak-password': 'Пароль должен содержать минимум 6 символов',
		'auth/invalid-credential': 'Неверные учетные данные',
		'auth/operation-not-allowed': 'Операция не разрешена',
	}

	return errorMap[firebaseError] || 'Произошла ошибка. Повторите попытку'
}
