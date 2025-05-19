import { useCallback, useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@shared/api/firebase/auth'
import { useAuthListener } from '@shared/lib/hooks/useAuthListener'

export const useCertificateStatus = () => {
	const { user } = useAuthListener()
	const [hasCertificate, setHasCertificate] = useState(false)
	const [loading, setLoading] = useState(true)

	const fetchStatus = useCallback(async () => {
		if (!user) return
		const ref = doc(db, 'certificates', user.uid)
		const snap = await getDoc(ref)
		if (snap.exists()) {
			setHasCertificate(snap.data().activated === true)
		} else {
			setHasCertificate(false)
		}
		setLoading(false)
	}, [user])

	useEffect(() => {
		if (user) fetchStatus()
	}, [user, fetchStatus])

	return { hasCertificate, loading, refetch: fetchStatus }
}