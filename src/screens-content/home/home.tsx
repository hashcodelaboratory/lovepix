import { Configuration } from "../../common/types/configuration";
import { GalleryItem } from "../../common/types/gallery";
import Carousel from "./components/carousel/carousel";
import PreviewSection from "./components/preview-section/preview-section";
import SliderComponent from "./components/slider/slider";

type HomeLayoutProps = {
  configuration: Configuration;
  galleryData?: GalleryItem[];
}

const HomeLayout = ({ }: HomeLayoutProps) => (
  <div>
    <Carousel />
    <PreviewSection />
    <SliderComponent />
  </div>
);

export default HomeLayout;
