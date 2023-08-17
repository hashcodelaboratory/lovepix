import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../review-list/review-block.module.scss'
import Avatar from '@icons/avatar'
import { ReviewType } from 'common/api/use-reviews'
import { Rating } from '@mui/material'
import RemoveReviewModal from '../remove-review/remove-review-modal'
import useLoggedUser from 'common/api/use-logged-user'
import { useRouter } from 'next/router'
import { Pages } from 'constants/pages/urls'

type ReviewProps = {
  reviewItems: ReviewType
}

const SingleReview = ({ reviewItems }: ReviewProps) => {
  const route = useRouter()
  const { user } = useLoggedUser()
  const { name, date, rating, review, id } = reviewItems
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen((prevState) => !prevState)

  return (
    <div style={{ marginTop: 20, minWidth: 300, margin: 5 }}>
      {user?.isAdmin && (
        <DeleteIcon
          className={styles.removeIcon}
          onClick={() => toggleModal()}
        />
      )}
      <div className={styles.reviewBlock}>
        <div className={styles.reviewer}>
          <Avatar />
          <div>
            {name}
            <div style={{ fontSize: 12, marginBottom: 5 }}>
              <span style={{ marginRight: 5 }}>
                {new Date(date).toLocaleDateString()}
              </span>
              {new Date(date).toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div className={styles.rating}>
          <Rating
            name='simple-controlled'
            value={rating}
            style={{ marginBottom: 10 }}
            size='small'
          />
        </div>
        <div
          className={
            route.pathname === Pages.HOME ? styles.reviewHome : styles.review
          }
        >
          {review}
        </div>
      </div>
      <RemoveReviewModal
        open={open}
        closeModal={toggleModal}
        title={name}
        id={id}
      />
    </div>
  )
}

export default SingleReview
