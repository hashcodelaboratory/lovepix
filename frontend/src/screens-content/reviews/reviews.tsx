import { Container } from '@mui/material'
import React from 'react'
import AddReview from './components/add-review/add-review'
import style from './reviews.module.scss'
import ReviewBlock from './components/review-list/review-block'

const ReviewsPage = () => {
  return (
    <Container className={style.reviewContainer}>
      <AddReview />
      <ReviewBlock />
    </Container>
  )
}

export default ReviewsPage
