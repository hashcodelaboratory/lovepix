import { ProductsType, useProducts } from 'common/api/use-products'
import React, { useEffect, useState } from 'react'
import ProductSkeleton from '../product-skeleton/product-skeleton'
import Product from '../product/product'
import styles from './product-list.module.scss'
import { useCategoriesEshop } from 'common/api/use-categories-eshop'

const ProductList = () => {
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

  return (
    <div className={styles.eshopContainer}>
      <div className={styles.categoriesContainer}>
        <div>{categoriesList}</div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.productsContainer}>
          {isLoading ? <ProductSkeleton /> : <>{productList}</>}
        </div>
      </div>
    </div>
  )
}

export default ProductList
