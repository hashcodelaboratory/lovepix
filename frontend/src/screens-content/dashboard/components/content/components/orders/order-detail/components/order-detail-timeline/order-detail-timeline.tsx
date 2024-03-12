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

type Props = {
  order?: Order
}

const OrderDetailTimeline = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

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

  return (
    <VerticalTimeline>
      {orderStates?.map(({ state, date }) => (
        <VerticalTimelineElement
          key={date}
          className='vertical-timeline-element--work'
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date={new Date(date).toLocaleDateString()}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
          <h3 className='vertical-timeline-element-title'>{t(state)}</h3>
          <p className='vertical-timeline-element-subtitle'>Informácie:</p>
          <p>{new Date(date).toLocaleTimeString()}</p>
        </VerticalTimelineElement>
      ))}
      <VerticalTimelineElement
        className='vertical-timeline-element--education'
        date={new Date().toLocaleDateString()}
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
      >
        <h3 className='vertical-timeline-element-title'>Zmeniť stav</h3>
        <Select defaultValue={getStates()[0]?.state}>
          {getStates().map(({ state }) => (
            <MenuItem key={state} value={state}>
              {t(state)}
            </MenuItem>
          ))}
        </Select>
        <p className='vertical-timeline-element-subtitle'>Informácie:</p>
        <div className={styles.timelineSave}>
          <Button variant='contained'>Uložiť</Button>
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
      />
    </VerticalTimeline>
  )
}

export default OrderDetailTimeline
