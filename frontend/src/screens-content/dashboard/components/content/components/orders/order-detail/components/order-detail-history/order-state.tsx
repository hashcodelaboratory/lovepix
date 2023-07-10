import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import styles from '../../order-detail.module.scss'
import { Order, OrderStates } from 'common/types/order'
import { Collections } from 'common/firebase/enums'
import { doc, updateDoc } from 'firebase/firestore'
import { database } from 'common/firebase/config'
import { useQueryClient } from 'react-query'
import { ORDERS_KEY } from 'screens-content/dashboard/api/orders/utils/keys'
import UpdateOrderState from './order-state-modal'
import { invoice } from 'screens-content/shopping-cart/components/summary/summary/utils'
import { createInvoice } from 'common/api/superfaktura'
import { OrderState as OrderStateEnum } from 'common/enums/order-states'
import { sendMailOrderPicked } from 'common/api/send-mail-order-picked'
import { sendMailOrderShipped } from 'common/api/send-mail-order-shipped'
import { Payment } from 'common/enums/payment'
import { messages } from 'messages/messages'
import { useTranslation } from 'next-i18next'
import { useSnackBarNotification } from './use-sanckbar-notification'

type Props = {
  order?: Order
  icon: any
  message: string
  dateState: OrderStates | undefined
  index: number
  state: string
}

const OrderState = ({
  order,
  icon,
  message,
  dateState,
  index,
  state,
}: Props): JSX.Element => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const allowOpenModal = order && order.orderState?.length
  const [open, setOpen] = useState(false)
  const { snackBarNotification } = useSnackBarNotification()

  const openModal = () => {
    allowOpenModal === index && setOpen(true)
  }

  const toggleModal = () => setOpen((prevState) => !prevState)

  const sendMailStateShipped = async (pdfInvoice: string) => {
    if (!order) {
      return
    }
    const response = await sendMailOrderShipped(
      order.id,
      order.form.email,
      t(messages.order),
      pdfInvoice
    )
    snackBarNotification(response)
  }

  const sendMailStatePicked = async () => {
    if (!order) {
      return
    }
    const response = await sendMailOrderPicked(
      order.id,
      order.form.email,
      t(messages.yourOrderHasBeenSent)
    )
    snackBarNotification(response)
  }

  const createSFInvoice = async () => {
    if (!order) {
      return
    }

    const response = await createInvoice(invoice(order.id, order))
    if (response) {
      const res = await response.json()
      const id = res.data.Invoice.id
      const token = res.data.Invoice.token
      const pdfInvoice = `https://moja.superfaktura.sk/slo/invoices/pdf/${id}/token:${token}/signature:1/bysquare:1`
      sendMailStateShipped(pdfInvoice)
    }
  }

  const save = async () => {
    if (!order) {
      return
    }

    const array = order.orderState
    const newArray = [...array, { state: state, date: Date.now() }]
    const docData = {
      orderState: newArray,
    }
    await updateDoc(doc(database, Collections.ORDERS, order.id), docData)
    await queryClient.invalidateQueries(ORDERS_KEY)

    state === OrderStateEnum.PICKED && sendMailStatePicked()
    state === OrderStateEnum.SHIPPED &&
      order.payment !== Payment.ONLINE &&
      createSFInvoice()
    toggleModal()
  }

  const orderStateDate = dateState
    ? new Date(dateState.date).toLocaleDateString()
    : '-'

  const orderStateTime = dateState
    ? new Date(dateState.date).toLocaleTimeString()
    : '-'

  const orderStateIcon = dateState && (
    <CheckCircleIcon className={styles.checkCircleIcon} />
  )

  return (
    <>
      <div className={styles.detailRow} onClick={openModal}>
        {icon}
        <div>
          <div className={styles.checkRow}>
            <b>{message}</b>
            {orderStateIcon}
          </div>
          <div style={{ color: 'gray' }}>
            <div>{orderStateDate}</div>
            <div>{orderStateTime}</div>
          </div>
        </div>
      </div>
      <UpdateOrderState
        open={open}
        closeModal={toggleModal}
        save={save}
        title={message}
      />
    </>
  )
}

export default OrderState
