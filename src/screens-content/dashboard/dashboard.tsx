import styles from './dashboard.module.scss'
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content";

const CustomDashboard = () => {
    return(
        <div className={styles.dashboardContainer}>
            <Sidebar />
            <Content />
        </div>
    )
}

export default CustomDashboard