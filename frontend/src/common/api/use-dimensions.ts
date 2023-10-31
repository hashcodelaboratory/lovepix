import { useQuery, UseQueryResult } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'

export const DIMENSIONS_KEY = 'DIMENSIONS'

export type DimensionType = {
  id: string
  name: string
  price?: number
}

const getDimensions = async (): Promise<DimensionType[]> => {
  const querySnapshot = await getDocs(
    collection(database, Collections.DIMENSIONS)
  )
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as DimensionType)
  )
}

export const useDimensions = (): UseQueryResult<DimensionType[]> =>
  useQuery([DIMENSIONS_KEY], () => getDimensions())
