import { Rating, Typography } from '@mui/material'
import { ReviewType, useReviews } from 'common/api/use-reviews'
import React, { useState } from 'react'
import styles from './review-list.module.scss'
import Avatar from '@icons/avatar'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveReviewModal from '../remove-review/remove-review-modal'

const ReviewList = () => {
  const { t } = useTranslation()
  const { data: reviews } = useReviews()
  const [open, setOpen] = useState(false)

  const reviewBlock = reviews
    ?.sort((a: ReviewType, b: ReviewType) => (a.date < b.date ? 1 : -1))
    .map((item) => (
      <div key={item.id} style={{ marginTop: 20 }}>
        <DeleteIcon
          className={styles.removeIcon}
          onClick={() => toggleModal()}
        />
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

  const toggleModal = () => setOpen((prevState) => !prevState)

  return (
    <div>
      <Typography variant='h5'>
        {t(localizationKey.reviewPageYourReviews)}
      </Typography>
      {reviewBlock}
      <RemoveReviewModal open={open} closeModal={toggleModal} title={'title'} />
    </div>
  )
}

export default ReviewList
