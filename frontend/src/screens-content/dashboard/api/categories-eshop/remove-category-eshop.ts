import { QueryClient } from 'react-query'
import { database } from '../../../../common/firebase/config'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from '@firebase/firestore'
import { Collections } from '../../../../common/firebase/enums'
import { DIMENSIONS_KEY } from '../../../../common/api/use-dimensions'

export const removeCategoryEshop = (
  selectedRows: string[],
  queryClient: QueryClient
): string => {
  selectedRows.forEach(async (row) => {
    const q = query(
      collection(database, Collections.CATEGORIES_ESHOP),
      where('name', '==', row)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (_doc) => {
      await deleteDoc(doc(database, Collections.CATEGORIES_ESHOP, _doc.id))
    })

    queryClient.invalidateQueries(DIMENSIONS_KEY)
  })
  return ''
}
