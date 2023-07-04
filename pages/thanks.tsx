import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Thank from '../src/screens-content/thanks/thanks'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Thanks: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Thanks</title>
        <meta name='Thanks' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Thank />
      </main>

    </div>
  )
}

export default Thanks

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}