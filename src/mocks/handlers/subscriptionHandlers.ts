import { Response } from 'miragejs'

let usedCodes = new Set<string>()
let hasSubscription = false

export function postSubscriptionActivateHandler(schema: any, request: any) {
	const { code } = JSON.parse(request.requestBody)

	if (usedCodes.has(code))
		return new Response(400, {}, { message: 'Подписка уже активирована' })

	usedCodes.add(code)
	hasSubscription = true
	return { success: true }
}

export function getSubscriptionCheckHandler() {
	return {
		success: true,
		hasSubscription,
		message: hasSubscription
			? 'Подписка активирована'
			: 'Подписка не активирована',
	}
}
