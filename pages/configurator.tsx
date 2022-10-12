import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from "../src/app-bar/responsive-app-bar";
import ImageConfiguratorLayout from "../src/screens-content/image-configurator/image-configurator-layout";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Configurator: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Configurator</title>
        <meta name="Configurator" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
          <ImageConfiguratorLayout />
      </main>

      <footer className={styles.footer}>
        Powered by Hashlab s.r.o
      </footer>
    </div>
  )
}

export default Configurator

export const getStaticProps: GetStaticProps = async  ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'sk', ["common"])),
        },
    };
}
