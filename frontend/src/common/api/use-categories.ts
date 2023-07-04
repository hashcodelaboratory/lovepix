import { useQuery, UseQueryResult } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'

export const CATEGORIES_KEY = 'CATEGORIES'

export type CategoryType = {
  id: string
  name: string
}

const getCategories = async (): Promise<CategoryType[]> => {
  const querySnapshot = await getDocs(
    collection(database, Collections.CATEGORIES)
  )
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as CategoryType)
  )
}

export const useCategories = (): UseQueryResult<CategoryType[]> =>
  useQuery([CATEGORIES_KEY], () => getCategories())
