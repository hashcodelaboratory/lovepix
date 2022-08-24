import styles from './dashboard.module.scss'
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";

const CustomDashboard = () => (
    <div className={styles.dashboardContainer}>
        <Sidebar />
        <Content />
    </div>
)

export default CustomDashboard