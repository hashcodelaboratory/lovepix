import { Button, Container, Skeleton } from '@mui/material'
import { useProduct } from 'common/api/use-product'
import Image from 'next/image'
import React, { useState } from 'react'
import { ImageLayout } from 'screens-content/home/enums/enums'
import InfoPanel from './info-panel/info-panel'
import styles from './product-detail.module.scss'
import { useLiveQuery } from 'dexie-react-hooks'
import { ORDER_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { configurationsTable, orderTable } from '../../../../../database.config'
import { ProductsType } from 'common/api/use-products'

type ProductID = {
  id: string
}

const ProductDetail = ({ id }: ProductID) => {
  const { data: product, isLoading } = useProduct(id)
  const { image, title, price, count, description } = product ?? {}
  const [quantity, setQuantity] = useState(1)
  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])

  const counterContent = (
    <div className={styles.counterContainer}>
      <div className={styles.counter}>
        <div className={styles.minus}>-</div>
        <div>{quantity}</div>
        <div className={styles.plus}>+</div>
      </div>
    </div>
  )

  const addToBasket = () => {
    let totalPrice: number = 0
    order?.shoppingCart?.products?.forEach((product: ProductsType) => {
      totalPrice += product.price
    })
    totalPrice += Number(price)

    const finalPrice = Number(order?.totalPrice) + totalPrice

    const payload = {
      shoppingCart: {
        images: order?.shoppingCart.images ?? [],
        products: [
          ...(order?.shoppingCart?.products ?? []),
          {
            id: id,
            url: image,
            qty: 1,
            title: title,
            price: price,
          },
        ],
      },
      totalPrice: finalPrice,
    }
    order?.shoppingCart
      ? orderTable.update(ORDER_TABLE_KEY, payload)
      : orderTable.add(payload, ORDER_TABLE_KEY)

    configurationsTable.clear()
  }

  console.log('🥶', order)

  return (
    <Container className={styles.productDetailContainer}>
      <div className={styles.detailLayout}>
        {!isLoading ? (
          <Image
            src={image ?? ''}
            layout={ImageLayout.INTRINSIC}
            width={600}
            height={400}
            alt='image'
            className={styles.image}
            loading='lazy'
          />
        ) : (
          <Skeleton animation='wave' width='100%' height={'400px'} />
        )}
        <div className={styles.productInfo}>
          <span className={styles.title}>{title}</span>
          <div className={styles.description}>{description}</div>
          <div className={styles.price}>
            {price?.toFixed(2)} € <span className={styles.withTax}>s DPH</span>
          </div>
          {counterContent}
          <div className={styles.count}>Na sklade {count} ks</div>
          <Button
            variant='outlined'
            fullWidth
            className={styles.button}
            onClick={addToBasket}
          >
            Pridať do košíka
          </Button>
        </div>
        <div>
          <InfoPanel />
        </div>
      </div>
    </Container>
  )
}

export default ProductDetail
