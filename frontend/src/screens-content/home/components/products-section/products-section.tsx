import { Container } from '@mui/material'
import { ProductsType, useFrontPageProducts } from 'common/api/use-products'
import React from 'react'
import Product from 'screens-content/e-shop/components/product/product'
import { Pages } from 'constants/pages/urls'
import GalleryRow from '../gallery-section/components/gallery-row/gallery-row'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import Shimmer from '../../../../common/components/shimmer/shimmer'

const ProductsSection = () => {
  const { data: products, isLoading } = useFrontPageProducts()
  const { t } = useTranslation()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <GalleryRow title={t(localizationKey.products)} route={t(Pages.ESHOP)}>
        <Shimmer isLoading={isLoading}>{productList}</Shimmer>
      </GalleryRow>
    </Container>
  )
}

export default ProductsSection
