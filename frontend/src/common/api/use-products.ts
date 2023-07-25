import { useQuery, UseQueryResult } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'
import { query, where } from 'firebase/firestore'

export const PRODUCT_KEY = 'PRODUCTS'

export type ProductsType = {
  id: string
  title: string
  image: string
  price: number
  description: string
  count: number
}

const getProductsByCategory = async (category: string) => {
  const querySnapshot = await getDocs(
    query(
      collection(database, Collections.PRODUCTS),
      where('category', '==', category)
    )
  )
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductsType)
  )
}

export const getAllProducts = async (): Promise<ProductsType[]> => {
  const querySnapshot = await getDocs(
    collection(database, Collections.PRODUCTS)
  )
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductsType)
  )
}

const getProducts = (category: string | null | undefined) => {
  if (category) {
    return getProductsByCategory(category)
  } else {
    return getAllProducts()
  }
}

export const useProducts = (
  category?: string | null
): UseQueryResult<ProductsType[]> =>
  useQuery([PRODUCT_KEY, category], () => getProducts(category))
