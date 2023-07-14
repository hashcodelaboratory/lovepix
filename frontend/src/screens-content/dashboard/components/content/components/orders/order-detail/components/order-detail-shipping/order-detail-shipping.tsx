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

  const { ico, dic, company, address, city, postalCode, note } =
    order?.form ?? {}

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>Fakturačná adresa</h4>
      <div style={{ fontSize: 12 }}>
        <p>ICO: {ico}</p>
        <p>DIC: {dic}</p>
        <p>COMPANY: {company}</p>
        <p>{address}</p>
        <p>{city} </p>
        <p>{postalCode}</p>
        <p>{note}</p>
      </div>
      <div className={styles.detailRow} style={{ marginTop: 20 }}>
        <LocalShippingIcon className={styles.detailIcon} />
        {t(order?.delivery ?? '')}
      </div>
    </Box>
  )
}

export default OrderDetailShipping
