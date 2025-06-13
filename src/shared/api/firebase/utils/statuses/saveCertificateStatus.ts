import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../auth'

export const saveCertificateStatus = async (uid: string) => {
	await setDoc(doc(db, 'certificates', uid), {
		activated: true,
		activatedAt: new Date().toISOString(),
	})
}
