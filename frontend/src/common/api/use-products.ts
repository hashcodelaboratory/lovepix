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

export const getProducts = async (
  category: string | null
): Promise<ProductsType[]> => {
  const allProducts = collection(database, Collections.PRODUCTS)

  const filteredProducts = query(
    collection(database, Collections.PRODUCTS),
    where('category', '==', category)
  )

  const option = category !== null ? filteredProducts : allProducts

  const querySnapshot = await getDocs(option)

  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductsType)
  )
}

export const useProducts = (
  category: string | null
): UseQueryResult<ProductsType[]> =>
  useQuery([PRODUCT_KEY, category], () => getProducts(category))
