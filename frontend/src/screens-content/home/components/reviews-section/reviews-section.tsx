import { Container } from '@mui/material'
import React from 'react'
import ReviewList from 'screens-content/reviews/components/review-list/review-list'
import styles from './review-section.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { localizationKey } from 'localization/localization-key'
import { Pages } from 'constants/pages/urls'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import style from './../../home.module.scss'

const ReviewsSection = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const redirect = async () => {
    await router.push(Pages.REVIEWS)
  }

  return (
    <Container>
      <div className={style.previewTitleRow}>
        <h3>RECENZIE</h3>
        <button className={style.previewTitleRowButton}>
          <p onClick={redirect} className={style.previewTitleRowButtonText}>
            {t(localizationKey.showMore)}
          </p>
          <ArrowForwardIcon sx={{ width: 16 }} />
        </button>
      </div>
      <hr />
      <div className={styles.reviewContainer}>
        <ReviewList />
      </div>
    </Container>
  )
}

export default ReviewsSection
