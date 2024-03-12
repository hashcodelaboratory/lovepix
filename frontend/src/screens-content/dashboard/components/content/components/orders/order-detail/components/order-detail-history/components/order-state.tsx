import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import styles from '../../../order-detail.module.scss'
import {
  Order,
  OrderState,
} from '../../../../../../../../../../common/types/order'
import { useQueryClient } from 'react-query'
import { ORDERS_KEY } from '../../../../../../../../api/orders/utils/keys'
import UpdateOrderState from './order-state-modal'
import { invoice } from '../../../../../../../../../shopping-cart/components/summary/summary/utils'
import { createInvoice } from '../../../../../../../../../../common/api/superfaktura'
import { OrderState as OrderStateEnum } from '../../../../../../../../../../common/enums/order-states'
import { sendMailOrderShipped } from '../../../../../../../../../../common/api/send-mail-order-shipped'
import { sendMailOrderDelivered } from '../../../../../../../../../../common/api/send-mail-order-delivered'
import { Payment } from '../../../../../../../../../../common/enums/payment'
import { localizationKey } from '../../../../../../../../../../localization/localization-key'
import { useTranslation } from 'next-i18next'
import { useSnackBarNotification } from '../utils/use-sanckbar-notification'
import { useUpdateOrderState } from '../../../../../../../../api/order/use-order-state-update'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'

type Props = {
  order?: Order
  icon: any
  message: string
  dateState: OrderState | undefined
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
}: Props) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const { mutate: editOrderState } = useUpdateOrderState({
    onSuccess: (res) => {
      if (res.error) {
        enqueueSnackbar(res.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        enqueueSnackbar(String(res.status), SNACKBAR_OPTIONS_SUCCESS)
      }
      queryClient.invalidateQueries(ORDERS_KEY)
    },
  })

  const allowOpenModal = order && order.orderState?.length
  const [open, setOpen] = useState(false)
  const { snackBarNotification } = useSnackBarNotification()

  const openModal = () => {
    allowOpenModal === index && setOpen(true)
  }

  const toggleModal = () => setOpen((prevState) => !prevState)

  const updateOrderState = async () => {
    if (!order) {
      return
    }
    const array = order.orderState
    array.push({ state: state, date: Date.now() })
    editOrderState({ orderId: order.id, orderState: array })
  }

  const sendMailStateDelivered = async (pdfInvoice: string) => {
    if (!order) {
      return
    }
    const response = await sendMailOrderDelivered(
      order.id,
      order.form.email,
      t(localizationKey.yourOrderHasBeenDelivered),
      pdfInvoice
    )
    snackBarNotification(
      response,
      localizationKey.orderStateSnackbar,
      localizationKey.emailErrorSnackbar
    )
  }

  const sendMailOrderStateShipped = async () => {
    if (!order) {
      return
    }
    const response = await sendMailOrderShipped(
      order.id,
      order.form.email,
      t(localizationKey.yourOrderHasBeenSent)
    )
    if (response.ok) {
      updateOrderState()
    }
    snackBarNotification(
      response,
      localizationKey.orderStateSnackbar,
      localizationKey.emailErrorSnackbar
    )
  }

  const createSFInvoice = async () => {
    if (!order) {
      return
    }

    const response = await createInvoice(invoice(order.id, order))
    snackBarNotification(
      response,
      localizationKey.createInvoiceSuccessMessage,
      localizationKey.createInvoiceErrorMessage
    )
    if (response.ok) {
      const res = await response.json()
      const id = res.data?.Invoice.id
      const token = res.data?.Invoice.token
      const pdfInvoice = `https://moja.superfaktura.sk/slo/invoices/pdf/${id}/token:${token}/signature:1/bysquare:1`
      sendMailStateDelivered(pdfInvoice)
      updateOrderState()
    }
  }

  const save = async () => {
    if (!order) {
      return
    }

    if (state === OrderStateEnum.FINISHED) {
      sendMailOrderStateShipped()
    } else if (
      state === OrderStateEnum.SHIPPED &&
      order.payment !== Payment.ONLINE
    ) {
      createSFInvoice()
    } else {
      updateOrderState()
    }
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
