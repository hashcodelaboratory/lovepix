import React from 'react'
import { useTranslation } from 'react-i18next'
import Delivery from '@icons/icon-delivery'
import Experience from '@icons/icon-experience'
import Access from '@icons/icon-access'
import styles from './info-panel.module.scss'

const InfoPanel = () => {
  const { t } = useTranslation()

  const shopInfo = [
    {
      img: <Delivery width={60} height={60} />,
      title: t('fast-delivery'),
      description: t('fast-delivery-description'),
    },
    {
      img: <Experience width={60} height={60} />,
      title: t('long-term-experience'),
      description: t('long-term-experience-description'),
    },
    {
      img: <Access width={60} height={60} />,
      title: t('special-approach'),
      description: t('special-approach-description'),
    },
  ]

  const tableInfo = shopInfo.map((item) => (
    <div style={{ display: 'flex' }} key={item.title}>
      <div>{item.img}</div>
      <div className={styles.textInfo}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.description}>{item.description}</p>
      </div>
    </div>
  ))

  return <div className={styles.container}>{tableInfo}</div>
}

export default InfoPanel
