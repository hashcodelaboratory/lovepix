import styles from '../../../shopping-cart.module.scss'
import { Container } from '@mui/system'
import Cart from '../cart/cart'
import Delivery from '../components/delivery/delivery'
import { Order } from "../../../../../common/types/order";

type SummaryProps = {
  order: Order;
}

const Summary = ({ order }: SummaryProps) => {
  return (
    <Container>
      <div className={styles.summary}>
        <Cart order={order} />
        <Delivery order={order} />
      </div>
    </Container>
  )
}

export default Summary
