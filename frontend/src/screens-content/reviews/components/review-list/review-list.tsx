import { Typography } from '@mui/material'
import { ReviewType, useReviews } from 'common/api/use-reviews'
import React from 'react'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import SingleReview from '../single-review/single-review'

const ReviewList = () => {
  const { t } = useTranslation()
  const { data: reviews } = useReviews()

  const reviewBlock = reviews
    ?.sort((a: ReviewType, b: ReviewType) => (a.date < b.date ? 1 : -1))
    .map((item) => <SingleReview key={item.id} reviewItems={item} />)

  return (
    <div>
      <Typography variant='h5'>
        {t(localizationKey.reviewPageYourReviews)}
      </Typography>
      {reviewBlock}
    </div>
  )
}

export default ReviewList
