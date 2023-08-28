import { Container } from '@mui/material'
import { ProductsType, useProducts } from 'common/api/use-products'
import React from 'react'
import Product from 'screens-content/e-shop/components/product/product'
import { Pages } from 'constants/pages/urls'
import PreviewRow from '../preview-section/components/preview-row/preview-row'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import Shimmer from '../../../../common/components/shimmer/shimmer'

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts()
  const { t } = useTranslation()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow title={t(localizationKey.products)} route={t(Pages.ESHOP)}>
        <Shimmer isLoading={isLoading}>{productList}</Shimmer>
      </PreviewRow>
    </Container>
  )
}

export default ProductsSection
