import {database, storage} from '../../../../common/firebase/config'
import {QueryClient} from 'react-query'
import {ORDERS_KEY} from './utils/keys'
import {deleteDoc, doc} from '@firebase/firestore'
import {Collections} from '../../../../common/firebase/enums'
import {deleteObject, ref} from "@firebase/storage";
import {StorageFolder} from "../../../../common/firebase/storage/enums";

export const removeOrders = async (
  selectedRows: string[],
  queryClient: QueryClient
) => {
  const promises: Promise<void>[] = selectedRows.reduce((acc: Promise<void>[], id: string) => [
    ...acc,
    ...[
      deleteDoc(doc(database, Collections.ORDERS, id)),
      deleteObject(ref(storage, `${StorageFolder.ORDERS}/${id}/images/origin`)),
      deleteObject(ref(storage, `${StorageFolder.ORDERS}/${id}/images/updated`))
    ]
  ], [])

  await Promise.all(promises)
  await queryClient.invalidateQueries(ORDERS_KEY)
}
