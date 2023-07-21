import { Container } from '@mui/material'
import React from 'react'
import AddReview from './components/add-review'
import style from './reviews.module.scss'

const ReviewsPage = () => {
  return (
    <Container className={style.reviewContainer}>
      <AddReview />
    </Container>
  )
}

export default ReviewsPage
