import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import AccountDetail from '../src/screens-content/account-detail/account-detail'
import FooterLayout from "../src/screens-content/footer/footer";
import MetaTags from 'meta-tags/meta'
import { messages } from 'messages/messages';

const Account: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Account</title>
      </Head>

      <MetaTags desc={messages.metaDescriptionAccount}/>

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
