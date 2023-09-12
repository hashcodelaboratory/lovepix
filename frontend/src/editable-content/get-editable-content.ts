import { MutationOptions, useMutation, UseMutationResult } from 'react-query'
import { EditablePage } from '../editable-pages/editable-page'

export type GetEditableContentRequest = {
  id: EditablePage
}

export const getEditableContent = ({ id }: GetEditableContentRequest) =>
  fetch(`/api/content/get/${id}`, {
    method: 'GET',
  })

export const useGetEditableContent = (
  options?: MutationOptions<Response, Error, GetEditableContentRequest>
): UseMutationResult<Response, Error, GetEditableContentRequest> =>
  useMutation(getEditableContent, options)
