import { MutationOptions, useMutation, UseMutationResult } from 'react-query'
import { DimensionPrice } from '../../../../common/api/use-dimensions'

export type UpdateDimensionRequest = {
  id: string
  price: DimensionPrice
}
const updateDimension = async (data: UpdateDimensionRequest) => {
  const res = await fetch(`/api/dimensions/${data.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...data,
    }),
  })

  return res.json()
}

export const useUpdateDimension = (
  options?: MutationOptions<any, any, UpdateDimensionRequest>
): UseMutationResult<any, any, UpdateDimensionRequest> =>
  useMutation(updateDimension, options)
