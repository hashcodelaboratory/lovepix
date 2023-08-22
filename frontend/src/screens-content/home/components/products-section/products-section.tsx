import { Container } from '@mui/material'
import { ProductsType, useProducts } from 'common/api/use-products'
import React from 'react'
import Product from 'screens-content/e-shop/components/product/product'
import { Pages } from 'constants/pages/urls'
import PreviewRow from '../preview-section/components/preview-row/preview-row'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import ItemSkeleton from 'screens-content/home/item-skeleton/item-skeleton'

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts()
  const { t } = useTranslation()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  const shimmers = [...Array(4)].map((index: number) => (
    <ItemSkeleton key={index} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow title={t(localizationKey.products)} route={t(Pages.ESHOP)}>
        <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
          {isLoading ? shimmers : productList}
        </div>
      </PreviewRow>
    </Container>
  )
}

export default ProductsSection
