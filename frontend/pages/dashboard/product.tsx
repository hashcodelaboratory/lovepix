import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import ManageProducts from 'screens-content/dashboard/components/manage-products/manage-products'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './product-dashboard.module.scss'

const Product = () => {
  return (
    <div className={styles.productDashboardContainer}>
      <Sidebar />
      <ManageProducts />
    </div>
  )
}

export default Product

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
