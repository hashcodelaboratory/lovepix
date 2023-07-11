import styles from '../../order-detail.module.scss'
import { messages } from '../../../../../../../../../messages/messages'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Order } from '../../../../../../../../../common/types/order'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  PaymentsOutlined as PaymentsOutlinedIcon,
} from '@mui/icons-material'

type Props = {
  order?: Order
}

const OrderDetailCustomer = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Box className={styles.box} style={{ width: '100%', height: 200 }}>
      <h4>{t(messages.customerDetails)}</h4>
      <div className={styles.detailRow}>
        <PersonIcon className={styles.detailIcon} />
        {`${order?.form?.firstName} ${order?.form?.lastName}`}
      </div>
      <div className={styles.detailRow}>
        <EmailIcon className={styles.detailIcon} />
        {order?.form?.email}
      </div>
      <div className={styles.detailRow}>
        <PhoneIcon className={styles.detailIcon} />
        {order?.form?.phone}
      </div>
      <div className={styles.detailRow}>
        <PaymentsOutlinedIcon className={styles.detailIcon} />
        {order?.payment}
      </div>
    </Box>
  )
}

export default OrderDetailCustomer
