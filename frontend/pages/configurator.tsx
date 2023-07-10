import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import ImageConfiguratorLayout from '../src/screens-content/image-configurator/image-configurator-layout'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useLiveQuery } from 'dexie-react-hooks'
import { configurationsTable } from '../database.config'
import { CONFIGURATION_TABLE_KEY } from '../src/common/indexed-db/hooks/keys'
import FooterLayout from '../src/screens-content/footer/footer'
import MetaTags from 'meta-tags/meta'

const Configurator: NextPage = () => {
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY) ?? null,
    []
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Configurator</title>
        <meta name='Configurator' content='Generated by create next app' />
        <link rel='icon' href='/favicon/favicon-16x16.png' />
      </Head>
      <header>
        {/* MetaTags has to be executed outside of head*/}
        <MetaTags/>
        <ResponsiveAppBar />
      </header>
      <main className={styles.main}>
        <ImageConfiguratorLayout configuration={configuration} />
      </main>
      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default Configurator

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
