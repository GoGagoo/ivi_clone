export interface ChatMessage {
  id: string
  chatId: string
  userId: string
  type: 'TEXT' | 'FILE' | 'VOICE'
  content: string 
  createdAt: number
  filename?: string
  filetype?: string
}