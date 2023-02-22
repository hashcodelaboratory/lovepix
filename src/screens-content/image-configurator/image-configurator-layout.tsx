import { Container } from "@mui/system";
import styles from "./image-configurator-layout.module.scss";
import Sidebar from "./components/sidebar/sidebar";
import CropperComponent from "./components/cropper/cropper";

const ImageConfiguratorLayout = () => (
  <Container>
    <div className={styles.container}>
      <CropperComponent />
      <Sidebar />
    </div>
  </Container>
);

export default ImageConfiguratorLayout;
