import { database, storage } from 'common/firebase/config'
import { Collections } from 'common/firebase/enums'
import { deleteDoc, doc } from 'firebase/firestore'
import { QueryClient } from 'react-query'
import { StorageFolder } from 'common/firebase/storage/enums'
import { ref, deleteObject } from '@firebase/storage'
import { PRODUCTS_KEY } from './use-products'

const removeProduct = async (id: string, queryClient: QueryClient) => {
  await deleteDoc(doc(database, Collections.PRODUCTS, id))
  queryClient.invalidateQueries(PRODUCTS_KEY)
  return ''
}

export const removeUploadedProductImage = async (
  id: string,
  name: string,
  queryClient: QueryClient
) => {
  const path = `${StorageFolder.PRODUCTS}/${name}`
  await deleteObject(ref(storage, path))
  removeProduct(id, queryClient)
}
