import type { ChatMessage } from './types/chat-message'

interface Props {
  message: ChatMessage
}

export const FileMessage: React.FC<Props> = ({ message }) => {
  if (message.type !== 'FILE' || typeof message.content !== 'string') {
    return <span className="text-gray-400">[Некорректный файл]</span>
  }

  const filename = message.filename || 'Файл'
  const filetype = message.filetype || ''

  const isAudio = filetype.startsWith('audio/')
  const isVideo = filetype.startsWith('video/webm;base64')
  const isImage = filetype.startsWith('image/')

  return (
    <div className="flex flex-col items-start my-2.5 bg-gray-50 dark:bg-gray-600 rounded-xl p-2 w-full max-w-xs">
      <div className="w-full">
        <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-1">
          {filename}
        </span>
        <div className="flex justify-between items-center">
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
            {filetype}
          </span>
        </div>
        <div className="mt-2 w-full">
          {isAudio && (
            <audio controls src={message.content}  />
          )}
          {isVideo && (
            <video controls src={message.content} className="w-full" />
          )}
          {isImage && (
            <img src={message.content} alt={filename} className="w-full rounded" />
          )}
          {!isAudio && !isVideo && !isImage && (
            <a
              href={message.content}
              download={filename}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              Скачать
            </a>
          )}
        </div>
      </div>
    </div>
  )
}