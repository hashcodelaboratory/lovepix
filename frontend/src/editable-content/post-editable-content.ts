import { MutationOptions, useMutation, UseMutationResult } from 'react-query'

export type PostEditableContentRequest = {
  id: string
  content: string | undefined
}

export const postEditableContent = async ({
  id,
  content,
}: PostEditableContentRequest) => {
  const body = {
    content,
  }

  return await fetch(`/api/content/update/${id}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export const usePostEditableContent = (
  options?: MutationOptions<unknown, unknown, PostEditableContentRequest>
): UseMutationResult<unknown, unknown, PostEditableContentRequest> =>
  useMutation(postEditableContent, options)
