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
import {
  Checkbox,
  FormControlLabel,
  Select,
  TextareaAutosize,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { Payment } from '../../../../../../../../../common/enums/payment'
import { Delivery } from '../../../../../../../../../common/enums/delivery'
import { sendMailOrderDelivered } from '../../../../../../../../../common/api/send-mail-order-delivered'
import { sendMailOrderShipped } from '../../../../../../../../../common/api/send-mail-order-shipped'
import { useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import { useUpdateOrderState } from '../../../../../../../api/order/use-order-state-update'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../../../../snackbar/config'
import { ORDERS_KEY } from '../../../../../../../api/orders/utils/keys'
import { useState } from 'react'
import { useSnackBarNotification } from './utils/use-sanckbar-notification'
import { invoiceService } from '../../../../../../../../../common/services/invoice/invoice'

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
  const [genInvoice, setGenInvoice] = useState(false)
  const [uploadFTP, setUploadFTP] = useState(false)
  const [sendMail, setSendMail] = useState(false)
  const [sendInfo, setSendInfo] = useState<string>()

  const iconStyle = (state: string) => {
    const item = order?.orderState?.map((item) => item.state === state)
    return item ? styles.shippingIcon : styles.shippingIconDisable
  }

  const { CREATED, ACCEPTED, PACKED, FINISHED, SHIPPED, PAID } = OrderStateEnum

  const orderStates = order?.orderState

  const getStates = () => {
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
      order?.payment === Payment.TRANSACTION
        ? {
            icon: <ArchiveIcon className={iconStyle(PAID)} />,
            message: t(localizationKey.paid),
            state: PAID,
          }
        : null,
      order?.delivery === Delivery.COURIER
        ? {
            icon: <LocalShippingIcon className={iconStyle(SHIPPED)} />,
            message: t(localizationKey.shipped),
            state: SHIPPED,
          }
        : {
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
      .filter((state) => state !== null)
      .filter(
        (state) => !orderStates?.find((item) => item.state === state?.state)
      )
  }

  const updateOrderState = async () => {
    if (!order) {
      return
    }
    const array = order.orderState
    selectedState &&
      array.push({
        state: selectedState,
        date: Date.now(),
        invoice: genInvoice,
        email: sendMail,
        ftp: uploadFTP,
        info: sendInfo,
      })
    editOrderState({ orderId: order.id, orderState: array })
  }

  const sendMailDelivered = async (pdfInvoice: string) => {
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

  const sendMailShipped = async () => {
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

  const createInvoice = async () => {
    if (!order) {
      return
    }

    const pdfInvoice = await invoiceService.createInvoice(order)

    if (pdfInvoice) {
      await sendMailDelivered(pdfInvoice)
      await updateOrderState()
    }
  }

  const save = async () => {
    if (!order) {
      return
    }

    if (sendMail) {
      await sendMailShipped()
    } else if (genInvoice) {
      await createInvoice()
    } else if (uploadFTP) {
      // TODO: implement FTP upload
    } else {
      await updateOrderState()
    }
  }

  return (
    <VerticalTimeline>
      {orderStates?.map(({ state, date, info, invoice, ftp, email }) => (
        <VerticalTimelineElement
          key={date}
          className='vertical-timeline-element--work'
          contentStyle={{ background: 'rgb(206,234,255)', color: 'black' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date={new Date(date).toLocaleDateString()}
          iconStyle={{ background: 'rgb(206,234,255)', color: 'black' }}
        >
          <h3 className='vertical-timeline-element-title'>{t(state)}</h3>
          <p className='vertical-timeline-element-subtitle'>Informácie:</p>
          <p className={styles.timelineInfo}>{info}</p>
          <div>
            <FormControlLabel
              control={<Checkbox disabled checked={invoice} />}
              label='Vytvoriť faktúru'
            />
            <FormControlLabel
              control={<Checkbox disabled checked={email} />}
              label='Odoslať e-mail'
            />
            <FormControlLabel
              control={
                <Checkbox
                  // TODO: remove disabled
                  disabled
                  checked={ftp}
                />
              }
              label='Nahrať na FTP'
            />
          </div>

          <p>{new Date(date).toLocaleDateString()}</p>
          <p>{new Date(date).toLocaleTimeString()}</p>
        </VerticalTimelineElement>
      ))}
      <VerticalTimelineElement
        className='vertical-timeline-element--education'
        date={new Date().toLocaleDateString()}
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
      >
        <h3
          className='vertical-timeline-element-title'
          style={{ marginBottom: 8 }}
        >
          Zmeniť stav
        </h3>
        <Select
          onChange={(e) => {
            setSelectedState(String(e.target.value))
          }}
          style={{ width: 300 }}
          size='small'
        >
          {getStates().map((state) => (
            <MenuItem key={state?.state} value={state?.state}>
              {t(state?.state ?? '')}
            </MenuItem>
          ))}
        </Select>
        <p className='vertical-timeline-element-subtitle'>Informácie:</p>
        <TextareaAutosize
          minRows={5}
          onChange={(e) => setSendInfo(e.target.value)}
          style={{ width: '100%' }}
        />
        <div>
          <FormControlLabel
            control={
              <Checkbox onChange={(e) => setGenInvoice(e.target.checked)} />
            }
            label='Vytvoriť faktúru'
          />
          <FormControlLabel
            control={
              <Checkbox onChange={(e) => setSendMail(e.target.checked)} />
            }
            label='Odoslať e-mail'
          />
          <FormControlLabel
            control={
              <Checkbox
                // TODO: remove disabled
                disabled
                onChange={(e) => setUploadFTP(e.target.checked)}
              />
            }
            label='Nahrať na FTP'
          />
        </div>
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
