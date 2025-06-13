import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ChatMessage } from '@shared/ui/SupportChatMessage/types/chat-message'
import startWebSocket from './webSocket'

export const chatApi = createApi({
	reducerPath: 'chatApi',
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => ({
		connectToChat: builder.query<void, { chatId: string; userId: string }>({
			async queryFn() {
				return { data: undefined }
			},
			async onCacheEntryAdded(
				{ chatId, userId },
				{ cacheEntryRemoved, dispatch }
			) {
				const socket = startWebSocket(chatId, userId)

				const handleMessage = (event: MessageEvent) => {
					try {
						const message: ChatMessage = JSON.parse(event.data)
						console.log('Получено сообщение:', message)

						if (
							!['TEXT', 'FILE', 'VOICE', 'MESSAGE'].includes(message.type) ||
							!message.content ||
							!message.chatId
						) {
							console.log('Сообщение не прошло валидацию', message)
							return
						}

						dispatch(
							chatApi.util.updateQueryData(
								'getMessages',
								message.chatId,
								(draft) => {
									const exists = draft.some((m) => m.id === message.id)
									if (!exists) {
										draft.push({
											...message,
											content:
												typeof message.content === 'string'
													? message.content
													: String(message.content),
											createdAt: Number(message.createdAt) || Date.now(),
										})
									}
								}
							)
						)
					} catch (e) {
						console.error('Ошибка обработки сообщения:', e)
					}
				}

				socket.addEventListener('message', handleMessage)

				await cacheEntryRemoved

				socket.removeEventListener('message', handleMessage)
				socket.close()
				console.log('Socket and cache cleaned up')
			},
		}),
		getMessages: builder.query<ChatMessage[], string>({
			queryFn: () => {
				return { data: [] }
			},
		}),
	}),
})

export const { useConnectToChatQuery, useGetMessagesQuery } = chatApi
