import ResponsiveAppBar from 'app-bar/responsive-app-bar'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import ProductDetailLayout from 'screens-content/e-shop/components/product-detail/product-detail'
import FooterLayout from 'screens-content/footer/footer'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useProduct } from 'common/api/use-product'

const ProductDetail: NextPage = () => {
  const router = useRouter()
  const id = router.query.productID as string
  const { data } = useProduct(id)

  console.log(id)

  return (
    <div className={styles.container}>
      <Head>
        <title>{data?.title}</title>
        <meta name={id} content={id} />
      </Head>
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
  id: string
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
