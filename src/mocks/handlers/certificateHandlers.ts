import { Response } from 'miragejs'

let usedCodes = new Set<string>()
let hasCertificate = false

export function postCertificateActivateHandler(schema: any, request: any) {
	const { code } = JSON.parse(request.requestBody)

	if (usedCodes.has(code))
		return new Response(400, {}, { message: 'Промокод уже использован' })

	usedCodes.add(code)
	hasCertificate = true
	return { success: true }
}

export function getCertificateCheckHandler() {
	return {
		success: true,
		hasCertificate,
		message: hasCertificate
			? 'Сертификат активирован'
			: 'Сертификат не активирован',
	}
}
