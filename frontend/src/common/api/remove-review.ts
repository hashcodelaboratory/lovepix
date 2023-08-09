import { MutationOptions, UseMutationResult, useMutation } from 'react-query'

export type RemoveReview = {
  id: string
}

export const removeReview = async ({ id }: RemoveReview) => {
  return await fetch('/api/review/remove', {
    method: 'POST',
    body: JSON.stringify(id),
  })
}

export const useRemoveReview = (
  options?: MutationOptions<any, any, RemoveReview>
): UseMutationResult<any, any, RemoveReview> =>
  useMutation(removeReview, options)
