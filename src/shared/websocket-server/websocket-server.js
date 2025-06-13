import http from 'http'
import { WebSocketServer } from 'ws'

const PORT = 3000
const server = http.createServer()
const wss = new WebSocketServer({ server, path: '/ws' })

const clients = []

const sendJson = (ws, obj) => {
	ws.send(JSON.stringify(obj))
}

wss.on('connection', (ws) => {
	let currentUser = null

	ws.on('message', (msg) => {
		try {
			const parsed = JSON.parse(msg.toString())
			console.log('Получено сообщение на сервере:', parsed)

			if (parsed.type === 'CONNECT') {
				const { chatId, userId } = parsed
				currentUser = { ws, chatId, userId }
				clients.push(currentUser)
				console.log(`🟢 ${userId} подключился к чату ${chatId}`)
				return
			}

			if (parsed.type === 'PING') return

			if (parsed.content) {
				const fullMessage = {
					id: parsed.id || crypto.randomUUID(),
					type: parsed.type,
					content: parsed.content,
					chatId: parsed.chatId,
					userId: parsed.userId,
					createdAt: parsed.createdAt || Date.now(),
					filename: parsed.filename,
					filetype: parsed.filetype,
				}

				console.log('Рассылка сообщения:', fullMessage)
				clients.forEach((client) => {
					console.log(`Отправка пользователю ${client.userId}`)
					if (client.chatId === fullMessage.chatId)
						sendJson(client.ws, fullMessage)
				})
			}
		} catch (e) {
			console.error('❌ Ошибка при обработке сообщения', e)
		}
	})

	ws.on('close', () => {
		const idx = clients.findIndex((c) => c.ws === ws)
		if (idx !== -1) clients.splice(idx, 1)
	})
})

server.listen(PORT, () => {
	console.log(`🚀 WebSocket сервер работает на ws://localhost:${PORT}/ws`)
})
