import styles from '../../../shopping-cart.module.scss'
import { localizationKey } from '../../../../../localization/localization-key'
import { Link, styled } from '@mui/material'
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
import { VoucherType } from '../../../../../common/types/order'
import { Pages } from 'constants/pages/urls'
import { useRouter } from 'next/router'

type TotalSectionProps = {
  delivery?: Delivery
  payment?: Payment
  price?: number
  finalPrice: number
  isSubscription: boolean
  setSubscription: () => void
  voucher?: VoucherType
}

const SubmitButton = styled('button')({
  width: '100%',
  margin: '1rem auto 0 auto',
})

const TotalSection = ({
  isSubscription,
  setSubscription,
  delivery,
  payment,
  price,
  finalPrice,
  voucher,
}: TotalSectionProps): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()
  const priceWithoutTax = price ? Number(finalPrice * 0.8).toFixed(2) : '-'
  const taxFromPrice = price ? Number(finalPrice * 0.2).toFixed(2) : '-'
  const _finalPrice = finalPrice.toFixed(2)

  const paymentPrice = payment ? getPriceForPayment(payment) : '-'
  const deliveryPrice = delivery ? getPriceForDelivery(delivery) : '-'
  const paymentOption = t(String(getPaymentMessage(payment)))
  const deliveryOption = t(String(getDeliveryMessage(delivery)))

  const [bussinessCondition, setBussinessConditon] = useState(false)

  const handleChangeBussinessCondition = () => {
    setBussinessConditon((prevState) => !prevState)
  }

  const goTo = () => router.push(Pages.PERSONAL_DATA_PROTECTION_PRINCIPLES)

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>
          {String(t(localizationKey.summary))}
        </h3>
      </div>
      <div className={styles.totalContainer}>
        <span>
          {t(localizationKey.payment)} {payment && <>- {paymentOption}</>}
        </span>
        <span>{paymentPrice} €</span>
      </div>
      <div className={styles.totalContainer}>
        <span>
          {t(localizationKey.delivery)} {delivery && <>- {deliveryOption}</>}
        </span>
        <span>{deliveryPrice} €</span>
      </div>
      {voucher && (
        <div className={styles.totalContainer}>
          <span>
            {t(localizationKey.code)}
            {voucher && <>: {voucher.code}</>}
          </span>
          <span>- {voucher.value} %</span>
        </div>
      )}
      <hr />
      <div className={styles.totalContainer}>
        <span>{String(t(localizationKey.totalWithoutTax))}</span>
        <span>{priceWithoutTax} €</span>
      </div>
      <div className={styles.totalContainer}>
        <span>{String(t(localizationKey.tax))}</span>
        <span>{taxFromPrice} €</span>
      </div>
      <div className={styles.totalContainer}>
        <span className={styles.summarySectionTitleFinalPrice}>
          {String(t(localizationKey.total))}
        </span>
        <span className={styles.price}>{_finalPrice} €</span>
      </div>
      <p className={styles.text}>{String(t(localizationKey.personalData))}</p>
      <Link className={styles.text} style={{ cursor: 'text' }}>
        <b>{String(t(localizationKey.privacy))}</b>
      </Link>
      <div style={{ marginTop: 10 }}>
        <CheckboxShoppingCart
          value={bussinessCondition}
          setValue={handleChangeBussinessCondition}
          message={localizationKey.agreeWithBussinessCondition}
        />
        <div className={styles.checkboxLabellink} onClick={goTo}>
          {t(localizationKey.conditions)}
        </div>
        <CheckboxShoppingCart
          value={isSubscription}
          setValue={setSubscription}
          message={localizationKey.agreeWithNewsletter}
        />
      </div>
      <SubmitButton
        type='submit'
        className={styles.defaultButton}
        disabled={!bussinessCondition}
      >
        {String(t(localizationKey.orderWithPayment))}
      </SubmitButton>
    </div>
  )
}

export default TotalSection
