import { ProductsType, useProducts } from 'common/api/use-products'
import React from 'react'
import Product from '../product/product'
import styles from './product-list.module.scss'

const ProductList = () => {
  const { data: products } = useProducts()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  return <div className={styles.productsContainer}>{productList}</div>
}

export default ProductList
