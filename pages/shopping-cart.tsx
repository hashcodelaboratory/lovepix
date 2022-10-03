import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from "../src/app-bar/responsive-app-bar";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import CustomShoppingCart from "../src/screens-content/shopping-cart/shopping-cart";

const ShoppingCart: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping cart</title>
        <meta name="Shopping cart" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
          <CustomShoppingCart />
      </main>

      <footer className={styles.footer}>
        Powered by Hashlab s.r.o
      </footer>
    </div>
  )
}

export default ShoppingCart

export const getStaticProps: GetStaticProps = async  ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'sk', ["common"])),
        },
    };
}
