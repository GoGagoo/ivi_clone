import { SupportPage } from '@/pages'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'
import { useClone } from './lib/hooks/useClone.ts'

export const SupportPageWrapper: React.FC = () => {
  const { user } = useAuthListener()

  if (!user) return <div>Требуется авторизация</div>

  const isCloneTab = useClone()
  const chatId = user.uid
  const userId = isCloneTab ? `${user.uid}__clone` : user.uid

  return <SupportPage chatId={chatId} userId={userId} />
}
