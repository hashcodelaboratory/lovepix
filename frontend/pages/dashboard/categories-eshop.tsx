import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import CategoriesEshopLayout from '../../src/screens-content/dashboard/components/content/components/categories-e-shop/categories-eshop'

const CategoriesEshop = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <CategoriesEshopLayout />
    </div>
  )
}

export default CategoriesEshop

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
