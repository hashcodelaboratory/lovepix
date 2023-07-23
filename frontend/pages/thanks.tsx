import type {NextPage} from 'next'
import {GetStaticProps} from 'next'
import styles from '../styles/Home.module.css'
import Thank from '../src/screens-content/thanks/thanks'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

const Thanks: NextPage = () => {
  return (
    <div>
      <main className={styles.main}>
        <Thank/>
      </main>
    </div>
  )
}

export default Thanks

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
