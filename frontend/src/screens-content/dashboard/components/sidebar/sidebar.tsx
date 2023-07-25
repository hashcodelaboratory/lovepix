import styles from '../../dashboard.module.scss'
import SidebarHeader from './components/header'
import SidebarFooter from './components/footer'
import SidebarContent from './components/content'

const Sidebar = () => (
  <div className={styles.sidebarContainer}>
    <SidebarHeader />
    <SidebarContent />
    <SidebarFooter />
  </div>
)

export default Sidebar
