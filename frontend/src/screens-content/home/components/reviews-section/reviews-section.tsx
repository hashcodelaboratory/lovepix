import { Container } from '@mui/material'
import React from 'react'
import ReviewList from 'screens-content/reviews/components/review-list/review-list'
import styles from './review-section.module.scss'
import { Pages } from 'constants/pages/urls'
import PreviewRow from '../preview-section/components/preview-row/preview-row'
import { localizationKey } from 'localization/localization-key'
import { useReviews } from 'common/api/use-reviews'
import { useTranslation } from 'next-i18next'
import ReviewSkeleton from 'screens-content/home/review-skeleton/review-skeleton'
import Shimmer, {
  SkeletonEnum,
} from '../../../../common/components/shimmer/shimmer'

const ReviewsSection = () => {
  const { data: reviews, isLoading } = useReviews()
  const { t } = useTranslation()

  const shimmers = [...Array(4)].map((index: number) => (
    <ReviewSkeleton key={index} />
  ))

  if (isLoading) {
    return (
      <Container style={{ marginBottom: 30 }}>
        <PreviewRow
          title={localizationKey.reviewPageYourReviews}
          route={t(Pages.REVIEWS)}
        >
          <Shimmer isLoading={isLoading} skeleton={SkeletonEnum.REVIEW}>
            {shimmers}
          </Shimmer>
        </PreviewRow>
      </Container>
    )
  }

  if (!reviews?.length) {
    return null
  }

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow
        title={localizationKey.reviewPageYourReviews}
        route={t(Pages.REVIEWS)}
      >
        <div className={styles.reviewContainer}>
          <ReviewList reviews={reviews} />
        </div>
      </PreviewRow>
    </Container>
  )
}

export default ReviewsSection
