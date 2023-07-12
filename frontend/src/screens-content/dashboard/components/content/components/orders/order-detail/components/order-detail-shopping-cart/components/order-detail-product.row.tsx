import styles from '../../../order-detail.module.scss'
import { ImageLayout } from '../../../../../../../../../home/enums/enums'
import Image from 'next/image'
import { Order } from '../../../../../../../../../../common/types/order'
import { Product } from 'common/types/product'

type OrderDetailProductRowProps = {
  product: Product
  index: number
  order: Order
}

const OrderDetailProductRow = ({
  product,
  index,
}: OrderDetailProductRowProps) => {
  const { qty, url, title, price } = product

  return (
    <div className={styles.row} key={index}>
      <div
        className={styles.flex}
        style={{ justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <p style={{ marginRight: 8 }}>{qty} ks</p>
        <a target='_blank' href={`${url}`} rel='noopener noreferrer'>
          <Image
            alt={url}
            src={url}
            width={40}
            height={40}
            layout={ImageLayout.FIXED}
          />
        </a>
      </div>
      <div>{title}</div>
      <div>{price.toFixed(2)} €</div>
    </div>
  )
}

export default OrderDetailProductRow
