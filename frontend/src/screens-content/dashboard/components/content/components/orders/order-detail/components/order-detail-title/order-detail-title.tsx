import { localizationKey } from '../../../../../../../../../localization/localization-key'
import { useTranslation } from 'next-i18next'
import styles from '../../order-detail.module.scss'

type Props = {
  id?: string
}

const OrderDetailTitle = ({ id }: Props): JSX.Element => {
  const { t } = useTranslation()

  return (
    <p className={styles.orderDetailTitle}>
      <b>{t(localizationKey.singleOrder)}</b> {id}
    </p>
  )
}

export default OrderDetailTitle
