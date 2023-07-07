import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import styles from '../../order-detail.module.scss'
import { Order } from 'common/types/order'
import { Collections } from 'common/firebase/enums'
import { doc, updateDoc } from 'firebase/firestore'
import { database } from 'common/firebase/config'
import { useQueryClient } from 'react-query'
import { ORDERS_KEY } from 'screens-content/dashboard/api/orders/utils/keys'
import UpdateOrderState from './order-state-modal'
import { invoice } from 'screens-content/shopping-cart/components/summary/summary/utils'
import { createInvoice } from 'common/api/superfaktura'
import { OrderState as OrderStateEnum } from 'common/enums/order-states'
import { sendOrderMail } from 'common/api/send-mail'
import { sendMailOrderPicked } from 'common/api/send-mail-order-picked'
import { sendMailOrderShipped } from 'common/api/send-mail-order-shipped'
import { useSnackbar } from 'notistack'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from 'snackbar/config'

type Props = {
  order: Order
  icon: any
  message: string
  dateState: any
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
  const queryClient = useQueryClient()
  const allowOpenModal = order && order.orderState?.length
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const openModal = () => {
    allowOpenModal === index && setOpen(true)
  }

  const toggleModal = () => setOpen((prevState) => !prevState)

  const createSFInvoice = async () => {
    const response = await createInvoice(
      invoice(order?.id ?? 'unnknown', order)
    )
    if (response) {
      const res = await response.json()
      const id = res?.data?.Invoice.id
      const token = res?.data?.Invoice.token
      const pdfInvoice = `https://moja.superfaktura.sk/slo/invoices/pdf/${id}/token:${token}/signature:1/bysquare:1`
      const responseMail = await sendMailOrderShipped(
        order.id,
        order.form.email,
        'Faktúra k vašej objednávke',
        pdfInvoice
      )
      if (responseMail.ok) {
        enqueueSnackbar(
          'Stava objednavky bol zmeneny a zakaznik informovany mailom o stave jeho objednávky',
          SNACKBAR_OPTIONS_SUCCESS
        )
      } else {
        enqueueSnackbar('Email sa nepodarilo odoslat', SNACKBAR_OPTIONS_ERROR)
      }
    }
  }

  const save = async () => {
    const array = order?.orderState
    const newArray = [...array!, { state: state, date: Date.now() }]
    const docData = {
      orderState: newArray,
    }
    await updateDoc(doc(database, Collections.ORDERS, order?.id ?? ''), docData)
    await queryClient.invalidateQueries(ORDERS_KEY)
    state === OrderStateEnum.SHIPPED && createSFInvoice()
    const result = await sendMailOrderPicked(
      order.id,
      order.form.email,
      'Vaša objednávka bola odoslaná'
    )
    state === OrderStateEnum.PICKED && result
    if (result.ok) {
      enqueueSnackbar(
        'Stava objednavky bol zmeneny a zakaznik informovany mailom o stave jeho objednávky',
        SNACKBAR_OPTIONS_SUCCESS
      )
    } else {
      enqueueSnackbar('Email sa nepodarilo odoslat', SNACKBAR_OPTIONS_ERROR)
    }
    toggleModal()
  }

  return (
    <>
      <div className={styles.detailRow} onClick={openModal}>
        {icon}
        <div>
          <div className={styles.checkRow}>
            <b>{message}</b>
            {dateState && (
              <CheckCircleIcon className={styles.checkCircleIcon} />
            )}
          </div>
          <div style={{ color: 'gray' }}>
            <div>
              {dateState
                ? new Date(dateState.date).toLocaleDateString()
                : 'date'}
            </div>
            <div>
              {dateState
                ? new Date(dateState.date).toLocaleTimeString()
                : 'time'}
            </div>
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
