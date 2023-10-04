import { Container } from '@mui/material'
import styles from './about-us.module.scss'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../localization/localization-key'
import React from 'react'
import Image from 'next/image'
import { ImageLayout } from '../home/enums/enums'
import logo from '../../assets/about-us/tatry.jpg'
import logoAvatar from '../../assets/lovepix_avatar.svg'

const CustomAboutUs = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className={styles.fullWidthContainer}>
        <Container>
          <div className={styles.fullWidthTextContainer}>
            <p className={styles.fullWidthText}>Milujeme</p>
            <p className={styles.fullWidthText}>krásne momenty.</p>
          </div>
        </Container>
      </div>
      <Container className={styles.logoContainer}>
        <Image
          src={logoAvatar}
          height={350}
          width={350}
          alt='Your Name'
          layout={ImageLayout.INTRINSIC}
        />
        <div className={styles.logoText}>
          <p>{String(t(localizationKey.aboutUsFrom))}</p>
          <p>{String(t(localizationKey.aboutUsThanks))}</p>
          <p>{String(t(localizationKey.aboutUsTask))}</p>
          <p>{String(t(localizationKey.aboutUsWant))}</p>
          <p>{String(t(localizationKey.aboutUsHelp))}</p>
        </div>
      </Container>
      <div className={styles.proudContainer}>
        <Container>
          <p className={styles.miniTitle}>
            {String(t(localizationKey.aboutUsPriorities))}
          </p>
          <h1 className={styles.title}>
            {String(t(localizationKey.aboutUsProud))}
          </h1>
        </Container>
      </div>
      <Container className={styles.proudImage}>
        <Image
          src={logo}
          height={400}
          width={600}
          alt='Your Name'
          layout={ImageLayout.INTRINSIC}
        />
      </Container>
    </div>
  )
}

export default CustomAboutUs
