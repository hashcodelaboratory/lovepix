import { Container, Link } from '@mui/material'
import styles from '../../contacts.module.scss'
import { useTranslation } from 'react-i18next'
import * as PagesUrls from '../../../../constants/pages/urls'
import { HASHLAB_ADDRESS, PROGRUP_ADDRESS } from './constants'
import { InfoRow } from './info-row'
import { localizationKey } from '../../../../localization/localization-key'

const Information = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <div>
        <div className={styles.infoTitleContainer}>
          <h1 className={styles.infoTitle}>{t(localizationKey.contact)}</h1>
          <p className={styles.infoComment}>
            {t(localizationKey.contactInfoComment)}
          </p>
        </div>
        <InfoRow
          title={t(localizationKey.deliveryPoint)}
          values={PROGRUP_ADDRESS}
        />
        <InfoRow
          title={t(localizationKey.billingInfo)}
          values={HASHLAB_ADDRESS}
        />
      </div>

      <h2 className={styles.infoSocialTitle}>
        {t(localizationKey.socialSite)}
      </h2>
      <Link
        href={PagesUrls.FACEBOOK}
        rel='noreferrer'
        target='_blank'
        className={styles.infoSocialLink}
      >
        Facebook
      </Link>
      <Link
        href={PagesUrls.INSTAGRAM}
        rel='noreferrer'
        target='_blank'
        className={styles.infoSocialLink}
      >
        Instagram
      </Link>
    </Container>
  )
}

export default Information
