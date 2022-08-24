import styles from '../../dashboard.module.scss'
import SidebarHeader from "./header";
import SidebarFooter from "./footer";
import SidebarContent from "./content";

const Sidebar = () => (
    <div className={styles.sidebarContainer}>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
    </div>
)

export default Sidebar