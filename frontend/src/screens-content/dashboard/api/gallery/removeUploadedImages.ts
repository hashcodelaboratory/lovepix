import { deleteObject, ref } from '@firebase/storage'
import { database, storage } from '../../../../common/firebase/config'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from '@firebase/firestore'
import { Collections } from '../../../../common/firebase/enums'

export const removeUploadedImages = (selectedRows: string[]): string => {
  selectedRows.forEach(async (row) => {
    await deleteObject(ref(storage, `${row}`))
    const q = query(
      collection(database, Collections.GALLERY),
      where('fullPath', '==', `${row}`)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (_doc) => {
      await deleteDoc(doc(database, Collections.GALLERY, _doc.id))
    })
  })
  return ''
}
