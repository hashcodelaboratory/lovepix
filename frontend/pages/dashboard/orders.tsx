import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Sidebar from 'screens-content/dashboard/components/sidebar/sidebar'
import styles from './dashboard.module.scss'
import OrdersTable from '../../src/screens-content/dashboard/components/content/components/orders/orders-table'
import AdminAccess from 'common/protect-route'

const Orders = () => {
  return (
    <AdminAccess>
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <OrdersTable />
      </div>
    </AdminAccess>
  )
}

export default Orders

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
