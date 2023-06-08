import styles from '../../../shopping-cart.module.scss'
import { messages } from '../../../../../messages/messages'
import { Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Delivery as DeliveryOptions } from '../../../../../common/enums/delivery'
import { Payment as PaymentEnum } from '../../../../../common/enums/payment'
import { FormInputs } from 'common/types/form'

type TotalSectionProps = {
  price?: number
  formData: FormInputs
}

const TotalSection = ({ price, formData }: TotalSectionProps): JSX.Element => {
  const { t } = useTranslation()

  const getDelivery = () => {
    switch (formData.delivery) {
      case DeliveryOptions.COURIER:
        return `/ ${t(messages.courier)}`
      case DeliveryOptions.PERSONAL_COLLECT:
        return `/ ${t(messages.personalCollect)}`
      default:
        ''
    }
  }

  const getDeliveryPrice = (): number | undefined => {
    switch (formData.delivery) {
      case DeliveryOptions.COURIER:
        return 5
      case DeliveryOptions.PERSONAL_COLLECT:
        return 0
    }
  }

  const getPayment = () => {
    switch (formData.payment) {
      case PaymentEnum.ONLINE:
        return `/ ${t(messages.online)}`
      case PaymentEnum.PERSONAL_DELIVERY:
        return `/ ${t(messages.personalDelivery)}`
      case PaymentEnum.TRANSACTION:
        return `/ ${t(messages.transaction)}`
      default:
        ''
    }
  }

  const getPaymentPrice = (): number | undefined => {
    switch (formData.payment) {
      case PaymentEnum.ONLINE:
        return 0
      case PaymentEnum.PERSONAL_DELIVERY:
        return 2
      case PaymentEnum.TRANSACTION:
        return 0
      default:
        0
    }
  }

  const deliveryPrice = getDeliveryPrice() ?? 0
  const paymentPrice = getPaymentPrice() ?? 0
  const finalPrice = Number(price!) + deliveryPrice + paymentPrice

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(messages.summary))}</h3>
      </div>
      <div className={styles.totalContainer}>
        <Typography className={styles.summarySectionTitle}>
          Platba {getPayment()}
        </Typography>
        <Typography>{getPaymentPrice()} €</Typography>
      </div>
      <div className={styles.totalContainer}>
        <Typography className={styles.summarySectionTitle}>
          Doprava {getDelivery()}
        </Typography>
        <Typography>{getDeliveryPrice()} €</Typography>
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
