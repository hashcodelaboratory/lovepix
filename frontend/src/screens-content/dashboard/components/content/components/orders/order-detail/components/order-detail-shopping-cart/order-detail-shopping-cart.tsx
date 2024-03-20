import styles from '../../order-detail.module.scss'
import { localizationKey } from '../../../../../../../../../localization/localization-key'
import OrderDetailRow from './components/order-detail-row'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Order } from '../../../../../../../../../common/types/order'
import OrderDetailProductRow from './components/order-detail-product.row'

type Props = {
  order?: Order
}

const OrderDetailShoppingCart = ({ order }: Props): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Box className={styles.box} style={{ width: '100%', height: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p className={styles.orderDetailShoppingTitle}>
          {t(localizationKey.shoppingCart)}
        </p>
      </div>
      {order?.shoppingCart?.images?.map((image, index) => (
        <OrderDetailRow key={index} index={index} image={image} order={order} />
      ))}
      {order?.shoppingCart?.products?.map((product, index) => (
        <OrderDetailProductRow
          key={index}
          index={index}
          product={product}
          order={order}
        />
      ))}
      <div style={{ float: 'right', textAlign: 'right' }}>
        <p className={styles.orderDetailVoucher}>
          {t(localizationKey.voucherCode)}:{' '}
          <b>{order?.voucher?.code ?? 'bez kuponu'}</b>
        </p>
        <p className={styles.orderDetailTotal}>
          Spolu: <b>{Number(order?.totalPrice).toFixed(2)} €</b>
        </p>
      </div>
    </Box>
  )
}

export default OrderDetailShoppingCart
