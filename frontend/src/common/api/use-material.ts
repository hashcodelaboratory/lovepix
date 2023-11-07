import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { MaterialType } from './use-materials'

export const MATERIAL_KEY = 'MATERIAL'

const getMaterialById = async (id?: string): Promise<MaterialType> => {
  if (id) {
    const res = await fetch(`/api/materials/${id}`)

    return res.json()
  } else {
    return new Response(null, { status: 400, statusText: 'Bad request' }).json()
  }
}

export const useMaterial = (
  id?: string,
  options?: UseQueryOptions<any, any, any, any>
): UseQueryResult<MaterialType> =>
  useQuery([MATERIAL_KEY], () => getMaterialById(id), options)
