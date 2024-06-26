import { Button, Container, Grid, Skeleton } from '@mui/material'
import { ProductType, useProduct } from 'common/api/use-product'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { ImageLayout } from 'screens-content/home/enums/enums'
import InfoPanel from './info-panel/info-panel'
import styles from './product-detail.module.scss'
import { useLiveQuery } from 'dexie-react-hooks'
import { ORDER_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { orderTable } from '../../../../../database.config'
import Product from '../product/product'
import { localizationKey } from '../../../../localization/localization-key'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { shoppingCartPrice } from './utils'
import { useSnackbar } from 'notistack'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from 'snackbar/config'
import { ProductsType, useProducts } from 'common/api/use-products'
import { loggingService } from '../../../../analytics/logging-service'
import { LovepixEvent } from '../../../../analytics/lovepix-event'

type ProductProps = {
  product: ProductType | undefined
  isLoading: boolean
}

const ProductDetailLayout = ({ product, isLoading }: ProductProps) => {
  const router = useRouter()
  const id = router.query.productID as string
  const { t } = useTranslation()
  const { refetch } = useProduct(id)
  const { image, title, price, count, description } = product ?? {}
  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])
  const { data: products } = useProducts()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const productList = products?.map((product: ProductsType) => (
    <div key={product.id}>
      <Product product={{ ...product }} />
    </div>
  ))

  const payloadAddToCart = () => {
    const { products } = order?.shoppingCart || []

    const foundIndex: number = products?.findIndex(
      (item: any) => item.id === id
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
        totalPrice: shoppingCartPrice(order, price ?? 0),
      }
      return payload
    }
  }

  const addToCart = () => {
    const { products } = order?.shoppingCart || []
    const product = products?.find((item: any) => item.id === id)

    loggingService.logEvent(LovepixEvent.ADD_TO_CART_ESHOP_PRODUCT, {
      extra: { product },
    })

    if (product?.qty === count) {
      enqueueSnackbar(
        String(t(localizationKey.noMoreProdutsInStock)),
        SNACKBAR_OPTIONS_ERROR
      )
      return
    }

    order?.shoppingCart
      ? orderTable.update(ORDER_TABLE_KEY, payloadAddToCart())
      : orderTable.add(payloadAddToCart(), ORDER_TABLE_KEY)
    enqueueSnackbar(
      String(t(localizationKey.productAddedToCart)),
      SNACKBAR_OPTIONS_SUCCESS
    )
  }

  return (
    <Container className={styles.productDetailContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} style={{ textAlign: 'center' }}>
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
            <Skeleton animation='wave' width='100%' height='100%' />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.productInfo}>
            <div className={styles.category}>Obrazy</div>
            <span className={styles.title}>{title}</span>
            <div className={styles.price}>
              {price?.toFixed(2)} €{' '}
              <span className={styles.withTax}>s DPH</span>
            </div>
            <Button
              variant='outlined'
              className={styles.button}
              onClick={addToCart}
            >
              {t(localizationKey.addToCart)}
            </Button>
            <hr />
            <InfoPanel quantity={count} />
          </div>
        </Grid>
      </Grid>
      <div className={styles.title}>{t(localizationKey.description)}</div>
      <hr />
      <div className={styles.description}>{description}</div>
      <div className={styles.title}>{t(localizationKey.similarProducts)}</div>
      <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
        {productList}
      </div>
    </Container>
  )
}

export default ProductDetailLayout
