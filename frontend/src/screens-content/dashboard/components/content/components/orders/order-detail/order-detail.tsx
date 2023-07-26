import styles from './order-detail.module.scss'
import { Order } from '../../../../../../../common/types/order'
import OrderDetailShoppingCart from './components/order-detail-shopping-cart/order-detail-shopping-cart'
import OrderDetailHistory from './components/order-detail-history/order-detail-history'
import OrderDetailCustomer from './components/order-detail-customer/order-detail-customer'
import OrderDetailShipping from './components/order-detail-shipping/order-detail-shipping'
import OrderDetailTitle from './components/order-detail-title/order-detail-title'

type OrderDetailProps = {
  order?: Order
}

const OrderDetail = ({ order }: OrderDetailProps): JSX.Element => (
  <div className={styles.container}>
    <OrderDetailTitle id={order?.id} />
    <div className={styles.flex}>
      <OrderDetailShoppingCart order={order} />
      <OrderDetailHistory order={order} />
    </div>
    <div className={styles.flex}>
      <OrderDetailCustomer order={order} />
      <OrderDetailShipping order={order} />
    </div>
  </div>
)

export default OrderDetail
