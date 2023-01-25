import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CustomDashboard from '../src/screens-content/dashboard/dashboard'

const Dashboard: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Dashboard</title>
      <meta name='dashboard' content='Generated by create next app' />
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <CustomDashboard />
  </div>
)

export default Dashboard

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
