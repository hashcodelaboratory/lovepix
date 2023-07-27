import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import CategoriesLayout from '../../src/screens-content/dashboard/components/content/components/categories/categories'

const Categories = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <CategoriesLayout />
    </div>
  )
}

export default Categories

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
