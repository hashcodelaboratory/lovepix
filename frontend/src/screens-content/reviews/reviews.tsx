import { Container } from '@mui/material'
import React from 'react'
import AddReview from './components/add-review/add-review'
import style from './reviews.module.scss'
import ReviewList from './components/review-list/review-list'

const ReviewsPage = () => {
  return (
    <Container className={style.reviewContainer}>
      <AddReview />
      <ReviewList />
    </Container>
  )
}

export default ReviewsPage
