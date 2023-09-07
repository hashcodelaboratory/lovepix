import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import CategoriesEshopLayout from '../../src/screens-content/dashboard/components/content/components/categories-e-shop/categories-eshop'
import AdminAccess from 'common/protect-route'

const CategoriesEshop = () => {
  return (
    <AdminAccess>
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <CategoriesEshopLayout />
      </div>
    </AdminAccess>
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
