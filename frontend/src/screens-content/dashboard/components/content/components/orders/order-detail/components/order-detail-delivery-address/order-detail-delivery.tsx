import styles from '../../order-detail.module.scss'
import { Box } from '@mui/material'
import { Order } from '../../../../../../../../../common/types/order'
import { useTranslation } from 'next-i18next'
import { messages } from 'messages/messages'

type Props = {
  order?: Order
}

const OrderDetailDelivery = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>{t(messages.shipping)}</h4>
      <div style={{ fontSize: 12 }}>
        <p>
          {order?.form?.firstNameShippingAddress ?? '-'}{' '}
          {order?.form.lastNameShippingAddress ?? '-'}
        </p>
        <p>{order?.form?.addressShippingAddress ?? '-'} </p>
        <p>{order?.form?.cityShippingAdress ?? '-'}</p>
        <p>{order?.form?.postalCodeShippingAddress ?? '-'}</p>
      </div>
    </Box>
  )
}

export default OrderDetailDelivery
