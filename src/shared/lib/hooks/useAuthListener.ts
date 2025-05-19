import { auth } from '@shared/api/firebase/auth'
import type { FirebaseUser } from '@shared/api/firebase/lib/types/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

export const useAuthListener = () => {
	const [user, setUser] = useState<FirebaseUser | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

		return () => unsubscribe()

	}, [])

	return { user, loading }
}
