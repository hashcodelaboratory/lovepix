import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import MaterialsLayout from 'screens-content/dashboard/components/content/components/materials/materials'

const Materials = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <MaterialsLayout />
    </div>
  )
}

export default Materials

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
