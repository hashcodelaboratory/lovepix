import {database, storage} from '../../../../common/firebase/config'
import { QueryClient } from 'react-query'
import { ORDERS_KEY } from './utils/keys'
import { deleteDoc, doc } from '@firebase/firestore'
import { Collections } from '../../../../common/firebase/enums'
import {deleteObject, ref} from "@firebase/storage";
import {StorageFolder} from "../../../../common/firebase/storage/enums";

export const removeOrders = (
  selectedRows: string[],
  queryClient: QueryClient
): string => {
  selectedRows.forEach(async (id) => {
    await deleteDoc(doc(database, Collections.ORDERS, id))
    await deleteObject(ref(storage, `${StorageFolder.ORDERS}/${id}/images/origin`))
    await deleteObject(ref(storage, `${StorageFolder.ORDERS}/${id}/images/updated`))
    await queryClient.invalidateQueries(ORDERS_KEY)
  })
  return ''
}
