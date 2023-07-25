import { MutationOptions, UseMutationResult, useMutation } from 'react-query'
import { FormReview } from 'screens-content/reviews/components/add-review/add-review'

export type AddReviewRequest = {
  data: FormReview
  rating: number | null
}

export const addReview = async (data: AddReviewRequest) => {
  const body = {
    date: Date.now(),
    name: data.data.name,
    email: data.data.email,
    review: data.data.review,
    rating: data.rating,
  }
  return await fetch('/api/review/create', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export const useAddReview = (
  options?: MutationOptions<any, any, AddReviewRequest>
): UseMutationResult<any, any, AddReviewRequest> =>
  useMutation(addReview, options)
