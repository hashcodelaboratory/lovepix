import styles from './dashboard.module.scss';
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";
import DashboardContext from './context/dashboard-context';
import {useUploadedImages} from "./api/uploadedImages";

const CustomDashboard = () => {
    const { data: uploadedImages = [], isFetching } = useUploadedImages();

    return (
        <DashboardContext.Provider value={{
            state: {
                uploadedImages
            }
        }}>
            <div className={styles.dashboardContainer}>
                <Sidebar/>
                <Content isFetching={isFetching} />
            </div>
        </DashboardContext.Provider>
    )
}

export default CustomDashboard