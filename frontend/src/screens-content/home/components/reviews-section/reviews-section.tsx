import { Container } from '@mui/material'
import React from 'react'
import ReviewList from 'screens-content/reviews/components/review-list/review-list'
import styles from './review-section.module.scss'

const ReviewsSection = () => {
  return (
    <Container className={styles.reviewContainer}>
      <ReviewList />
    </Container>
  )
}

export default ReviewsSection
