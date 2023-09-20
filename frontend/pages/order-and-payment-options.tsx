import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FooterLayout from '../src/screens-content/footer/footer'
import { Container } from '@mui/system'
import { EditableContent } from '../src/editable-content/editable-content'
import { EditablePage } from '../src/editable-pages/editable-page'

const OrderAndPaymentOptions: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar />
      </header>
      <main className={styles.main}>
        <Container className={styles.container}>
          <EditableContent identifier={EditablePage.OrderAndPaymentOptions} />
        </Container>
      </main>
      <footer>
        <FooterLayout />
      </footer>
    </div>
  )
}

export default OrderAndPaymentOptions

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
