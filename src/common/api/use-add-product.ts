import { useQuery, UseQueryResult } from 'react-query'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'
import { doc, setDoc } from 'firebase/firestore'

export const ADD_PRODUCT_KEY = 'ADD_PRODUCTS'

const addProduct = async (docData: any) => {
  const querySnapshot = await setDoc(
    doc(database, Collections.PRODUCTS, `P${Date.now()}`),
    docData
  )
  return querySnapshot
}

export const useProducts = (docData: any): UseQueryResult<any[]> =>
  useQuery([ADD_PRODUCT_KEY], () => addProduct(docData))
