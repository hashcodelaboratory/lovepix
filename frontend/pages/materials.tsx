import type {NextPage} from 'next'
import {GetStaticProps} from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import {Container} from '@mui/material'
import CustomMaterials from '../src/screens-content/materials/materials'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import FooterLayout from "../src/screens-content/footer/footer";

const Materials: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
        <Container>
          <CustomMaterials/>
        </Container>
      </main>

      <footer>
        <FooterLayout/>
      </footer>
    </div>
  )
}

export default Materials

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
