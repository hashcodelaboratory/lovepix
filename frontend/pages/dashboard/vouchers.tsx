import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import VouchersLayout from '../../src/screens-content/dashboard/components/content/components/voucher/voucher'

const Vouchers = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <VouchersLayout />
    </div>
  )
}

export default Vouchers

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
