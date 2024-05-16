import { useQuery, UseQueryResult } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'

export const CATEGORIES_ESHOP_KEY = 'CATEGORIES_ESHOP'

export type CategoryEshopType = {
  id: string
  name: string
}

const getEshopCategories = async (): Promise<CategoryEshopType[]> => {
  const querySnapshot = await getDocs(
    collection(database, Collections.CATEGORIES_ESHOP)
  )
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as CategoryEshopType)
  )
}

export const useCategoriesEshop = (): UseQueryResult<CategoryEshopType[]> =>
  useQuery([CATEGORIES_ESHOP_KEY], () => getEshopCategories())
