import {
  ProductsType,
  useProductsByCategory,
} from 'common/api/use-products-by-category'
import React from 'react'
import Product from '../product/product'
import styles from './product-list.module.scss'
import { Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import ProductSkeleton from '../product-skeleton/product-skeleton'
import TemporaryDrawer from './drawer'
import CategoriesSidebar from './categories-sidebar'
import { localizationKey } from 'localization/localization-key'

const ProductList = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { kategoria: category } = router.query
  const { data: products, isLoading } = useProductsByCategory(
    (category as string) ?? null
  )
  const tablet = useMediaQuery('(max-width:1000px)')
  const mobile = useMediaQuery('(max-width:580px)')

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  const categoryTitle = category ?? t(localizationKey.allProducts)

  const shimmers = [...Array(5)].map((index: number) => (
    <ProductSkeleton key={index} />
  ))

  return (
    <div className={styles.eshopContainer}>
      {tablet && <TemporaryDrawer />}
      {!tablet && <CategoriesSidebar />}
      <div className={mobile ? styles.pContainerMobile : styles.pContainer}>
        <Typography variant='h5' className={styles.categoryTitle}>
          {categoryTitle}
        </Typography>
        <div
          className={
            mobile ? styles.productsContainerMobile : styles.productsContainer
          }
        >
          {isLoading ? shimmers : productList}
        </div>
      </div>
    </div>
  )
}

export default ProductList
