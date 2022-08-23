import styles from '../../dashboard.module.scss'
import SidebarHeader from "./header";
import SidebarFooter from "./footer";

const Sidebar = () => {
    return(
        <div className={styles.sidebarContainer}>
            <SidebarHeader />
            <SidebarFooter />
        </div>
    )
}

export default Sidebar