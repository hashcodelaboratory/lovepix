import { Container } from '@mui/material'
import { ProductsType, useProducts } from 'common/api/use-products'
import React from 'react'
import Product from 'screens-content/e-shop/components/product/product'
import { Pages } from 'constants/pages/urls'
import PreviewRow from '../preview-section/components/preview-row/preview-row'

const ProductsSection = () => {
  const { data: products } = useProducts()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow title={'Produkty'} route={Pages.ESHOP}>
        <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
          {productList}
        </div>
      </PreviewRow>
    </Container>
  )
}

export default ProductsSection
