import lovepixIcon from '../../../../assets/logo_gray.svg'
import facebookIcon from '../../../../assets/facebook.svg'
import instagramIcon from '../../../../assets/instagram.svg'
import styles from '../../footer.module.scss'
import { Container, Link } from '@mui/material'
import Image from 'next/image'
import { ImageLayout } from '../../../home/enums/enums'
import { useTranslation } from 'react-i18next'
import { localizationKey } from '../../../../localization/localization-key'
import { FACEBOOK, INSTAGRAM, Pages } from '../../../../constants/pages/urls'

const CURRENT_YEAR = new Date().getFullYear()

const FooterIcons = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Container>
      <hr />
      <div className={styles.footerIconsRow}>
        <Image
          src={lovepixIcon}
          layout={ImageLayout.FIXED}
          width={22}
          height={22}
          alt=''
        />
        <p className={styles.footerIconsText}>
          <b>{t(localizationKey.partners)}:</b>
        </p>
        <Link
          className={styles.footerIconsText}
          href='https://www.mojkalendar.sk'
          target='_blank'
          rel='noreferrer'
        >
          mojkalendar.sk
        </Link>
        <Link
          className={styles.footerIconsText}
          href='https://www.odfotma.sk'
          target='_blank'
          rel='noreferrer'
        >
          odfotma.sk
        </Link>
        <Link
          className={styles.footerIconsText}
          href='https://www.hashlab.com'
          target='_blank'
          rel='noreferrer'
        >
          hashlab.com
        </Link>
      </div>

      <hr />
      <div className={styles.footerBottomContainer}>
        <div className={styles.footerBottomContainerRow}>
          {/* TODO: enable when internationalization will be requested as new feature*/}
          {/*<LanguageSwitch/>*/}
          <div className={styles.footerBottomIcon}>
            <Link
              href={FACEBOOK}
              aria-label='Facebook'
              rel='noreferrer'
              target='_blank'
            >
              <Image
                src={facebookIcon}
                layout={ImageLayout.FIXED}
                width={22}
                height={22}
                alt=''
              />
            </Link>
          </div>
          <div className={styles.footerBottomIcon}>
            <Link
              href={INSTAGRAM}
              aria-label='Instagram'
              rel='noreferrer'
              target='_blank'
            >
              <Image
                src={instagramIcon}
                layout={ImageLayout.FIXED}
                width={22}
                height={22}
                alt=''
              />
            </Link>
          </div>
        </div>

        <div className={styles.footerBottomContainerRow}>
          <p
            className={styles.footerBottomContainerRowText}
            style={{ marginRight: 36 }}
          >
            {t(localizationKey.copyright, { year: CURRENT_YEAR })}
          </p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={t(Pages.GENERAL_TERMS_AND_CONDITIONS)}
          >
            {t(localizationKey.conditions)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={t(Pages.PERSONAL_DATA_PROTECTION_PRINCIPLES)}
          >
            {t(localizationKey.privacyPolicy)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={t(Pages.COOKIES)}
            target='_blank'
          >
            {t(localizationKey.cookies)}
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default FooterIcons
