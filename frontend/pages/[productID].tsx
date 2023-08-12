import ResponsiveAppBar from 'app-bar/responsive-app-bar'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import FooterLayout from 'screens-content/footer/footer'
import styles from '../styles/Home.module.css'
import ProductDetailLayout from 'screens-content/e-shop/components/product-detail/product-detail'
import { useRouter } from 'next/router'
import { useProduct } from 'common/api/use-product'
import { Head } from 'metadata/head'

const ProductDetail: NextPage = () => {
  const router = useRouter()
  const id = router.query.productID as string
  const { data, isLoading } = useProduct(id)

  return (
    <div className={styles.container}>
      <Head title={data?.title ?? ''} description={data?.title ?? ''} />
      <header>
        <ResponsiveAppBar />
      </header>
      <main className={styles.main}>
        <ProductDetailLayout product={data} isLoading={isLoading} />
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
