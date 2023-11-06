import { useQuery, UseQueryResult } from 'react-query'
import { collection, getDocs } from '@firebase/firestore'
import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'
import { Material } from '../enums/material'

export const MATERIALS_KEY = 'MATERIALS'

export type MaterialType = {
  id: string
  title: string
  image: string
  subtitle: string
  description: string
  availability: boolean
  type: Material
  delivery?: string
}

const getMaterials = async (): Promise<MaterialType[]> => {
  const querySnapshot = await getDocs(
    collection(database, Collections.MATERIALS)
  )
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as MaterialType)
  )
}

export const useMaterials = (): UseQueryResult<MaterialType[]> =>
  useQuery([MATERIALS_KEY], () => getMaterials())
