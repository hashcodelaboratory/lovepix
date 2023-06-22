import { Button, Container, Grid, Skeleton } from '@mui/material'
import { useProduct } from 'common/api/use-product'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ImageLayout } from 'screens-content/home/enums/enums'
import InfoPanel from './info-panel/info-panel'
import styles from './product-detail.module.scss'
import { useLiveQuery } from 'dexie-react-hooks'
import { ORDER_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { orderTable } from '../../../../../database.config'
import { ProductsType, useProducts } from 'common/api/use-products'
import Product from '../product/product'
import { messages } from 'messages/messages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { database } from 'common/firebase/config'
import { Collections } from 'common/firebase/enums'
import { shoppingCartPrice } from './utils'
import { useSnackbar } from 'notistack'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from 'snackbar/config'

const ProductDetail = () => {
  const router = useRouter()
  const id = router.query.productID as string[]
  const { t } = useTranslation()
  const { data: product, isLoading } = useProduct(id[0])
  const [productData, setNewProductData] = useState(product)
  const { image, title, price, count, description } = productData ?? {}
  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])
  const { data: products } = useProducts()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const getContent = async () => {
      const querySnapshot = await getDoc(
        doc(database, Collections.PRODUCTS, id[0])
      )
      const res = querySnapshot.data()
      if (res) {
        setNewProductData(res as ProductsType)
      }
    }
    getContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const productList = products?.map((product: ProductsType) => (
    <div key={product.id}>
      <Product product={{ ...product }} />
    </div>
  ))

  const payloadAddtoCart = () => {
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
      String(t(messages.productAddedToCart)),
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
              {t(messages.addToCart)}
            </Button>
            <hr />
            <InfoPanel quantity={count} />
          </div>
        </Grid>
      </Grid>
      <div className={styles.title}>{t(messages.description)}</div>
      <hr />
      <div className={styles.description}>{description}</div>
      <div className={styles.title}>{t(messages.simmilarProducts)}</div>
      <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
        {productList}
      </div>
    </Container>
  )
}

export default ProductDetail
