import React from 'react'
import { useTranslation } from 'react-i18next'
import Delivery from '@icons/icon-delivery'
import Experience from '@icons/icon-experience'
import Access from '@icons/icon-access'
import styles from './info-panel.module.scss'
import { messages } from 'messages/messages'
import Money from '@icons/icon-money'

type Info = {
  quantity: number | undefined
}

const InfoPanel = ({ quantity }: Info) => {
  const { t } = useTranslation()

  const shopInfo = [
    {
      img: <Experience width={50} height={50} />,
      title: t(messages.pickUpInfo),
      description: 'Duklianská 38, Spišská Nová Ves',
    },
    {
      img: <Delivery width={50} height={50} />,
      title: t(messages.fastDelivery),
      description: '',
    },
    {
      img: <Access width={50} height={50} />,
      title: `Skladom ${quantity ?? '?'} ks`,
      description: '',
    },
    {
      img: <Money width={50} height={50} />,
      title: t(messages.moneyBackGuarantee),
      description: '',
    },
  ]

  const tableInfo = shopInfo.map((item, index) => (
    <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
      <div>{item.img}</div>
      <div className={styles.textInfo}>
        <span className={styles.title}>{item.title}</span>
        <div className={styles.title}>{item.description}</div>
      </div>
    </div>
  ))

  return <div className={styles.container}>{tableInfo}</div>
}

export default InfoPanel
