import { MutationOptions, useMutation, UseMutationResult } from 'react-query'

export type EditMaterialRequest = {
  id: string
  availability: boolean
  delivery: string
}

const editMaterial = async (data: EditMaterialRequest) => {
  const res = await fetch(`/api/materials/${data.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...data,
    }),
  })

  return res.json()
}
export const useEditMaterial = (
  options?: MutationOptions<any, any, EditMaterialRequest>
): UseMutationResult<any, any, EditMaterialRequest> =>
  useMutation(editMaterial, options)
