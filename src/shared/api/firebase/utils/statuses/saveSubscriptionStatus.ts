import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../auth'

export const saveSubscriptionStatus = async (uid: string) => {
	await setDoc(doc(db, 'subscription', uid), {
		activated: true,
		activatedAt: new Date().toISOString(),
	})
}
