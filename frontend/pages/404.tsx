import { Container } from '@mui/material'
import React from 'react'
import styles from './../styles/404.module.scss'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useRouter } from 'next/router'
import { ProductsType, useProducts } from 'common/api/use-products'
import Product from 'screens-content/e-shop/components/product/product'
import { useTranslation } from 'next-i18next'
import { localizationKey } from 'localization/localization-key'

const Custom404 = () => {
  const { data: products } = useProducts()
  const router = useRouter()
  const { t } = useTranslation()

  const redirect = () => router.push('/')

  const productList = products?.map((product: ProductsType) => (
    <div key={product.id}>
      <Product product={{ ...product }} />
    </div>
  ))

  return (
    <Container>
      <div className={styles.container}>
        <h1>{t(localizationKey.the404PageTitle)}</h1>
        <p className={styles.text}>{t(localizationKey.the404NoResults)}</p>
        <p className={styles.text}>{t(localizationKey.the404PageTryAgain)}</p>
        <p onClick={redirect} className={styles.link}>
          {t(localizationKey.the404PageBackOnHome)}
          <ArrowRightAltIcon />
        </p>
        <p>{t(localizationKey.the404PageCheckOurProducts)}</p>
        <div className={styles.productList}>{productList}</div>
      </div>
    </Container>
  )
}

export default Custom404
