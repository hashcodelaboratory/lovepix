import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CustomDashboard from '../src/screens-content/dashboard/dashboard'
import AdminAccess from 'protect-route'

const Dashboard: NextPage = () => {
  return (
    <AdminAccess>
      <div className={styles.container}>
        <CustomDashboard />
      </div>
    </AdminAccess>
  )
}

export default Dashboard

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
