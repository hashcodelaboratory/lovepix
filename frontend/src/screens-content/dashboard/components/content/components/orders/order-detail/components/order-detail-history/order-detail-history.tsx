import styles from '../../order-detail.module.scss'
import { messages } from '../../../../../../../../../messages/messages'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Order } from '../../../../../../../../../common/types/order'
import OrderState from './order-state'
import InventoryIcon from '@mui/icons-material/Inventory'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import RedeemIcon from '@mui/icons-material/Redeem'
import ArchiveIcon from '@mui/icons-material/Archive'
import { OrderState as OrderStateEnum } from 'common/enums/order-states'

type Props = {
  order?: Order
}

const OrderDetailHistory = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

  const iconStyle = (state: string) => {
    const item = order?.orderState?.find((item) => item.state === state)
    return item ? styles.shippingIcon : styles.shippingIconDisable
  }

  const states = [
    {
      icon: <InventoryIcon className={iconStyle(OrderStateEnum.CREATED)} />,
      message: t(messages.orderCreated),
      state: OrderStateEnum.CREATED,
    },
    {
      icon: (
        <AddShoppingCartIcon className={iconStyle(OrderStateEnum.DELIVERED)} />
      ),
      message: t(messages.accepted),
      state: OrderStateEnum.DELIVERED,
    },
    {
      icon: <ArchiveIcon className={iconStyle(OrderStateEnum.PACKED)} />,
      message: t(messages.packed),
      state: OrderStateEnum.PACKED,
    },
    {
      icon: <LocalShippingIcon className={iconStyle(OrderStateEnum.PICKED)} />,
      message: t(messages.shipped),
      state: OrderStateEnum.PICKED,
    },
    {
      icon: <RedeemIcon className={iconStyle(OrderStateEnum.SHIPPED)} />,
      message: t(messages.finished),
      state: OrderStateEnum.SHIPPED,
    },
  ]

  const stateColumn = states.map((item, index) => (
    <OrderState
      key={index}
      order={order}
      icon={item.icon}
      message={item.message}
      state={item.state}
      dateState={order?.orderState[index]}
      index={index}
    />
  ))

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>{t(messages.orderHistory)}</h4>
      {stateColumn}
    </Box>
  )
}

export default OrderDetailHistory
