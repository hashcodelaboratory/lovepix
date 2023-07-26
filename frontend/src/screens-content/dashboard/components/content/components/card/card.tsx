import styles from '../../../../dashboard.module.scss'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

type CardProps = {
  header: {
    title: string
    count: string
    icon: JSX.Element
  }
  footer: {
    value: string
    text: string
  }
  link?: string
}

const Card = ({ header, footer, link = '' }: CardProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const navigate = () => {
    router.push(link)
  }

  return (
    <div className={styles.cardContainer} onClick={navigate}>
      <div className={styles.cardIconContainer}>{header.icon}</div>
      <div className={styles.cardHeader}>
        <p className={styles.cardHeaderTitle}>{String(t(header.title))}</p>
        <p className={styles.cardHeaderNumber}>{header.count}</p>
        <hr className={styles.cardDivider}></hr>
        <p className={styles.cardFooterTitle}>
          <b className={styles.cardFooterTitleSuccess}>{footer.value} </b>
          {footer.text}
        </p>
      </div>
    </div>
  )
}

export default Card
