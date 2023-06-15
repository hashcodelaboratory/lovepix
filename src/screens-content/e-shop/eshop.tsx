import { Container } from '@mui/material'
import React from 'react'
import ProductList from './components/product-list/product-list'
import styles from './eshop.module.scss'

const EshopLayout = () => {
  return (
    <Container className={styles.eshopLayout}>
      <ProductList />
    </Container>
  )
}

export default EshopLayout
