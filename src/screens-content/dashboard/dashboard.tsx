import styles from './dashboard.module.scss';
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";
import DashboardContext from './context/dashboard-context';
import {useUploadedImages} from "./api/uploadedImages";
import {useOrders} from "./api/orders/useOrders";

const CustomDashboard = () => {
    const { data: uploadedImages = [], isFetching } = useUploadedImages();
    const { data: orders = [], isFetching: isFetchingOrders } = useOrders();
    console.log(uploadedImages)
    return (
        <DashboardContext.Provider value={{
            state: {
                uploadedImages,
                orders
            }
        }}>
            <div className={styles.dashboardContainer}>
                <Sidebar/>
                <Content isFetching={isFetching || isFetchingOrders} />
            </div>
        </DashboardContext.Provider>
    )
}

export default CustomDashboard