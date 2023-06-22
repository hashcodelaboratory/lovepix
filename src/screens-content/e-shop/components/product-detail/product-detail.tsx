import { Button, Container, Grid, Skeleton } from '@mui/material'
import { useProduct } from 'common/api/use-product'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ImageLayout } from 'screens-content/home/enums/enums'
import InfoPanel from './info-panel/info-panel'
import styles from './product-detail.module.scss'
import { useLiveQuery } from 'dexie-react-hooks'
import { ORDER_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { configurationsTable, orderTable } from '../../../../../database.config'
import { ProductsType, useProducts } from 'common/api/use-products'
import Product from '../product/product'
import { messages } from 'messages/messages'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { database } from 'common/firebase/config'
import { Collections } from 'common/firebase/enums'

const ProductDetail = () => {
  const router = useRouter()
  const id = router.query.productID as string[]
  const { t } = useTranslation()
  const { data: product, isLoading } = useProduct(id[0])
  const [productData, setNewProductData] = useState(product)
  const { image, title, price, count, description } = productData ?? {}
  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])
  const { data: products } = useProducts()

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

  const productList = products?.map((products: ProductsType) => (
    <div key={products.id}>
      <Product product={{ ...products }} />
    </div>
  ))

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
              onClick={addToBasket}
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
