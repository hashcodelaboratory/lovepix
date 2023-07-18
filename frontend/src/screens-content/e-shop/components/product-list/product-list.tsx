import { ProductsType, useProducts } from 'common/api/use-products'
import React from 'react'
import Product from '../product/product'
import styles from './product-list.module.scss'
import { useCategoriesEshop } from 'common/api/use-categories-eshop'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { messages } from 'messages/messages'
import { useRouter } from 'next/router'
import { ESHOP } from 'constants/pages/urls'
import ProductSkeleton from '../product-skeleton/product-skeleton'

const ProductList = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { kategoria } = router.query
  const { data: products, isLoading } = useProducts(
    (kategoria as string) ?? null
  )
  const { data: categories } = useCategoriesEshop()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  const selectCategory = (category: string) => () =>
    router.push({
      pathname: '/e-shop',
      query: { kategoria: category },
    })

  const showAllProducts = () => router.push(ESHOP)

  const categoriesList = categories?.map((item, index) => (
    <div
      key={index}
      onClick={selectCategory(item.name)}
      className={
        kategoria === item.name ? styles.categoryActive : styles.categoryItem
      }
    >
      {item.name}
    </div>
  ))

  const categoryTitle = kategoria ?? t(messages.allProducts)

  const categoryStyle = !!kategoria
    ? styles.categoryItem
    : styles.categoryActive

  return (
    <div className={styles.eshopContainer}>
      <div className={styles.categoriesContainer}>
        <div onClick={showAllProducts} className={categoryStyle}>
          {t(messages.allProducts)}
        </div>
        <div>{categoriesList}</div>
      </div>
      <div className={styles.rightContainer}>
        <Typography variant='h5' className={styles.categoryTitle}>
          {categoryTitle}
        </Typography>
        <div className={styles.productsContainer}>
          {isLoading ? <ProductSkeleton /> : <>{productList}</>}
        </div>
      </div>
    </div>
  )
}

export default ProductList
