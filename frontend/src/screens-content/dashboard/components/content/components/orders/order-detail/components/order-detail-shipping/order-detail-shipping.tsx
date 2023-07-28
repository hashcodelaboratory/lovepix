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

  const {
    ico,
    dic,
    company,
    address,
    city,
    postalCode,
    note,
    firstNameShippingAddress = '-',
    lastNameShippingAddress = '-',
    addressShippingAddress = '-',
    cityShippingAdress = '-',
    postalCodeShippingAddress = '-',
  } = order?.form ?? {}

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
    <div
      key={index}
      style={{
        fontSize: 12,
        display: 'flex',
        width: 420,
        justifyContent: 'space-between',
      }}
    >
      <p className={styles.boxTitle}>{t(item.title)}:</p>
      <p className={styles.boxText}>{item.value}</p>
    </div>
  ))

  return (
    <Box className={styles.box} style={{ width: 600 }}>
      <h4>{t(localizationKey.billingAddress)}</h4>
      <div className={styles.boxDark}>
        {formList}
        <div className={styles.detailRow} style={{ marginTop: 20 }}>
          <LocalShippingIcon className={styles.detailIcon} />
          {t(order?.delivery.toLowerCase() ?? '')}
        </div>
      </div>
      <h4 style={{ marginTop: 14 }}>{t(localizationKey.shipping)}</h4>
      <div className={styles.boxDark} style={{ fontSize: 12 }}>
        <p className={styles.boxText}>
          {firstNameShippingAddress} {lastNameShippingAddress}
        </p>
        <p className={styles.boxText}>{addressShippingAddress} </p>
        <p className={styles.boxText}>{cityShippingAdress}</p>
        <p className={styles.boxText}>{postalCodeShippingAddress}</p>
      </div>
    </Box>
  )
}

export default OrderDetailShipping
