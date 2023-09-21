import { Container } from '@mui/material'
import React from 'react'
import ReviewList from 'screens-content/reviews/components/review-list/review-list'
import { Pages } from 'constants/pages/urls'
import GalleryRow from '../gallery-section/components/gallery-row/gallery-row'
import { localizationKey } from 'localization/localization-key'
import { useReviews } from 'common/api/use-reviews'
import { useTranslation } from 'next-i18next'
import Shimmer, {
  SkeletonEnum,
} from '../../../../common/components/shimmer/shimmer'

const ReviewsSection = () => {
  const { data: reviews, isLoading } = useReviews()
  const { t } = useTranslation()

  if (!reviews?.length && !isLoading) {
    return null
  }

  return (
    <Container style={{ marginBottom: 30 }}>
      <GalleryRow
        title={localizationKey.reviewPageYourReviews}
        route={t(Pages.REVIEWS)}
      >
        <Shimmer isLoading={isLoading} skeleton={SkeletonEnum.REVIEW}>
          <ReviewList reviews={reviews} />
        </Shimmer>
      </GalleryRow>
    </Container>
  )
}

export default ReviewsSection
