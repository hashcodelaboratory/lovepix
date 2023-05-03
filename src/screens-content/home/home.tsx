import { Configuration } from "../../common/types/configuration";
import { GalleryItem } from "../../common/types/gallery";
import Carousel from "./components/carousel/carousel";

type HomeLayoutProps = {
  configuration: Configuration;
  galleryData?: GalleryItem[];
}

const HomeLayout = ({ }: HomeLayoutProps) => (
  <div>
    <Carousel />
  </div>
);

export default HomeLayout;
