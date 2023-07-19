import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import FooterLayout from "../src/screens-content/footer/footer";
import MetaTags from 'meta-tags/meta';
import { messages } from 'messages/messages';

const Profile: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
      </Head>

      <MetaTags desc={messages.metaDescriptionProfile} img={messages.metaDefaultImageProfile}/>

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
