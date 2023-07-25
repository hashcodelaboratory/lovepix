import { useQuery, UseQueryResult } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'

export const PRODUCT_KEY = 'PRODUCTS_DASHBOARD'

export type ProductsType = {
  id: string
  title: string
  image: string
  price: number
  description: string
  count: number
}

export const getProducts = async (): Promise<ProductsType[]> => {
  const allProducts = collection(database, Collections.PRODUCTS)

  const querySnapshot = await getDocs(allProducts)

  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductsType)
  )
}

export const useProducts = (): UseQueryResult<ProductsType[]> =>
  useQuery([PRODUCT_KEY], () => getProducts())
