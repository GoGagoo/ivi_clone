import { Navigate } from 'react-router-dom'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'

interface Props {
	children: React.ReactNode
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const { user, loading } = useAuthListener()

	if (loading) return null 

	if (!user) return <Navigate to="/login" replace />

	return <>{children}</>
}
