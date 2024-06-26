import styles from '../../../shopping-cart.module.scss'
import { Container } from '@mui/system'
import Address from '../address/address'
import { Order } from '../../../../../common/types/order'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInputs } from '../../../../../common/types/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FORM_SCHEMA } from '../address/components/form/utils/schema'
import { useEffect, useMemo, useState } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import Voucher from '../voucher/voucher'
import Delivery from '../delivery/delivery'
import Payment from '../payment/payment'
import OrderItems from '../components/order-items/order-items'
import TotalSection from '../total/total-section'
import {
  getPriceForDelivery,
  getPriceForPayment,
  getPriceWithVoucher,
} from '../total/utils'
import { useRouter } from 'next/router'
import { useStripe } from '@stripe/react-stripe-js'
import { clearIndexedDb } from 'common/indexed-db/utils/clear'
import { Payment as PaymentEnum } from '../../../../../common/enums/payment'
import { OrderState } from 'common/enums/order-states'
import { addContactToNewsletter } from 'common/api/add-contact-newsletter'
import { createOrder } from '../../../../../common/api/create-order'
import { useTranslation } from 'next-i18next'
import { Route } from 'common/enums/routes'
import { loggingService } from '../../../../../analytics/logging-service'
import { LovepixEvent } from '../../../../../analytics/lovepix-event'

type SummaryProps = {
  order: Order
}

const Summary = ({ order }: SummaryProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const stripe = useStripe()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscription, setIsSubscription] = useState(false)

  const handleSubscribe = () => {
    setIsSubscription((prevState) => !prevState)
  }

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(FORM_SCHEMA),
    reValidateMode: 'onChange',
  })
  const { delivery, payment } = watch()

  useEffect(() => {
    loggingService.logEvent(LovepixEvent.ORDER_VALIDATION, {
      extra: { errors },
    })
  }, [errors])

  const finalPrice = useMemo(
    () =>
      Number(order?.totalPrice) +
      getPriceForDelivery(delivery) +
      getPriceForPayment(payment) -
      getPriceWithVoucher(
        order?.totalPrice,
        order.voucher?.saleType,
        order?.voucher?.value
      ),
    [
      delivery,
      order?.totalPrice,
      order.voucher?.saleType,
      order.voucher?.value,
      payment,
    ]
  )

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true)
    const { payment } = data

    const newOrder = {
      form: {
        firstName: data?.firstName,
        lastName: data?.lastName,
        company: data?.company,
        address: data?.address,
        city: data?.city,
        postalCode: data?.postalCode,
        phone: data?.phone,
        email: data?.email,
      },
      date: Date.now(),
      orderState: [{ state: OrderState.CREATED, date: Date.now() }],
      shoppingCart: order?.shoppingCart,
      totalPrice: finalPrice,
      delivery: data.delivery!,
      payment: data.payment!,
      localizationDelivery: t(`${data.delivery?.toLowerCase()}`),
      localizationPayment: t(`${data.payment?.toLowerCase()}`),
      stripe: stripe ?? null,
      voucher: order?.voucher ?? null,
    }

    data.note && Object.assign(newOrder, { note: data.note })
    const shippingAddressForm = {
      firstNameShippingAddress: data?.firstNameShippingAddress,
      lastNameShippingAddress: data?.lastNameShippingAddress,
      addressShippingAddress: data?.addressShippingAddress,
      cityShippingAdress: data?.cityShippingAdress,
      postalCodeShippingAddress: data?.postalCodeShippingAddress,
    }

    data.firstNameShippingAddress &&
      Object.assign(newOrder.form, shippingAddressForm)

    data.ico &&
      Object.assign(newOrder.form, {
        ico: data?.ico,
        dic: data?.dic,
      })

    loggingService.logEvent(LovepixEvent.SUBMIT_ORDER, {
      extra: { order: newOrder },
    })

    await createOrder(newOrder)
    if (payment !== PaymentEnum.ONLINE) {
      await clearIndexedDb()
      await router.push({
        pathname: Route.THANKS,
        query: { success: 'true' },
      })
    }
    !isSubscription && (await addContactToNewsletter(data.email))
    reset()
    setIsLoading(false)
  }

  return (
    <Container className={styles.summaryContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.summary}>
          <Address register={register} errors={errors} control={control} />
          <div className={styles.orderContainer}>
            <OrderItems
              order={order}
              register={register}
              errors={errors}
              control={control}
            />
            <Delivery
              control={control}
              message={errors.delivery?.message}
              freeDelivery={order?.voucher?.freeDelivery}
              setValue={setValue}
            />
            <Payment control={control} message={errors.payment?.message} />
          </div>
        </div>
        <div className={styles.summarySecondRow}>
          <Voucher voucher={order?.voucher} />
          <TotalSection
            delivery={delivery}
            payment={payment}
            price={order?.totalPrice}
            finalPrice={finalPrice}
            isSubscription={isSubscription}
            setSubscription={handleSubscribe}
            voucher={order?.voucher}
          />
        </div>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Container>
  )
}

export default Summary
