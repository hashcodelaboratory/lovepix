import { useQuery, UseQueryResult } from 'react-query'
import { Material } from '../enums/material'

export const DIMENSION_KEY = 'DIMENSION'

export type DimensionPrice = {
  [Material.DIBOND]: number
  [Material.ACRYLIC]: number
  [Material.POSTER]: number
  [Material.CANVAS]: number
}

export type DimensionType = {
  id: string
  name: string
  price: DimensionPrice
}

const getDimensionById = async (id: string): Promise<DimensionType[]> => {
  const res = await fetch(`/api/dimensions/${id}`)

  return res.json()
}

export const useDimension = (id: string): UseQueryResult<DimensionType> =>
  useQuery([DIMENSION_KEY], () => getDimensionById(id))
