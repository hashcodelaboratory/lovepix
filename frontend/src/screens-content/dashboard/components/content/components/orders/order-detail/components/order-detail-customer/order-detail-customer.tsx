import styles from '../../order-detail.module.scss'
import { localizationKey } from '../../../../../../../../../localization/localization-key'
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
    <Box className={styles.box} style={{ width: 520, height: 260 }}>
      <h4>{t(localizationKey.customerDetails)}</h4>
      <div className={styles.boxDark}>
        <div className={styles.detailBoxRow}>
          <div className={styles.detailBoxRowLeft}>
            <PersonIcon className={styles.detailIcon} />
            <p className={styles.boxTitle}>Meno a priezvisko:</p>
          </div>
          <p
            className={styles.boxText}
          >{`${order?.form?.firstName} ${order?.form?.lastName}`}</p>
        </div>
        <div className={styles.detailBoxRow}>
          <div className={styles.detailBoxRowLeft}>
            <EmailIcon className={styles.detailIcon} />
            <p className={styles.boxTitle}>E-mail:</p>
          </div>
          <p className={styles.boxText}>{order?.form?.email}</p>
        </div>
        <div className={styles.detailBoxRow}>
          <div className={styles.detailBoxRowLeft}>
            <PhoneIcon className={styles.detailIcon} />
            <p className={styles.boxTitle}>Kontakt:</p>
          </div>
          <p className={styles.boxText}>{order?.form?.phone}</p>
        </div>
        <div className={styles.detailBoxRow}>
          <div className={styles.detailBoxRowLeft}>
            <PaymentsOutlinedIcon className={styles.detailIcon} />
            <p className={styles.boxTitle}>Platba:</p>
          </div>
          <p className={styles.boxText}>
            {t(order?.payment.toLowerCase() ?? '-')}
          </p>
        </div>
      </div>
    </Box>
  )
}

export default OrderDetailCustomer
