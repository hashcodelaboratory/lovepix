import ResponsiveAppBar from 'app-bar/responsive-app-bar'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import FooterLayout from 'screens-content/footer/footer'
import styles from '../styles/Home.module.css'
import ProductDetailLayout from 'screens-content/e-shop/components/product-detail/product-detail'

const ProductDetail: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar />
      </header>
      <main className={styles.main}>
        <ProductDetailLayout />
      </main>
      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<{
  travelIds: string
}> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}

export default ProductDetail
