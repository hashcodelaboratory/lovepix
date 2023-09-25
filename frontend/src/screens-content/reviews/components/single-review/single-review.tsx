import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../review-list/review-block.module.scss'
import Avatar from '@icons/avatar'
import { ReviewType } from 'common/api/use-reviews'
import { Rating } from '@mui/material'
import RemoveReviewModal from '../remove-review/remove-review-modal'
import useLoggedUser from 'common/api/use-logged-user'
import { useRouter } from 'next/router'
import { Pages } from 'constants/pages/urls'
import { useAnimation, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type ReviewProps = {
  reviewItems: ReviewType
}

const animationVariants = {
  visible: {
    scale: 1.15,
    transition: {
      duration: 1.5,
    },
  },
  hidden: {
    scale: 1,
    transition: {
      duration: 1.5,
    },
  },
}

const SingleReview = ({ reviewItems }: ReviewProps) => {
  const route = useRouter()
  const { user } = useLoggedUser()
  const { name, date, rating, review, id } = reviewItems
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen((prevState) => !prevState)

  const controls = useAnimation()
  const [ref, inView] = useInView({
    rootMargin: '0% -50% 0% -50%',
  })

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden')
  }, [controls, inView])

  return (
    <div style={{ marginTop: 20, minWidth: 300, margin: 16 }}>
      {user?.isAdmin && (
        <DeleteIcon
          className={styles.removeIcon}
          onClick={() => toggleModal()}
        />
      )}
      <motion.div
        initial
        ref={ref}
        animate={controls}
        variants={animationVariants}
      >
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
          <Rating
            name='simple-controlled'
            value={rating}
            style={{ marginBottom: 10 }}
            size='small'
            readOnly
          />
          <div
            className={
              route.pathname === Pages.HOME ? styles.reviewHome : styles.review
            }
          >
            {review}
          </div>
        </div>
      </motion.div>
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
