import styles from '../../order-detail.module.scss'
import { Box } from '@mui/material'
import { Order } from '../../../../../../../../../common/types/order'
import { useTranslation } from 'next-i18next'
import { LocalShipping as LocalShippingIcon } from '@mui/icons-material'
import { messages } from 'messages/messages'

type Props = {
  order?: Order
}

const OrderDetailShipping = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

  const { ico, dic, company, address, city, postalCode, note } =
    order?.form ?? {}

  const formular = [
    { title: 'Ico', value: ico },
    { title: 'DIC', value: dic },
    { title: messages.company, value: company },
    { title: messages.address, value: address },
    { title: messages.city, value: city },
    { title: messages.postalCode, value: postalCode },
    { title: messages.note, value: note },
  ]

  const formList = formular.map((item, index) => (
    <div key={index} style={{ fontSize: 12 }}>
      <p>
        {t(item.title)}: {item.value}
      </p>
    </div>
  ))

  return (
    <Box className={styles.box} style={{ width: 400 }}>
      <h4>Fakturačná adresa</h4>
      {formList}
      <div className={styles.detailRow} style={{ marginTop: 20 }}>
        <LocalShippingIcon className={styles.detailIcon} />
        {t(order?.delivery ?? '')}
      </div>
    </Box>
  )
}

export default OrderDetailShipping
