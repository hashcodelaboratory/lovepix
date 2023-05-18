import { createContext } from "react";
import { StorageReference } from "@firebase/storage";
import { Order } from "../../../common/types/order";
import { GalleryItem } from "../../../common/types/gallery";

type DashboardContextProps = {
  state: {
    uploadImages: StorageReference[]
    orders: Order[]
    galleryImages: GalleryItem[]
  }
}

const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps,
);

export default DashboardContext;
