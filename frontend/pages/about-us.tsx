import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import CustomAboutUs from '../src/screens-content/about-us/about-us'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FooterLayout from "../src/screens-content/footer/footer";
import MetaTags from 'meta-tags/meta'
import { messages } from 'messages/messages';

const AboutUs: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About us</title>
      </Head>

      <MetaTags desc={messages.metaDescriptionAboutUs}/>

      <header>
        <ResponsiveAppBar />
      </header>

      <main className={styles.main}>
        <CustomAboutUs />
      </main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default AboutUs

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
