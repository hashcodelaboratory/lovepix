import styles from '../../order-detail.module.scss'
import { messages } from '../../../../../../../../../messages/messages'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Order } from '../../../../../../../../../common/types/order'
import InventoryIcon from '@mui/icons-material/Inventory'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type Props = {
  order?: Order
}

const OrderDetailHistory = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

  const date = new Date(order?.date ?? '')

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>{t(messages.orderHistory)}</h4>
      <div className={styles.detailRow}>
        <InventoryIcon className={styles.shippingIcon} />
        <div>
          <div className={styles.checkRow}>
            <b>{t(messages.orderCreated)}</b>
            <CheckCircleIcon className={styles.checkCircleIcon} />
          </div>
          <div style={{ color: 'gray' }}>
            {`${date.toLocaleDateString()}
            ${date.toTimeString()}`}
          </div>
        </div>
      </div>
    </Box>
  )
}

export default OrderDetailHistory
