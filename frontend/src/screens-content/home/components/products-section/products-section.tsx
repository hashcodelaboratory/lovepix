import { Container } from '@mui/material'
import { ProductsType, useProducts } from 'common/api/use-products'
import React from 'react'
import Product from 'screens-content/e-shop/components/product/product'
import styles from '../../home.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useRouter } from 'next/router'
import { Pages } from 'constants/pages/urls'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'

const ProductsSection = () => {
  const { t } = useTranslation()
  const { data: products } = useProducts()
  const router = useRouter()

  const productList = products?.map((products: ProductsType) => (
    <Product key={products.id} product={{ ...products }} />
  ))

  const redirect = async () => {
    await router.push(Pages.ESHOP)
  }

  return (
    <Container>
      <div className={styles.previewTitleRow}>
        <h3>PRODUKTY</h3>
        <button className={styles.previewTitleRowButton}>
          <p onClick={redirect} className={styles.previewTitleRowButtonText}>
            {t(localizationKey.showMore)}
          </p>
          <ArrowForwardIcon sx={{ width: 16 }} />
        </button>
      </div>
      <hr />
      <div style={{ display: 'flex', overflow: 'auto', marginTop: 20 }}>
        {productList}
      </div>
    </Container>
  )
}

export default ProductsSection
