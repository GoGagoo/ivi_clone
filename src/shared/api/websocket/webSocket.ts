import { WS_URL } from '@shared/api/firebase/auth/constants'
import type { ChatMessage } from '@shared/ui/SupportChatMessage/types/chat-message'

let socket: WebSocket | null = null
let socketReady: Promise<void> | null = null
let pingInterval: number | undefined

const startWebSocket = (chatId: string, userId: string): WebSocket => {
	if (!chatId || !userId) {
		console.error('WebSocket: Не указан chatId или userId')
		throw new Error('Требуется chatId и userId')
	}

	if (socket) return socket

	const ws = new WebSocket(WS_URL)
	socket = ws

	socketReady = new Promise((resolve, reject) => {
		ws.addEventListener('open', () => {
			console.log('🟢 Подключение:', { chatId, userId })
			socket?.send(JSON.stringify({ type: 'CONNECT', chatId, userId }))
			resolve()

			pingInterval = window.setInterval(() => {
				socket?.send(JSON.stringify({ type: 'PING' }))
			}, 10000)
		})

		ws.addEventListener('error', (err) => {
			console.error('❌ WebSocket ошибка:', err)
			reject(err)
		})

		ws.addEventListener('close', () => {
			clearInterval(pingInterval)
			socket = null
			socketReady = null
			console.log('WebSocket closed')
		})
	})

	return ws
}

export const sendMessage = async (message: ChatMessage) => {
	await socketReady
	if (socket?.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(message))
	} else {
		console.warn('WebSocket не подключён')
	}
}

export default startWebSocket
