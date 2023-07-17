import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FooterLayout from '../src/screens-content/footer/footer'
import EshopLayout from 'screens-content/e-shop/eshop'
import MetaTags from 'meta-tags/meta'
import { messages } from 'messages/messages';

const Eshop: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>E-shop</title>
      </Head>

      <MetaTags desc={messages.metaDescriptionEShop}/>
      
      <header>
        <ResponsiveAppBar />
      </header>

      <main className={styles.main}>
        <EshopLayout />
      </main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default Eshop

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
