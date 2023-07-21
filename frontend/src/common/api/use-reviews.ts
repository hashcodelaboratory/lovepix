import { useQuery, UseQueryResult } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'

export const REVIEWS_KEY = 'REVIEWS'

export type ReviewType = {
  id: string
  name: string
  email: string
  date: number
  review: string
  rating: number
}

const getReviews = async (): Promise<ReviewType[]> => {
  const querySnapshot = await getDocs(collection(database, Collections.REVIEWS))
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ReviewType)
  )
}

export const useReviews = (): UseQueryResult<ReviewType[]> =>
  useQuery([REVIEWS_KEY], () => getReviews())
