import { Rating, Skeleton } from '@mui/material'
import React from 'react'
import styles from './review-skeleton.module.scss'

const ReviewSkeleton = () => {
  return (
    <div style={{ marginTop: 20, minWidth: 300, margin: 5 }}>
      <div className={styles.reviewBlock}>
        <div className={styles.reviewer}>
          <Skeleton
            variant='circular'
            height={40}
            width={40}
            style={{ margin: 5 }}
          />
          <div className={styles.reviewerName}>
            <Skeleton animation='wave' height={25} width='50%' />
            <div className={styles.reviewDates}>
              <div className={styles.date}>
                <Skeleton animation='wave' height={20} width='95%' />
              </div>
              <div className={styles.date}>
                <Skeleton animation='wave' height={20} width='95%' />
              </div>
            </div>
          </div>
        </div>
        <Skeleton>
          <Rating
            name='simple-controlled'
            style={{ marginBottom: 10 }}
            size='small'
          />
        </Skeleton>
        <div className={styles.reviewHome}>
          <Skeleton/>
        </div>
      </div>
    </div>
  )
}

export default ReviewSkeleton
