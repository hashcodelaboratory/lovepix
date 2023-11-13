import styles from '../../../../../shopping-cart.module.scss'
import { default as ImageComponent } from 'next/image'
import { ImageLayout } from '../../../../../../home/enums/enums'
import { Close } from '@mui/icons-material'
import { Order } from '../../../../../../../common/types/order'
import { Image } from '../../../../../../../common/types/image'
import { removeImage, updateQuantity, UpdateQuantityWay } from '../utils/utils'
import { formatPrice } from '../../../../../../../common/utils/priceFormatting'
import { useTranslation } from 'next-i18next'

type CartRowProps = {
  order: Order
  image: Image
  index: number
}

const CartRow = ({ image, order, index }: CartRowProps): JSX.Element => {
  const { i18n } = useTranslation()

  return (
    <div className={styles.cartRow} key={image.origin}>
      <div className={styles.cartRowThumbnailContainer}>
        <ImageComponent
          alt={image?.url}
          src={image?.url ?? ''}
          width={60}
          height={60}
          layout={ImageLayout.FIXED}
        />
        <div>
          <p className={styles.cartRowDescription}>
            <div>{image?.material}</div>
            <div>{`${image?.width} x ${image?.height}`}</div>
          </p>
          <div className={styles.qtyContainer}>
            <div
              className={styles.cartRowRemove}
              onClick={() =>
                updateQuantity(UpdateQuantityWay.DECREASE, order, image, index)
              }
            >
              -
            </div>
            <p className={styles.qtyField}>{image?.qty} </p>
            <div
              className={styles.cartRowRemove}
              onClick={() =>
                updateQuantity(UpdateQuantityWay.INCREASE, order, image, index)
              }
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cartRowPrice}>
        {formatPrice(image?.qty * image?.price, i18n.language)}
      </div>
      <Close
        className={styles.cartRowClose}
        color='error'
        onClick={() => removeImage(image?.url, order.shoppingCart)}
      />
    </div>
  )
}

export default CartRow
