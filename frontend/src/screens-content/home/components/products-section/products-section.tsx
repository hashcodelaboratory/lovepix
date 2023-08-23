import { Container } from '@mui/material'
import { ProductsType, useProducts } from 'common/api/use-products'
import React from 'react'
import Product from 'screens-content/e-shop/components/product/product'
import { Pages } from 'constants/pages/urls'
import PreviewRow from '../preview-section/components/preview-row/preview-row'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import { Configuration } from 'common/types/configuration'

const ProductsSection = ({
  configuration,
}: {
  configuration: Configuration
}) => {
  const { data: products } = useProducts()
  const { t } = useTranslation()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  return (
    <Container style={{ marginBottom: 30 }}>
      <PreviewRow
        title={t(localizationKey.products)}
        route={t(Pages.ESHOP)}
        configuration={configuration}
      >
        <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
          {productList}
        </div>
      </PreviewRow>
    </Container>
  )
}

export default ProductsSection
