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
  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])

  const addToBasket = () => {
    let totalPrice: number = 0
    order?.shoppingCart?.products?.forEach((product: ProductsType) => {
      totalPrice += product.price
    })
    totalPrice += Number(price)

    const finalPrice = order?.totalPrice
      ? Number(order?.totalPrice) + price!
      : price

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
          <div className={styles.category}>Obrazy</div>
          <span className={styles.title}>{title}</span>
          <div className={styles.price}>
            {price?.toFixed(2)} € <span className={styles.withTax}>s DPH</span>
          </div>
          <Button
            variant='outlined'
            className={styles.button}
            onClick={addToBasket}
          >
            Pridať do košíka
          </Button>
          <hr />
          <InfoPanel quantity={count} />
        </div>
      </div>
      <div>Popis</div>
      <hr />
      <div className={styles.description}>{description}</div>
    </Container>
  )
}

export default ProductDetail
