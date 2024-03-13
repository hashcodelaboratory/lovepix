import styles from './order-detail.module.scss'
import { Order } from '../../../../../../../common/types/order'
import OrderDetailShoppingCart from './components/order-detail-shopping-cart/order-detail-shopping-cart'
import OrderDetailHistory from './components/order-detail-history/order-detail-history'
import OrderDetailTitle from './components/order-detail-title/order-detail-title'
import OrderDetailTimeline from './components/order-detail-timeline/order-detail-timeline'

type OrderDetailProps = {
  order?: Order
}

const OrderDetail = ({ order }: OrderDetailProps): JSX.Element => (
  <div className={styles.container}>
    <OrderDetailTitle id={order?.id} />
    <OrderDetailShoppingCart order={order} />
    <div className={styles.flex}>
      <OrderDetailTimeline order={order} />
    </div>
  </div>
)

export default OrderDetail
