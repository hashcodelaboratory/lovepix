import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import { Container } from '@mui/material'
import CustomMaterials from '../src/screens-content/materials/materials'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FooterLayout from "../src/screens-content/footer/footer";
import MetaTags from 'meta-tags/meta'
import { messages } from 'messages/messages';

const Materials: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Materials</title>
      </Head>

      <MetaTags desc={messages.metaDescriptionMaterials}/>

      <header>
        <ResponsiveAppBar />
      </header>

      <main className={styles.main}>
        <Container>
          <CustomMaterials />
        </Container>
      </main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default Materials

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
