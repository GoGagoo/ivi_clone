import { useAuthListener } from '@shared/lib/hooks/useAuthListener.ts'
import { FileMessage } from './FileMessage.tsx'
import type { ChatMessage } from './types/chat-message.ts'

interface Props {
  message: ChatMessage
  isOwn: boolean
}

export const SupportChatMessage: React.FC<Props> = ({ message, isOwn }) => {
  const { user } = useAuthListener()

  const renderMessageContent = () => {
    let actualType = message.type
    
    if (message.content.startsWith('data:audio')) {
      actualType = 'VOICE'
    } else if (message.content.startsWith('data:')) {
      actualType = 'FILE'
    } else {
      actualType = 'TEXT'
    }
    
    switch (actualType) {
      case 'TEXT':
				if (!message.content) return <span className="text-gray-400 italic">[Пустое сообщение]</span>
				return <span className="whitespace-pre-wrap break-all max-w-full">{message.content}</span>

      case 'FILE':
        if (!message.content) return <span className="text-gray-400 italic">[Файл не загружен]</span>
        return <FileMessage message={message} />

      case 'VOICE':
        if (!message.content) return <span className="text-gray-400 italic">[Аудио не загружено]</span>
        return (
          <audio 
            controls 
            src={message.content} 
            className="max-w-[130px]"
          />
        )

      default:
        console.warn('Неизвестный тип сообщения:', message.type)
        return <span className="text-gray-400 italic">[Неподдерживаемый тип сообщения]</span>
    }
  }

  return (
    <div
      className={`flex flex-col gap-1.5 w-full max-w-[85%] ${
        isOwn ? 'items-end ml-auto' : 'items-start mr-auto'
      }`}
    >
      {!isOwn && user?.displayName && (
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {user.displayName}
        </div>
      )}
      
      <div
        className={`p-3 rounded-2xl text-[var(--secondary-color)] w-fit ${
          isOwn 
            ? 'bg-[var(--primary-bg-color)] rounded-tr-none' 
            : 'bg-[#2d283e] rounded-tl-none'
        }`}
      >
        {renderMessageContent()}
      </div>
      
      <div className={`text-xs text-gray-500 ${isOwn ? 'text-right' : 'text-left'}`}>
        {message.createdAt
          ? new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '–'}
      </div>
    </div>
  )
}