import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'

class VoucherService {
  public updateLimit = async (limit?: number, code?: string) => {
    if (limit && code && (limit ?? 0) >= 0) {
      const q = query(
        collection(database, Collections.VOUCHERS),
        where('code', '==', code)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, { limit: limit.toString() })
      })
    }
  }
}

export const voucherService = new VoucherService()
