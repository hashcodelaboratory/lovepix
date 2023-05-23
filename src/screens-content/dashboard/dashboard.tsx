import styles from "./dashboard.module.scss";
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";
import DashboardContext from "./context/dashboard-context";
import { useOrders } from "./api/orders/useOrders";
import { useUploadedImages } from "./api/gallery/useUploadedImages";
import { useGallery } from "../../common/api/use-gallery";
import { useDimensions } from "../../common/api/use-dimensions";

const CustomDashboard = () => {
  const { data: uploadImages = [], isFetching: isFetchingUpload } = useUploadedImages();
  const { data: orders = [], isFetching: isFetchingOrders } = useOrders();
  const { data: galleryImages = [], isFetching: isFetchingGallery } = useGallery();
  const { data: dimensions = [], isFetching: isFetchingDimensions } = useDimensions();

  return (
    <DashboardContext.Provider
      value={{
        state: {
          uploadImages,
          orders,
          galleryImages,
          dimensions,
        },
      }}
    >
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <Content
          isFetching={
            isFetchingUpload ||
            isFetchingOrders ||
            isFetchingGallery ||
            isFetchingDimensions
          }
        />
      </div>
    </DashboardContext.Provider>
  );
};

export default CustomDashboard;
