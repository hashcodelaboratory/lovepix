import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import FooterLayout from '../src/screens-content/footer/footer'
import ReviewsPage from 'screens-content/reviews/reviews'

const Reviews: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
        <meta name='profile' content='Generated by create next app' />
      </Head>

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
