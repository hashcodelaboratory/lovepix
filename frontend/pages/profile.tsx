import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import FooterLayout from '../src/screens-content/footer/footer'
import ProfileLayout from '../src/screens-content/profile/profile'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Profile: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar />
      </header>

      <main className={styles.main}>
        <ProfileLayout />
      </main>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default Profile

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
