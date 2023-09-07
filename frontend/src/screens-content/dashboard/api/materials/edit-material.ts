import { MutationOptions, useMutation, UseMutationResult } from 'react-query'

export type EditMaterialRequest = {
  id: string
  availability: boolean
}

const editMaterial = async (data: EditMaterialRequest) => {
  const res = await fetch('/api/materials/edit', {
    method: 'POST',
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
