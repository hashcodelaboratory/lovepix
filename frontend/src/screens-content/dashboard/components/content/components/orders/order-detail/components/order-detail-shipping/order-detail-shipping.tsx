import styles from '../../order-detail.module.scss'
import { Box } from '@mui/material'
import { Order } from '../../../../../../../../../common/types/order'
import { useTranslation } from 'next-i18next'
import { LocalShipping as LocalShippingIcon } from '@mui/icons-material'
import { localizationKey } from '../../../../../../../../../localization/localization-key'

type Props = {
  order?: Order
}

const OrderDetailShipping = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

  const { ico, dic, company, address, city, postalCode, note } =
    order?.form ?? {}

  const formular = [
    { title: 'ICO', value: ico },
    { title: 'DIC', value: dic },
    { title: localizationKey.company, value: company },
    { title: localizationKey.address, value: address },
    { title: localizationKey.city, value: city },
    { title: localizationKey.postalCode, value: postalCode },
    { title: localizationKey.note, value: note },
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
      <h4>{t(localizationKey.billingAddress)}</h4>
      {formList}
      <div className={styles.detailRow} style={{ marginTop: 20 }}>
        <LocalShippingIcon className={styles.detailIcon} />
        {t(order?.delivery ?? '')}
      </div>
    </Box>
  )
}

export default OrderDetailShipping
