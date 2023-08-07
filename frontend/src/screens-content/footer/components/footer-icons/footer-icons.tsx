import lovepixIcon from '../../../../assets/logo_gray.svg'
import facebookIcon from '../../../../assets/facebook.svg'
import tiktokIcon from '../../../../assets/tiktok.svg'
import instagramIcon from '../../../../assets/instagram.svg'
import styles from '../../footer.module.scss'
import {Container, Link} from '@mui/material'
import Image from 'next/image'
import {ImageLayout} from '../../../home/enums/enums'
import {useTranslation} from 'react-i18next'
import {localizationKey} from '../../../../localization/localization-key'
import {FACEBOOK, INSTAGRAM, Pages, TIKTOK,} from '../../../../constants/pages/urls'
import Login from 'login/login'

const FooterIcons = (): JSX.Element => {
  const {t} = useTranslation()

  // TODO: change tiktok link
  return (
    <Container>
      <Login/>
      <hr/>
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

      <hr/>
      <div className={styles.footerBottomContainer}>
        <div className={styles.footerBottomContainerRow}>
          {/* TODO: enable when internationalization will be requested as new feature*/}
          {/*<LanguageSwitch/>*/}
          <div className={styles.footerBottomIcon}>
            <Link href={FACEBOOK} rel='noreferrer' target='_blank'>
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
            <Link href={INSTAGRAM} rel='noreferrer' target='_blank'>
              <Image
                src={instagramIcon}
                layout={ImageLayout.FIXED}
                width={22}
                height={22}
                alt=''
              />
            </Link>
          </div>
          <div className={styles.footerBottomIcon}>
            <Link href={TIKTOK} rel='noreferrer' target='_blank'>
              <Image
                src={tiktokIcon}
                layout={ImageLayout.FIXED}
                width={22}
                height={22}
                className={styles.footerBottomIcon}
                alt=''
              />
            </Link>
          </div>
        </div>

        <div className={styles.footerBottomContainerRow}>
          <p
            className={styles.footerBottomContainerRowText}
            style={{marginRight: 36}}
          >
            {t(localizationKey.copyright)}
          </p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={Pages.CONDITIONS}
            target='_blank'
          >
            {t(localizationKey.conditions)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={Pages.PRIVACY_POLICY}
            target='_blank'
          >
            {t(localizationKey.privacyPolicy)}
          </Link>
          <p className={styles.footerDivider}>/</p>
          <Link
            className={styles.footerBottomContainerRowTextLink}
            href={Pages.COOKIES}
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
