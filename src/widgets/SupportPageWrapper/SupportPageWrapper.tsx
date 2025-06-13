import { SupportPage } from '@/pages'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'

export const SupportPageWrapper: React.FC = () => {
  const { user } = useAuthListener()

  if (!user) return <div>Требуется авторизация</div>

  const isCloneTab = new URLSearchParams(window.location.search).get('clone') === 'true'
  const chatId = user.uid
  const userId = isCloneTab ? `${user.uid}__clone` : user.uid

  return <SupportPage chatId={chatId} userId={userId} />
}
