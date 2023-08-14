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
    <Box className={styles.box} style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t(localizationKey.shoppingCart)}</h4>
        <h4>{Number(order?.totalPrice).toFixed(2)} €</h4>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t(localizationKey.voucherCode)}</h4>
        <h4 style={{ color: '#E51F3D' }}>
          {order?.voucher?.code ?? 'Bez kuponu'}
        </h4>
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
    </Box>
  )
}

export default OrderDetailShoppingCart
