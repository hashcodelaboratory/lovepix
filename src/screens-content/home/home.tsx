import { Configuration } from "../../common/types/configuration";
import { GalleryItem } from "../../common/types/gallery";
import Carousel from "./components/carousel/carousel";
import PreviewSection from "./components/preview-section/preview-section";

type HomeLayoutProps = {
  configuration: Configuration;
  galleryData?: GalleryItem[];
}

const HomeLayout = ({ }: HomeLayoutProps) => (
  <div>
    <Carousel />
    <PreviewSection />
  </div>
);

export default HomeLayout;
