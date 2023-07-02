import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import AccountDetail from '../src/screens-content/account-detail/account-detail'
import FooterLayout from "../src/screens-content/footer/footer";

const Account: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Account</title>
        <meta name='account' content='Generated by create next app' />
        <link rel='icon' href='/favicon/favicon.ico' />
      </Head>

      <header>
        <ResponsiveAppBar />
      </header>
      <AccountDetail />

      <main className={styles.main}></main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default Account
