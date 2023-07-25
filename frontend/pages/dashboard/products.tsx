import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import ProductsLayout from '../../src/screens-content/dashboard/components/content/components/products/products'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'

const Products = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <ProductsLayout />
    </div>
  )
}

export default Products

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
