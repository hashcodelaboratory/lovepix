import { Button, Container, Skeleton } from '@mui/material'
import { useProduct } from 'common/api/use-product'
import Image from 'next/image'
import React from 'react'
import { ImageLayout } from 'screens-content/home/enums/enums'
import InfoPanel from './info-panel/info-panel'
import styles from './product-detail.module.scss'
import { useLiveQuery } from 'dexie-react-hooks'
import { ORDER_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { orderTable } from '../../../../../database.config'
import { shoppingCartPrice } from './utils'
import { useSnackbar } from 'notistack'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from 'snackbar/config'
import { messages } from 'messages/messages'
import { useTranslation } from 'next-i18next'
import { Product } from 'common/types/product'

type ProductID = {
  id: string
}

const ProductDetail = ({ id }: ProductID) => {
  const { t } = useTranslation()
  const { data: product, isLoading } = useProduct(id)
  const { image, title, price, count, description } = product ?? {}
  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])
  const { enqueueSnackbar } = useSnackbar()

  const payloadAddtoCart = () => {
    const { products } = order?.shoppingCart || []

    const foundIndex: number = products?.findIndex(
      (item: Product) => item.id === id
    )
    if (products && foundIndex !== -1) {
      const array = products
      array[foundIndex].qty++
      const payload = {
        shoppingCart: {
          images: order?.shoppingCart.images ?? [],
          products: [...array],
        },
        totalPrice: shoppingCartPrice(order, price!),
      }
      return payload
    } else {
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
        totalPrice: shoppingCartPrice(order, price!),
      }
      return payload
    }
  }

  const addToBasket = () => {
    const { products } = order?.shoppingCart || []
    const product = products?.find((item: any) => item.id === id)

    if (product?.qty === count) {
      enqueueSnackbar(
        String(t(messages.noMoreProdutsOnStock)),
        SNACKBAR_OPTIONS_ERROR
      )
      return
    }

    order?.shoppingCart
      ? orderTable.update(ORDER_TABLE_KEY, payloadAddtoCart())
      : orderTable.add(payloadAddtoCart(), ORDER_TABLE_KEY)
    enqueueSnackbar(
      String(t(messages.productAddedToBsket)),
      SNACKBAR_OPTIONS_SUCCESS
    )
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
          <span className={styles.title}>{title}</span>
          <div className={styles.description}>{description}</div>
          <div className={styles.price}>
            {price?.toFixed(2)} €
            <span className={styles.withTax}>
              {String(t(messages.withTax))}
            </span>
          </div>
          <div className={styles.count}>
            {String(t(messages.onStock))} {count} ks
          </div>
          <Button
            variant='outlined'
            fullWidth
            className={styles.button}
            onClick={addToBasket}
          >
            {String(t(messages.addToBasket))}
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
