import { useQuery, UseQueryResult } from 'react-query'
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
  const res = await fetch('/api/materials')

  return res.json()
}

export const useMaterials = (): UseQueryResult<MaterialType[]> =>
  useQuery([MATERIALS_KEY], () => getMaterials())
