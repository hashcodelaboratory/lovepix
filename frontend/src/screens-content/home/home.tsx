import { Configuration } from "../../common/types/configuration";
import { GalleryItem } from "../../common/types/gallery";
import Carousel from "./components/carousel/carousel";
import PreviewSection from "./components/preview-section/preview-section";
import SliderComponent from "./components/slider/slider";
import Newsletter from "./components/newsletter/newsletter";

type HomeLayoutProps = {
  configuration: Configuration;
  galleryData?: GalleryItem[];
}

const HomeLayout = ({ galleryData }: HomeLayoutProps) => (
  <div>
    <Carousel />
    <PreviewSection galleryData={galleryData} />
    <SliderComponent data={galleryData} />
    <Newsletter />
  </div>
);

export default HomeLayout;