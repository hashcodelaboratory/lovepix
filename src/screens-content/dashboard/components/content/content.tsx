import Card from "./components/card/card";
import styles from "../../dashboard.module.scss";
import { messages } from "../../../../messages/messages";
import UploadImagesTable from "./components/gallery/upload-images-table";
import { useContext } from "react";
import DashboardContext from "../../context/dashboard-context";
import OrdersTable from "./components/orders/orders-table";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import InventoryIcon from "@mui/icons-material/Inventory";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import Dimensions from "./components/dimensions/dimensions";

type Props = {
  isFetching: boolean
}

const Content = ({ isFetching }: Props) => {
  const {
    state: { uploadImages, orders, dimensions },
  } = useContext(DashboardContext);

  return (
    <div className={styles.contentContainer}>
      <div className={styles.cardRow}>
        <Card
          header={{
            title: messages.orders,
            count: isFetching ? "-" : orders?.length.toString(),
            icon: <LibraryBooksIcon />,
          }}
          footer={{
            value: "+ 55 %",
            text: messages.thanLastWeek,
          }}
        />
        <Card
          header={{
            title: messages.dimensions,
            count: isFetching ? "-" : String(dimensions?.length),
            icon: <InventoryIcon />,
          }}
          footer={{
            value: "+ 15 %",
            text: messages.thanLastWeek,
          }}
        />
        <Card
          header={{
            title: messages.uploadedImages,
            count: isFetching ? "-" : uploadImages?.length.toString(),
            icon: <FolderCopyIcon />,
          }}
          footer={{
            value: "+ 15 %",
            text: messages.thanLastWeek,
          }}
        />
      </div>
      <OrdersTable />
      <UploadImagesTable />
      <Dimensions />
    </div>
  );
};

export default Content;
