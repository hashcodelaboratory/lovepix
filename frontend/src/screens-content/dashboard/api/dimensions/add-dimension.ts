import { MutationOptions, useMutation, UseMutationResult } from 'react-query'

export type AddDimensionRequest = {
  id: string
  name: string
}

const addDimension = async (data: AddDimensionRequest) => {
  const res = await fetch(`/api/dimensions/${data.id}`, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
    }),
  })

  return res.json()
}
export const useAddMaterial = (
  options?: MutationOptions<any, any, AddDimensionRequest>
): UseMutationResult<any, any, AddDimensionRequest> =>
  useMutation(addDimension, options)
