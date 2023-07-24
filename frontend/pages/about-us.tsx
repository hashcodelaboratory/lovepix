import type {NextPage} from 'next'
import {GetStaticProps} from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import CustomAboutUs from '../src/screens-content/about-us/about-us'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import FooterLayout from "../src/screens-content/footer/footer";

const AboutUs: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
        <CustomAboutUs/>
      </main>

      <footer>
        <FooterLayout/>
      </footer>
    </div>
  )
}

export default AboutUs

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
