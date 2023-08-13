import { Typography } from '@mui/material'
import React from 'react'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import ReviewList from './review-list'
import { useReviews } from 'common/api/use-reviews'

const ReviewBlock = () => {
  const { t } = useTranslation()
  const { data: reviews, isLoading } = useReviews()

  const content =
    !reviews?.length && isLoading ? (
      <ReviewList reviews={reviews} />
    ) : (
      <span>Buďte prvý kto nám napíše recenziu.</span>
    )

  return (
    <div>
      <Typography variant='h5'>
        {t(localizationKey.reviewPageYourReviews)}
      </Typography>
      {content}
    </div>
  )
}

export default ReviewBlock
