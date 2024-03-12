import styles from '../../order-detail.module.scss'
import { localizationKey } from '../../../../../../../../../localization/localization-key'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Order } from '../../../../../../../../../common/types/order'
import OrderState from './components/order-state'
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
    const item = order?.orderState?.map((item) => item.state === state)
    return item ? styles.shippingIcon : styles.shippingIconDisable
  }

  const { CREATED, DELIVERED, PACKED, PICKED, SHIPPED } = OrderStateEnum

  const states = [
    {
      icon: <InventoryIcon className={iconStyle(CREATED)} />,
      message: t(localizationKey.created),
      state: CREATED,
    },
    {
      icon: <AddShoppingCartIcon className={iconStyle(DELIVERED)} />,
      message: t(localizationKey.accepted),
      state: DELIVERED,
    },
    {
      icon: <ArchiveIcon className={iconStyle(PACKED)} />,
      message: t(localizationKey.packed),
      state: PACKED,
    },
    {
      icon: <LocalShippingIcon className={iconStyle(PICKED)} />,
      message: t(localizationKey.shipped),
      state: PICKED,
    },
    {
      icon: <RedeemIcon className={iconStyle(SHIPPED)} />,
      message: t(localizationKey.finished),
      state: SHIPPED,
    },
  ]

  const stateColumn = states.map((item, index) => (
    <OrderState
      key={index}
      order={order}
      icon={item.icon}
      message={item.message}
      state={item.state}
      dateState={order?.orderState && order.orderState[index]}
      index={index}
    />
  ))

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>{t(localizationKey.orderHistory)}</h4>
      {stateColumn}
    </Box>
  )
}

export default OrderDetailHistory
