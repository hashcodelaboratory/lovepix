import styles from '../../../order-detail.module.scss'
import { ImageLayout } from '../../../../../../../../../home/enums/enums'
import Image from 'next/image'
import { Order } from '../../../../../../../../../../common/types/order'
import { Product } from 'common/types/product'

type Props = {
  product: Product
  index: number
  order: Order
}

const OrderDetailProductRow = ({ product, index }: Props): JSX.Element => {
  return (
    <div className={styles.row} key={index}>
      <div
        className={styles.flex}
        style={{ justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <p style={{ marginRight: 8 }}>{product.qty} ks</p>
        <a target='_blank' href={`${product.url}`} rel='noopener noreferrer'>
          <Image
            alt={product.url}
            src={product.url}
            width={40}
            height={40}
            layout={ImageLayout.FIXED}
          />
        </a>
      </div>
      <div>{product.title}</div>
      <div>{product.price.toFixed(2)} €</div>
    </div>
  )
}

export default OrderDetailProductRow
