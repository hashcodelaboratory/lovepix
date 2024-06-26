import type {NextPage} from 'next'
import {GetStaticProps} from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import CustomShoppingCart from '../src/screens-content/shopping-cart/shopping-cart'
import {useLiveQuery} from 'dexie-react-hooks'
import {orderTable} from '../database.config'
import {ORDER_TABLE_KEY} from '../src/common/indexed-db/hooks/keys'
import FooterLayout from '../src/screens-content/footer/footer'

const ShoppingCart: NextPage = () => {
  const order = useLiveQuery(() => orderTable.get(ORDER_TABLE_KEY), [])

  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar/>
      </header>

      <main className={styles.main}>
        <CustomShoppingCart order={order}/>
      </main>

      <footer>
        <FooterLayout/>
      </footer>
    </div>
  )
}

export default ShoppingCart

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'sk', ['common'])),
    },
  }
}
