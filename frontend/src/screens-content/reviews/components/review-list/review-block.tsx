import { Typography } from '@mui/material'
import React from 'react'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import ReviewList from './review-list'

const ReviewBlock = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Typography variant='h5'>
        {t(localizationKey.reviewPageYourReviews)}
      </Typography>
      <ReviewList />
    </div>
  )
}

export default ReviewBlock
