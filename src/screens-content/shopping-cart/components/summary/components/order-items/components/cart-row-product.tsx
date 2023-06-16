import styles from '../../../../../shopping-cart.module.scss'
import { default as ImageComponent } from 'next/image'
import { ImageLayout } from '../../../../../../home/enums/enums'
import { Close } from '@mui/icons-material'
import { Order, Product } from '../../../../../../../common/types/order'

type CartRowProps = {
  order: Order
  product: Product
}

const CartRowProduct = ({ product, order }: CartRowProps): JSX.Element => {
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
        //onClick={() => removeImage(image?.url, order.shoppingCart?.images)}
      />
    </div>
  )
}

export default CartRowProduct
