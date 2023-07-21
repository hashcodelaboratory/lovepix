import { Rating, Typography } from '@mui/material'
import { ReviewType, useReviews } from 'common/api/use-reviews'
import React from 'react'
import styles from './review-list.module.scss'
import Avatar from '@icons/avatar'

const ReviewList = () => {
  const { data: reviews } = useReviews()

  const reviewBlock = reviews
    ?.sort((a: ReviewType, b: ReviewType) => (a.date < b.date ? 1 : -1))
    .map((item) => (
      <div key={item.id} style={{ marginTop: 20 }}>
        <div className={styles.reviewBlock}>
          <div className={styles.reviewer}>
            <Avatar />
            <div>
              {item.name}
              <div style={{ fontSize: 12, marginBottom: 5 }}>
                <span style={{ marginRight: 5 }}>
                  {new Date(item.date).toLocaleDateString()}
                </span>
                {new Date(item.date).toLocaleTimeString()}
              </div>
            </div>
          </div>
          <Rating
            name='simple-controlled'
            value={item.rating}
            style={{ marginBottom: 10 }}
            size='small'
          />
          <div className={styles.review}>{item.review}</div>
        </div>
      </div>
    ))

  return (
    <div>
      <Typography variant='h5'>Vaše recenzie</Typography>
      {reviewBlock}
    </div>
  )
}

export default ReviewList
