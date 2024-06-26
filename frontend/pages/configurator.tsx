import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import ImageConfiguratorLayout from '../src/screens-content/image-configurator/image-configurator-layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useLiveQuery } from 'dexie-react-hooks'
import { configurationsTable } from '../database.config'
import { CONFIGURATION_TABLE_KEY } from '../src/common/indexed-db/hooks/keys'
import FooterLayout from '../src/screens-content/footer/footer'

const Configurator: NextPage = () => {
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY) ?? null,
    []
  )

  return (
    <div className={styles.container}>
      <header>
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
