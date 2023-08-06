import type { GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import FooterLayout from '../src/screens-content/footer/footer'
import ReviewsPage from 'screens-content/reviews/reviews'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Reviews: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar />
      </header>

      <main className={styles.main}>
        <ReviewsPage />
      </main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default Reviews

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
