import styles from '../../../../../shopping-cart.module.scss'
import { default as ImageComponent } from 'next/image'
import { ImageLayout } from '../../../../../../home/enums/enums'
import { Close } from '@mui/icons-material'
import { Order } from '../../../../../../../common/types/order'
import { Product } from '../../../../../../../common/types/product'
import { removeProduct } from '../utils/utils'

type CartRowProps = {
  order: Order
  product: Product
}

const CartRowProduct = ({ product, order }: CartRowProps): JSX.Element => {
  console.log(product.id)

  return (
    <div className={styles.cartRow} key={product.title}>
      <div className={styles.cartRowThumbnailContainer}>
        <ImageComponent
          alt={product.url}
          src={product.url}
          width={60}
          height={60}
          layout={ImageLayout.FIXED}
        />
        <div>
          <p className={styles.cartRowDescription}>
            <div>{product.title}</div>
          </p>
          <p className={styles.qtyField}>{product.qty} ks</p>
        </div>
      </div>
      <div className={styles.cartRowPrice}>
        {Number(product?.price * product.qty).toFixed(2)} €
      </div>
      <Close
        className={styles.cartRowClose}
        color='error'
        onClick={() => removeProduct(product.id, order.shoppingCart?.products)}
      />
    </div>
  )
}

export default CartRowProduct
