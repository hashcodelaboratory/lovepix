import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CustomForPartners from '../src/screens-content/for-partners/for-partners'
import FooterLayout from "../src/screens-content/footer/footer";
import MetaTags from 'meta-tags/meta'
import { messages } from 'messages/messages';

const ForPartners: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>For Partners</title>
      </Head>

      <MetaTags desc={messages.metaDescriptionForPartners} img={messages.metaDefaultImageForPartners}/>
      
      <header>
        <ResponsiveAppBar />
      </header>

      <main className={styles.main}>
        <CustomForPartners />
      </main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default ForPartners

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
