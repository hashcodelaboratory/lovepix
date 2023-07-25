import { useQuery, UseQueryResult } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'

export const CATEGORIES_ESHOP_KEY = 'CATEGORIES_ESHOP'

export type CategoryType = {
  id: string
  name: string
}

const getEshopCategories = async (): Promise<CategoryType[]> => {
  const querySnapshot = await getDocs(
    collection(database, Collections.CATEGORIES_ESHOP)
  )
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as CategoryType)
  )
}

export const useCategoriesEshop = (): UseQueryResult<CategoryType[]> =>
  useQuery([CATEGORIES_ESHOP_KEY], () => getEshopCategories())
