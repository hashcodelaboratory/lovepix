import { FormReview } from 'screens-content/reviews/components/add-review'

export const addReview = async (data: FormReview, rating: number | null) => {
  const body = {
    date: Date.now(),
    name: data.name,
    email: data.email,
    review: data.review,
    rating: rating,
  }
  return await fetch('/api/review/create', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
