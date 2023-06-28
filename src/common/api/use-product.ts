import { useQuery, UseQueryResult } from 'react-query'
import { doc } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'
import { getDoc } from 'firebase/firestore'

export const PRODUCT_KEY = 'PRODUCT'

type ProductType = {
  title: string
  image: string
  price: number
  description: string
  count: number
}

const getProduct = async (id: string): Promise<ProductType> => {
  const querySnapshot = await getDoc(doc(database, Collections.PRODUCTS, id))
  return querySnapshot.data() as ProductType
}

export const useProduct = (id: string): UseQueryResult<ProductType> =>
  useQuery([PRODUCT_KEY], () => getProduct(id))
