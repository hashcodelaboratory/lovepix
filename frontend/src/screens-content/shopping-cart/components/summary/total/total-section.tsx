import styles from '../../../shopping-cart.module.scss'
import { messages } from '../../../../../messages/messages'
import { Checkbox, FormControlLabel, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'
import {
  getDeliveryMessage,
  getPaymentMessage,
  getPriceForDelivery,
  getPriceForPayment,
} from './utils'
import { Delivery } from '../../../../../common/enums/delivery'
import { Payment } from '../../../../../common/enums/payment'
import { useState } from 'react'
import CheckboxShoppingCart from '../checkbox-component'

type TotalSectionProps = {
  delivery?: Delivery
  payment?: Payment
  price?: number
  finalPrice: number
  isSubscription: boolean
  setSubscription: () => void
}

const TotalSection = ({
  isSubscription,
  setSubscription,
  delivery,
  payment,
  price,
  finalPrice,
}: TotalSectionProps): JSX.Element => {
  const { t } = useTranslation()

  const priceWithoutTax = price ? Number(finalPrice * 0.8).toFixed(2) : '-'
  const taxFromPrice = price ? Number(finalPrice * 0.2).toFixed(2) : '-'
  const finalPriceWithTax = finalPrice.toFixed(2)

  const paymentPrice = payment ? getPriceForPayment(payment) : '-'
  const deliveryPrice = delivery ? getPriceForDelivery(delivery) : '-'
  const paymentOption = t(String(getPaymentMessage(payment)))
  const deliveryOption = t(String(getDeliveryMessage(delivery)))

  const [bussinessCondition, setBussinessConditon] = useState(false)

  const handleChangeBussinessCondition = () => {
    setBussinessConditon((prevState) => !prevState)
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>{String(t(messages.summary))}</h3>
      </div>
      <div className={styles.totalContainer}>
        <span>
          {t(messages.payment)} {payment && <>- {paymentOption}</>}
        </span>
        <span>{paymentPrice} €</span>
      </div>
      <div className={styles.totalContainer}>
        <span>
          {t(messages.delivery)} {delivery && <>- {deliveryOption}</>}
        </span>
        <span>{deliveryPrice} €</span>
      </div>
      <hr />
      <div className={styles.totalContainer}>
        <span>{String(t(messages.totalWithoutTax))}</span>
        <span>{priceWithoutTax} €</span>
      </div>
      <div className={styles.totalContainer}>
        <span>{String(t(messages.tax))}</span>
        <span>{taxFromPrice} €</span>
      </div>
      <div className={styles.totalContainer}>
        <span className={styles.summarySectionTitleFinalPrice}>
          {String(t(messages.total))}
        </span>
        <span className={styles.price}>{finalPriceWithTax} €</span>
      </div>
      <p className={styles.text}>{String(t(messages.personalData))}</p>
      <Link className={styles.text} style={{ cursor: 'pointer' }}>
        <b>{String(t(messages.privacy))}</b>
      </Link>
      <div style={{ marginTop: 10 }}>
        <CheckboxShoppingCart
          value={bussinessCondition}
          setValue={handleChangeBussinessCondition}
          message={messages.agreeWithBussinessCondition}
        />
        <CheckboxShoppingCart
          value={isSubscription}
          setValue={setSubscription}
          message={messages.agreeWithNewsletter}
        />
      </div>
      <button
        type='submit'
        className={styles.checkoutButton}
        disabled={!bussinessCondition}
      >
        {String(t(messages.orderWithPayment))}
      </button>
    </div>
  )
}

export default TotalSection
