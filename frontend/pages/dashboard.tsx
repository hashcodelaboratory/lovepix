import type {NextPage} from 'next'
import {GetStaticProps} from 'next'
import styles from '../styles/Home.module.css'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import CustomDashboard from '../src/screens-content/dashboard/dashboard'

const Dashboard: NextPage = () => (
  <div className={styles.container}>
    <CustomDashboard/>
  </div>
)

export default Dashboard

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
