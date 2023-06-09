import styles from '../../../shopping-cart.module.scss'
import { messages } from '../../../../../messages/messages'
import { Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { FormInputs } from 'common/types/form'
import {
  getDelivery,
  getDeliveryPrice,
  getPayment,
  getPaymentPrice,
} from './utils'

type TotalSectionProps = {
  price?: number
  formData: FormInputs
}

const TotalSection = ({ price, formData }: TotalSectionProps): JSX.Element => {
  const { t } = useTranslation()

  const deliveryPrice = getDeliveryPrice(formData) ?? 0
  const paymentPrice = getPaymentPrice(formData) ?? 0
  const finalPrice = Number(price!) + deliveryPrice + paymentPrice

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(messages.summary))}</h3>
      </div>
      <div className={styles.totalContainer}>
        <Typography className={styles.summarySectionTitle}>
          Platba - {t(String(getPayment(formData)))}
        </Typography>
        <Typography>{getPaymentPrice(formData)} €</Typography>
      </div>
      <div className={styles.totalContainer}>
        <Typography className={styles.summarySectionTitle}>
          Doprava - {t(String(getDelivery(formData)))}
        </Typography>
        <Typography>{getDeliveryPrice(formData)} €</Typography>
      </div>
      <hr />
      <div className={styles.totalContainer}>
        <Typography className={styles.summarySectionTitle}>
          {String(t(messages.totalWithoutTax))}
        </Typography>
        <Typography>
          {price ? Number(price * 0.8).toFixed(2) : '-'} €
        </Typography>
      </div>
      <div className={styles.totalContainer}>
        <Typography className={styles.summarySectionTitle}>
          {String(t(messages.tax))}
        </Typography>
        <Typography>
          {price ? Number(price * 0.2).toFixed(2) : '-'} €
        </Typography>
      </div>
      <div className={styles.totalContainer}>
        <Typography className={styles.summarySectionTitle}>
          {String(t(messages.total))}
        </Typography>
        <Typography className={styles.price}>
          {Number(finalPrice).toFixed(2)} €
        </Typography>
      </div>
      <p className={styles.text}>{String(t(messages.personalData))}</p>
      <Link className={styles.text} style={{ cursor: 'pointer' }}>
        <b>{String(t(messages.privacy))}</b>
      </Link>
      <button type='submit' className={styles.checkoutButton}>
        {String(t(messages.orderWithPayment))}
      </button>
    </div>
  )
}

export default TotalSection
