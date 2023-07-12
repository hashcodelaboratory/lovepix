import styles from '../../../shopping-cart.module.scss'
import { Container } from '@mui/system'
import Address from '../address/address'
import { Order } from '../../../../../common/types/order'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInputs } from '../../../../../common/types/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FORM_SCHEMA } from '../address/components/form/utils/schema'
import { useCreateOrder } from '../../../../../common/firebase/firestore/createOrder'
import { useState } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import Voucher from '../voucher/voucher'
import Delivery from '../delivery/delivery'
import Payment from '../payment/payment'
import OrderItems from '../components/order-items/order-items'
import TotalSection from '../total/total-section'
import { getPriceForDelivery, getPriceForPayment } from '../total/utils'
import { useRouter } from 'next/router'
import { useStripe } from '@stripe/react-stripe-js'
import { clearIndexedDb } from 'common/indexed-db/utils/clear'
import { Payment as PaymentEnum} from "../../../../../common/enums/payment"

type SummaryProps = {
  order: Order
}

const Summary = ({ order }: SummaryProps) => {
  const router = useRouter()
  const { mutate: createOrder } = useCreateOrder()
  const stripe = useStripe()
  const [isLoading, setIsLoading] = useState(false)


  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(FORM_SCHEMA),
    reValidateMode: "onChange",
  })
  const { delivery, payment } = watch()
  const finalPrice =
    Number(order?.totalPrice) +
    getPriceForDelivery(delivery) +
    getPriceForPayment(payment)

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
      shoppingCart: order?.shoppingCart,
      totalPrice: order?.totalPrice,
      delivery: data.delivery!,
      payment: data.payment!,
      stripe: stripe ?? null,
    }
    data.note && Object.assign(newOrder, { note: data.note });
    await createOrder(newOrder)
    if (payment !== PaymentEnum.ONLINE) {
      await clearIndexedDb()
      await router.push({
        pathname: '/thanks',
        query: { success: 'true' },
      })
    }
    reset()
    setIsLoading(false)
  }

  return (
    <Container className={styles.summaryContainer}>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.summary}>
        <Address register={register} errors={errors} control={control} />
        <div className={styles.orderContainer}>
          <OrderItems
            order={order}
            register={register}
            errors={errors}
            control={control}
          />
          <Delivery control={control} message={errors.delivery?.message} />
        <Payment control={control} message={errors.payment?.message} />
        </div>
        </div>
        <div className={styles.summarySecondRow}>
        <Voucher />
        <TotalSection
            delivery={delivery}
            payment={payment}
            price={order?.totalPrice}
            finalPrice={finalPrice}
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
