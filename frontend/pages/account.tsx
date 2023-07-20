import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from '../src/app-bar/responsive-app-bar'
import AccountDetail from '../src/screens-content/account-detail/account-detail'
import FooterLayout from "../src/screens-content/footer/footer";

const Account: NextPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <ResponsiveAppBar/>
      </header>
      <AccountDetail/>

      <main className={styles.main}></main>

      <footer>
        <FooterLayout/>
      </footer>
    </div>
  )
}

export default Account
