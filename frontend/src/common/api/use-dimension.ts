import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
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

const getDimensionById = async (id?: string): Promise<DimensionType | any> => {
  if (id) {
    const res = await fetch(`/api/dimensions/${id}`)

    return res.json()
  } else {
    return new Response(null, { status: 400, statusText: 'Bad request' }).json()
  }
}

export const useDimension = (
  id?: string,
  options?: UseQueryOptions<any, any, any, any>
): UseQueryResult<DimensionType> =>
  useQuery([DIMENSION_KEY], () => getDimensionById(id), options)
