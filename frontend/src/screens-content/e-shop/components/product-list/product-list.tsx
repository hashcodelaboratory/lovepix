import { ProductsType, useProducts } from 'common/api/use-products'
import React, { useContext } from 'react'
import ProductSkeleton from '../product-skeleton/product-skeleton'
import Product from '../product/product'
import styles from './product-list.module.scss'
import { useCategoriesEshop } from 'common/api/use-categories-eshop'

const ProductList = () => {
  const { data: products, isLoading } = useProducts()
  const { data: categories } = useCategoriesEshop()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  const categoriesList = categories?.map((item, index) => (
    <div key={index}>{item.name}</div>
  ))

  return (
    <div className={styles.eshopContainer}>
      <div className={styles.categoriesContainer}>
        <div>Kategorie </div>
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
