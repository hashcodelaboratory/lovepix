import { Container } from "@mui/system";
import styles from "./image-configurator-layout.module.scss";
import Sidebar from "./components/sidebar/sidebar";
import CropperComponent from "./components/cropper/cropper";
import { Configuration } from "../../common/types/configuration";

type ImageConfiguratorLayoutProps = {
  configuration: Configuration;
}

const ImageConfiguratorLayout = ({ configuration }: ImageConfiguratorLayoutProps) => (
  <Container >
    <div className={styles.container}>
      <CropperComponent configuration={configuration} />
      <Sidebar configuration={configuration} />
    </div>
  </Container>
);

export default ImageConfiguratorLayout;
