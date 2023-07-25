import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import DimensionsLayout from '../../src/screens-content/dashboard/components/content/components/dimensions/dimensions'

const Dimensions = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <DimensionsLayout />
    </div>
  )
}

export default Dimensions

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
