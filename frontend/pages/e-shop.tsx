import type {NextPage} from 'next'
import {GetStaticProps} from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import FooterLayout from '../src/screens-content/footer/footer'
import EshopLayout from 'screens-content/e-shop/eshop'

const Eshop: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
        <EshopLayout/>
      </main>

      <footer>
        <FooterLayout/>
      </footer>
    </div>
  )
}

export default Eshop

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
