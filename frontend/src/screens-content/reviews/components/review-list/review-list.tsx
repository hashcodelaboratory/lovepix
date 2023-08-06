import { ReviewType, useReviews } from 'common/api/use-reviews'
import React from 'react'
import SingleReview from '../single-review/single-review'

const ReviewList = () => {
  const { data: reviews } = useReviews()

  const reviewList = reviews
    ?.sort((a: ReviewType, b: ReviewType) => (a.date < b.date ? 1 : -1))
    .map((item) => <SingleReview key={item.id} reviewItems={item} />)

  return <>{reviewList}</>
}

export default ReviewList
