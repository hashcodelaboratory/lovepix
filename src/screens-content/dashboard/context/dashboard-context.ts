import { createContext } from "react";
import { StorageReference } from "@firebase/storage";
import { Order } from "../../../common/types/order";
import { GalleryItem } from "../../../common/types/gallery";
import { DimensionType } from "../../../common/api/use-dimensions";

type DashboardContextProps = {
  state: {
    uploadImages: StorageReference[]
    orders: Order[]
    galleryImages: GalleryItem[]
    dimensions: DimensionType[]
  }
}

const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps,
);

export default DashboardContext;
