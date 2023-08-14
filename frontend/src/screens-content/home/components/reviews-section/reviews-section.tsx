import { Container } from '@mui/material'
import React from 'react'
import ReviewList from 'screens-content/reviews/components/review-list/review-list'
import styles from './review-section.module.scss'
import { Pages } from 'constants/pages/urls'
import PreviewRow from '../preview-section/components/preview-row/preview-row'
import { localizationKey } from 'localization/localization-key'
import { useReviews } from 'common/api/use-reviews'

const ReviewsSection = () => {
  const { data: reviews } = useReviews()

  console.log(reviews)

  if (!reviews?.length) {
    return null
  }

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow
        title={localizationKey.reviewPageYourReviews}
        route={Pages.REVIEWS}
      >
        <div className={styles.reviewContainer}>
          <ReviewList reviews={reviews} />
        </div>
      </PreviewRow>
    </Container>
  )
}

export default ReviewsSection
