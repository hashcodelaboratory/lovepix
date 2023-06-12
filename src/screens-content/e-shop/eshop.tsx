import { Container } from '@mui/material'
import React from 'react'
import ProductList from './components/product-list/product-list'
import Product from './components/product/product'
import styles from './eshop.module.scss'

const EshopLayout = () => {
  return (
    <Container className={styles.eshopLayout}>
      <ProductList />
    </Container>
  )
}

export default EshopLayout
