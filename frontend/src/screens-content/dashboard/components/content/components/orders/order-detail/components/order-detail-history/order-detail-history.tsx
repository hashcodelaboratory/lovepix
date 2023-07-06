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
import UpdateOrderState from './order-state-modal'
import { useState } from 'react'
import { ORDER_STATE } from 'common/enums/order-states'

type Props = {
  order?: Order
}

const OrderDetailHistory = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const toggleModal = () => setOpen((prevState) => !prevState)

  const iconStyle = (state: string) => {
    const item = order?.orderState?.find((item) => item.state === state)
    return item ? styles.shippingIcon : styles.shippingIconDisable
  }

  const states = [
    {
      icon: <InventoryIcon className={iconStyle(ORDER_STATE.CREATED)} />,
      message: t(messages.orderCreated),
    },
    {
      icon: <AddShoppingCartIcon className={iconStyle(ORDER_STATE.PICKED)} />,
      message: 'Prijatá',
    },
    {
      icon: <ArchiveIcon className={styles.shippingIconDisable} />,
      message: 'Spracovaná',
    },
    {
      icon: <LocalShippingIcon className={styles.shippingIconDisable} />,
      message: 'Odoslaná',
    },
    {
      icon: <RedeemIcon className={styles.shippingIconDisable} />,
      message: 'Dokončená',
    },
  ]

  const stateColumn = states.map((item, index) => (
    <OrderState
      key={index}
      order={order}
      icon={item.icon}
      message={item.message}
      dateState={order?.orderState ? order?.orderState[index] : ''}
      toggleModal={toggleModal}
      index={index}
    />
  ))

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>{t(messages.orderHistory)}</h4>
      {stateColumn}
      <UpdateOrderState open={open} closeModal={toggleModal} />
    </Box>
  )
}

export default OrderDetailHistory
