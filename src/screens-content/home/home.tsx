import { Container } from "@mui/material";
import { Configuration } from "../../common/types/configuration";
import ImageContainer from "./components/upload-image/image-container";
import { GalleryItem } from "../../common/types/gallery";

type HomeLayoutProps = {
  configuration: Configuration;
  galleryData?: GalleryItem[];
}

const HomeLayout = ({ configuration, galleryData }: HomeLayoutProps) => (
  <Container>
    <ImageContainer configuration={configuration} galleryData={galleryData} />
  </Container>
);

export default HomeLayout;
