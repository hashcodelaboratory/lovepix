import { useQuery, UseQueryResult } from 'react-query'
import { Material } from '../enums/material'

export const DIMENSIONS_KEY = 'DIMENSIONS'

export type DimensionPrice = {
  [Material.DIBOND]: number
  [Material.ACRYLIC]: number
  [Material.POSTER]: number
  [Material.CANVAS]: number
  [Material.FOAM]: number
}

export type DimensionType = {
  id: string
  name: string
  price: DimensionPrice
}

const getDimensions = async (): Promise<DimensionType[]> => {
  const res = await fetch(`/api/dimensions`)

  return res.json()
}

export const useDimensions = (): UseQueryResult<DimensionType[]> =>
  useQuery([DIMENSIONS_KEY], () => getDimensions())
