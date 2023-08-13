import { ReviewType } from 'common/api/use-reviews'
import React from 'react'
import SingleReview from '../single-review/single-review'

type ReviewList = {
  reviews: ReviewType[] | undefined
}

const ReviewList = ({ reviews }: ReviewList) => {
  const reviewList = reviews
    ?.sort((a: ReviewType, b: ReviewType) => (a.date < b.date ? 1 : -1))
    .map((item: ReviewType) => (
      <SingleReview key={item.id} reviewItems={item} />
    ))

  return <>{reviewList}</>
}

export default ReviewList
