import { Container } from "@mui/system";
import styles from "./image-configurator-layout.module.scss";
import Sidebar from "./components/sidebar/sidebar";
import CropperComponent from "./components/cropper/cropper";
import { Configuration } from "../../common/types/configuration";

type ImageConfiguratorLayoutProps = {
  configuration: Configuration;
}

const ImageConfiguratorLayout = ({ configuration }: ImageConfiguratorLayoutProps) => (
  <Container className={styles.container}>
      <CropperComponent configuration={configuration} />
      <Sidebar configuration={configuration} />
  </Container>
);

export default ImageConfiguratorLayout;
