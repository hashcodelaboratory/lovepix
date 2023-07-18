import { ProductsType, useProducts } from 'common/api/use-products'
import React, { useEffect, useState } from 'react'
import ProductSkeleton from '../product-skeleton/product-skeleton'
import Product from '../product/product'
import styles from './product-list.module.scss'
import { useCategoriesEshop } from 'common/api/use-categories-eshop'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { messages } from 'messages/messages'

const ProductList = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { data: products, isLoading, refetch } = useProducts(selectedCategory)
  const { data: categories } = useCategoriesEshop()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  const handleChange = (category: string) => () => {
    category === selectedCategory
      ? setSelectedCategory(null)
      : setSelectedCategory(category)
  }

  const categoriesList = categories?.map((item, index) => (
    <div
      key={index}
      onClick={handleChange(item.name)}
      className={
        selectedCategory === item.name
          ? styles.categoryActive
          : styles.categoryItem
      }
    >
      {item.name}
    </div>
  ))

  const showAllProducts = () => {
    setSelectedCategory(null)
  }

  const categoryTitle =
    selectedCategory === null ? t(messages.allProducts) : selectedCategory

  const categoryStyle =
    selectedCategory === null ? styles.categoryActive : styles.categoryItem

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
