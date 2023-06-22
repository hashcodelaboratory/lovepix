import styles from '../../../../shopping-cart.module.scss'
import { useTranslation } from 'next-i18next'
import { messages } from '../../../../../../messages/messages'
import { FieldErrors, Control } from 'react-hook-form'
import { Order } from '../../../../../../common/types/order'
import { Image } from '../../../../../../common/types/image'
import { Product } from '../../../../../../common/types/product'
import { FormInputs } from '../../../../../../common/types/form'
import CartRow from './components/cart-row'
import CartRowProduct from './components/cart-row-product'

type DeliveryProps = {
  order: Order
  register: any
  errors: FieldErrors<FormInputs>
  control: Control<FormInputs>
}

const OrderItems = ({ order }: DeliveryProps) => {
  const { t } = useTranslation()

  const { images, products } = order?.shoppingCart

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTitleContainer}>
        <h3 className={styles.cartTitleText}>
          {String(t(messages.singleOrder))}
        </h3>
      </div>
      <div className={styles.cartItemsContainer}>
        {images?.map((image: Image) => (
          <CartRow key={image.url} image={image} order={order} />
        ))}
        {products?.map((product: Product) => (
          <CartRowProduct key={product.id} product={product} order={order} />
        ))}
      </div>
    </div>
  )
}

export default OrderItems
