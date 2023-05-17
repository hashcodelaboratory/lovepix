import styles from "./dashboard.module.scss";
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";
import DashboardContext from "./context/dashboard-context";
import { useOrders } from "./api/orders/useOrders";
import { useUploadedImages } from "./api/gallery/useUploadedImages";

const CustomDashboard = () => {
  const { data: uploadImages = [], isFetching: isFetchingGallery } = useUploadedImages();
  const { data: orders = [], isFetching: isFetchingOrders } = useOrders();

  return (
    <DashboardContext.Provider
      value={{
        state: {
          uploadImages,
          orders,
        },
      }}
    >
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <Content isFetching={isFetchingGallery || isFetchingOrders} />
      </div>
    </DashboardContext.Provider>
  );
};

export default CustomDashboard;
