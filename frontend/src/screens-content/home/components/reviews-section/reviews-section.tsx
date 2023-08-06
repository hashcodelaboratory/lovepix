import { Container } from '@mui/material'
import React from 'react'
import ReviewList from 'screens-content/reviews/components/review-list/review-list'
import styles from './review-section.module.scss'
import { Pages } from 'constants/pages/urls'
import PreviewRow from '../preview-section/components/preview-row/preview-row'

const ReviewsSection = () => {
  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow title={'Recenzie'} route={Pages.REVIEWS}>
        <div className={styles.reviewContainer}>
          <ReviewList />
        </div>
      </PreviewRow>
    </Container>
  )
}

export default ReviewsSection
