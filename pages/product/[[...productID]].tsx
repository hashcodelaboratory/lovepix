import ResponsiveAppBar from 'app-bar/responsive-app-bar'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React from 'react'
import ProductDetail from 'screens-content/e-shop/components/product-detail/product-detail'
import FooterLayout from 'screens-content/footer/footer'

import styles from '../../styles/Home.module.css'

const ProductID: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Product detail</title>
        <meta name='Eshop' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <ResponsiveAppBar />
      </header>
      <main className={styles.main}>
        <ProductDetail />
      </main>
      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

// export const getStaticPaths: GetStaticPaths<{
//   travelIds: string
// }> = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: 'blocking', //indicates the type of fallback
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
//     },
//   }
// }

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}

export default ProductID
