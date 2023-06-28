import { ProductsType, useProducts } from 'common/api/use-products'
import React from 'react'
import ProductSkeleton from '../product-skeleton/product-skeleton'
import Product from '../product/product'
import styles from './product-list.module.scss'

const ProductList = () => {
  const { data: products, isLoading } = useProducts()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  return (
    <div className={styles.eshopContainer}>
      <div className={styles.categoriesContainer}>Kategorie</div>
      <div className={styles.rightContainer}>
        <div className={styles.productsContainer}>
          {isLoading ? <ProductSkeleton /> : <>{productList}</>}
        </div>
      </div>
    </div>
  )
}

export default ProductList
