import { ChatPanel } from '@/widgets'
import {
	useConnectToChatQuery,
	useGetMessagesQuery,
} from '@entities/api/websocket/chatApi'
import { sendMessage } from '@entities/api/websocket/webSocket'
import { SupportChatMessage } from '@shared/ui/SupportChatMessage/SupportChatMessage.tsx'
import type { ChatMessage } from '@shared/ui/SupportChatMessage/types/chat-message'
import { useState } from 'react'

interface Props {
	chatId: string
	userId: string
}

export const SupportPage: React.FC<Props> = ({ chatId, userId }) => {
	const [text, setText] = useState('')

	const { data: messages = [] } = useGetMessagesQuery(chatId, {
		refetchOnMountOrArgChange: true,
	})
	useConnectToChatQuery({ chatId, userId })

	const handleSendText = () => {
	if (!text.trim()) return
	const msg: ChatMessage  = {
		id: crypto.randomUUID(),
		type: 'TEXT',
		chatId,
		userId,
		content: text,
		createdAt: Date.now(),
	}
	console.log('Отправка сообщения:', msg)
	sendMessage(msg)
	setText('')
}

	const handleFileChange = (file: File) => {
		const reader = new FileReader()
		reader.onloadend = () => {
			if (!reader.result) return
			sendMessage({
				id: crypto.randomUUID(),
				type: 'FILE',
				chatId,
				userId,
				filename: file.name,
				filetype: file.type,
				content: reader.result as string,
				createdAt: Date.now(),
			} satisfies ChatMessage)
		}
		reader.readAsDataURL(file)
	}

	const handleStartRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
		const mediaRecorder = new MediaRecorder(stream)
		const chunks: BlobPart[] = []

		mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
		mediaRecorder.onstop = () => {
			const blob = new Blob(chunks, { type: 'audio/webm' })
			const reader = new FileReader()
			reader.onloadend = () => {
				if (!reader.result) return
				sendMessage({
					id: crypto.randomUUID(),
					type: 'VOICE',
					chatId,
					userId,
					content: reader.result as string,
					createdAt: Date.now(),
				} satisfies ChatMessage)
			}
			reader.readAsDataURL(blob)
		}
		mediaRecorder.start()

		setTimeout(() => mediaRecorder.stop(), 3000)
	}

	const uniqueMessages = Array.from(new Map(messages.map((m) => [m.id, m])).values())

	if (!chatId || !userId) return <div>Ошибка: не указан chatId или userId</div>

	return (
		<div className='mt-10 px-20 pt-10 pb-5 w-2/3 mx-auto border rounded-lg shadow-md space-y-4 flex flex-col justify-center items-center'>
			{uniqueMessages.map((msg, index) => (
			<SupportChatMessage
					key={msg.id || `${msg.userId}-${msg.createdAt}-${index}`}
					message={msg}
					isOwn={msg.userId === userId}
				/>
			))}
			<ChatPanel 
				text={text}
				onChangeText={setText}
				onSendText={handleSendText}
				onSendFile={handleFileChange}
				onSendVoice={handleStartRecording}
			/>
		</div>
	)
}
