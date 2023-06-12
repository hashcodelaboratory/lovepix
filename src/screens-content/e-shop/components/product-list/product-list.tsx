import React from 'react'
import Product from '../product/product'
import styles from './product-list.module.scss'

const ProductList = () => {
  return (
    <div className={styles.productsContainer}>
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  )
}

export default ProductList
