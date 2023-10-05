import { ReviewType } from 'common/api/use-reviews'
import React from 'react'
import SingleReview from '../single-review/single-review'
import { v4 as uuidv4 } from 'uuid'

type ReviewList = {
  reviews: ReviewType[] | undefined
}

const ReviewList = ({ reviews }: ReviewList) => {
  const reviewList = reviews
    ?.sort((a: ReviewType, b: ReviewType) => (a.date < b.date ? 1 : -1))
    .map((item: ReviewType, index) => (
      <SingleReview key={`${item.id}_${uuidv4()}`} reviewItems={item} />
    ))

  return <>{reviewList}</>
}

export default ReviewList
