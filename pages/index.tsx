import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from "../src/app-bar/responsive-app-bar";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
      </main>

      <footer className={styles.footer}>
        Powered by Hashlab s.r.o
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async  ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'sk', ["common"])),
        },
    };
}
