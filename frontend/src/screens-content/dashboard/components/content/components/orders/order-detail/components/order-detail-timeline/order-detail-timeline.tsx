import styles from '../../order-detail.module.scss'
import { localizationKey } from '../../../../../../../../../localization/localization-key'
import { useTranslation } from 'next-i18next'
import { Order } from '../../../../../../../../../common/types/order'
import InventoryIcon from '@mui/icons-material/Inventory'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import RedeemIcon from '@mui/icons-material/Redeem'
import ArchiveIcon from '@mui/icons-material/Archive'
import { OrderState as OrderStateEnum } from 'common/enums/order-states'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { Payment } from '../../../../../../../../../common/enums/payment'
import { Delivery } from '../../../../../../../../../common/enums/delivery'
import { sendMailOrderDelivered } from '../../../../../../../../../common/api/send-mail-order-delivered'
import { sendMailOrderShipped } from '../../../../../../../../../common/api/send-mail-order-shipped'
import { createInvoice } from '../../../../../../../../../common/api/superfaktura'
import { invoice } from '../../../../../../../../shopping-cart/components/summary/summary/utils'
import { useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import { useUpdateOrderState } from '../../../../../../../api/order/use-order-state-update'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../../../../snackbar/config'
import { ORDERS_KEY } from '../../../../../../../api/orders/utils/keys'
import { useSnackBarNotification } from '../order-detail-history/utils/use-sanckbar-notification'
import { useState } from 'react'

type Props = {
  order?: Order
}

const OrderDetailTimeline = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { snackBarNotification } = useSnackBarNotification()

  const { mutate: editOrderState } = useUpdateOrderState({
    onSuccess: async (res) => {
      if (res.error) {
        enqueueSnackbar(res.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        enqueueSnackbar(String(res.status), SNACKBAR_OPTIONS_SUCCESS)
      }
      await queryClient.invalidateQueries(ORDERS_KEY)
    },
  })

  const [selectedState, setSelectedState] = useState<string>()

  const iconStyle = (state: string) => {
    const item = order?.orderState?.map((item) => item.state === state)
    return item ? styles.shippingIcon : styles.shippingIconDisable
  }

  const { CREATED, ACCEPTED, PACKED, FINISHED, SHIPPED, PAID } = OrderStateEnum

  const orderStates = order?.orderState

  const getStates = () => {
    if (
      order?.payment === Payment.PERSONAL_DELIVERY &&
      order.delivery === Delivery.PERSONAL_COLLECT
    ) {
      return [
        {
          icon: <InventoryIcon className={iconStyle(CREATED)} />,
          message: t(localizationKey.created),
          state: CREATED,
        },
        {
          icon: <AddShoppingCartIcon className={iconStyle(ACCEPTED)} />,
          message: t(localizationKey.accepted),
          state: ACCEPTED,
        },
        {
          icon: <ArchiveIcon className={iconStyle(PACKED)} />,
          message: t(localizationKey.packed),
          state: PACKED,
        },
        {
          icon: <RedeemIcon className={iconStyle(SHIPPED)} />,
          message: t(localizationKey.finished),
          state: FINISHED,
        },
      ]
    }

    if (
      order?.payment === Payment.TRANSACTION &&
      order.delivery === Delivery.PERSONAL_COLLECT
    ) {
      return [
        {
          icon: <InventoryIcon className={iconStyle(CREATED)} />,
          message: t(localizationKey.created),
          state: CREATED,
        },
        {
          icon: <AddShoppingCartIcon className={iconStyle(ACCEPTED)} />,
          message: t(localizationKey.accepted),
          state: ACCEPTED,
        },
        {
          icon: <ArchiveIcon className={iconStyle(PAID)} />,
          message: t(localizationKey.paid),
          state: PAID,
        },
        {
          icon: <ArchiveIcon className={iconStyle(PACKED)} />,
          message: t(localizationKey.packed),
          state: PACKED,
        },

        {
          icon: <RedeemIcon className={iconStyle(SHIPPED)} />,
          message: t(localizationKey.finished),
          state: FINISHED,
        },
      ]
    }

    if (
      order?.payment === Payment.ONLINE &&
      order.delivery === Delivery.PERSONAL_COLLECT
    ) {
      return [
        {
          icon: <InventoryIcon className={iconStyle(CREATED)} />,
          message: t(localizationKey.created),
          state: CREATED,
        },
        {
          icon: <AddShoppingCartIcon className={iconStyle(ACCEPTED)} />,
          message: t(localizationKey.accepted),
          state: ACCEPTED,
        },
        {
          icon: <ArchiveIcon className={iconStyle(PACKED)} />,
          message: t(localizationKey.packed),
          state: PACKED,
        },
        {
          icon: <RedeemIcon className={iconStyle(SHIPPED)} />,
          message: t(localizationKey.finished),
          state: FINISHED,
        },
      ]
    }

    if (
      order?.payment === Payment.ONLINE &&
      order.delivery === Delivery.COURIER
    ) {
      return [
        {
          icon: <InventoryIcon className={iconStyle(CREATED)} />,
          message: t(localizationKey.created),
          state: CREATED,
        },
        {
          icon: <AddShoppingCartIcon className={iconStyle(ACCEPTED)} />,
          message: t(localizationKey.accepted),
          state: ACCEPTED,
        },
        {
          icon: <ArchiveIcon className={iconStyle(PACKED)} />,
          message: t(localizationKey.packed),
          state: PACKED,
        },
        {
          icon: <RedeemIcon className={iconStyle(SHIPPED)} />,
          message: t(localizationKey.finished),
          state: FINISHED,
        },
      ]
    }

    if (
      order?.payment === Payment.TRANSACTION &&
      order.delivery === Delivery.COURIER
    ) {
      return [
        {
          icon: <InventoryIcon className={iconStyle(CREATED)} />,
          message: t(localizationKey.created),
          state: CREATED,
        },
        {
          icon: <AddShoppingCartIcon className={iconStyle(ACCEPTED)} />,
          message: t(localizationKey.accepted),
          state: ACCEPTED,
        },
        {
          icon: <ArchiveIcon className={iconStyle(PAID)} />,
          message: t(localizationKey.paid),
          state: PAID,
        },
        {
          icon: <ArchiveIcon className={iconStyle(PACKED)} />,
          message: t(localizationKey.packed),
          state: PACKED,
        },
        {
          icon: <RedeemIcon className={iconStyle(SHIPPED)} />,
          message: t(localizationKey.finished),
          state: FINISHED,
        },
      ]
    }

    return [
      {
        icon: <InventoryIcon className={iconStyle(CREATED)} />,
        message: t(localizationKey.created),
        state: CREATED,
      },
      {
        icon: <AddShoppingCartIcon className={iconStyle(ACCEPTED)} />,
        message: t(localizationKey.accepted),
        state: ACCEPTED,
      },
      {
        icon: <ArchiveIcon className={iconStyle(PACKED)} />,
        message: t(localizationKey.packed),
        state: PACKED,
      },
      {
        icon: <LocalShippingIcon className={iconStyle(SHIPPED)} />,
        message: t(localizationKey.shipped),
        state: SHIPPED,
      },
      {
        icon: <RedeemIcon className={iconStyle(SHIPPED)} />,
        message: t(localizationKey.finished),
        state: FINISHED,
      },
    ].filter((state) => orderStates?.find((item) => item.state !== state.state))
  }

  const updateOrderState = async () => {
    if (!order) {
      return
    }
    const array = order.orderState
    selectedState && array.push({ state: selectedState, date: Date.now() })
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
      await updateOrderState()
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
      await sendMailStateDelivered(pdfInvoice)
      await updateOrderState()
    }
  }

  const save = async () => {
    if (!order) {
      return
    }

    if (selectedState === OrderStateEnum.SHIPPED) {
      await sendMailOrderStateShipped()
    } else if (
      selectedState === OrderStateEnum.SHIPPED &&
      order.payment !== Payment.ONLINE
    ) {
      await createSFInvoice()
    } else {
      await updateOrderState()
    }
  }

  return (
    <VerticalTimeline>
      {orderStates?.map(({ state, date }) => (
        <VerticalTimelineElement
          key={date}
          className='vertical-timeline-element--work'
          contentStyle={{ background: 'rgb(33, 150, 243)', color: 'white' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date={new Date(date).toLocaleDateString()}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: 'white' }}
        >
          <h3 className='vertical-timeline-element-title'>{t(state)}</h3>
          <p className='vertical-timeline-element-subtitle'>Informácie:</p>
          <p>{new Date(date).toLocaleDateString()}</p>
          <p>{new Date(date).toLocaleTimeString()}</p>
        </VerticalTimelineElement>
      ))}
      <VerticalTimelineElement
        className='vertical-timeline-element--education'
        date={new Date().toLocaleDateString()}
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
      >
        <h3 className='vertical-timeline-element-title'>Zmeniť stav</h3>
        <Select
          onChange={(e) => {
            setSelectedState(String(e.target.value))
          }}
        >
          {getStates().map(({ state }) => (
            <MenuItem key={state} value={state}>
              {t(state)}
            </MenuItem>
          ))}
        </Select>
        <p className='vertical-timeline-element-subtitle'>Informácie:</p>
        <div className={styles.timelineSave}>
          <Button variant='contained' disabled={!selectedState} onClick={save}>
            Uložiť
          </Button>
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
      />
    </VerticalTimeline>
  )
}

export default OrderDetailTimeline