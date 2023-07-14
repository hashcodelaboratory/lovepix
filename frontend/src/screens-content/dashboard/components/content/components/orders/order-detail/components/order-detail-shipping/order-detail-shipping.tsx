import styles from '../../order-detail.module.scss'
import { Box } from '@mui/material'
import { Order } from '../../../../../../../../../common/types/order'
import { useTranslation } from 'next-i18next'
import { LocalShipping as LocalShippingIcon } from '@mui/icons-material'

type Props = {
  order?: Order
}

const OrderDetailShipping = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>Fakturačná adresa</h4>
      <div style={{ fontSize: 12 }}>
        <p>ICO: {order?.form?.ico}</p>
        <p>DIC: {order?.form?.dic}</p>
        <p>COMPANY: {order?.form?.company}</p>
        <p>{order?.form?.address}</p>
        <p>{order?.form?.city} </p>
        <p>{order?.form?.postalCode}</p>
        <p>{order?.form.note}</p>
      </div>
      <div className={styles.detailRow} style={{ marginTop: 20 }}>
        <LocalShippingIcon className={styles.detailIcon} />
        {t(order?.delivery ?? '')}
      </div>
    </Box>
  )
}

export default OrderDetailShipping
