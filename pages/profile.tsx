import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import FooterLayout from "../src/screens-content/footer/footer";

const Profile: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
        <meta name='profile' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        <ResponsiveAppBar />
      </header>

      <main className={styles.main}></main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default Profile
