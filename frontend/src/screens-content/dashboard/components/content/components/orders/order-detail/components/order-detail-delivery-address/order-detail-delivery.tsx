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
  const {
    firstNameShippingAddress = '-',
    lastNameShippingAddress = '-',
    addressShippingAddress = '-',
    cityShippingAdress = '-',
    postalCodeShippingAddress = '-',
  } = order?.form ?? {}

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>{t(messages.shipping)}</h4>
      <div style={{ fontSize: 12 }}>
        <p>
          {firstNameShippingAddress} {lastNameShippingAddress}
        </p>
        <p>{addressShippingAddress} </p>
        <p>{cityShippingAdress}</p>
        <p>{postalCodeShippingAddress}</p>
      </div>
    </Box>
  )
}

export default OrderDetailDelivery
