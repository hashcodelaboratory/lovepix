import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import CategoriesEshop from '../../src/screens-content/dashboard/components/content/components/categories-e-shop/categories-eshop'

const Products = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <CategoriesEshop />
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
