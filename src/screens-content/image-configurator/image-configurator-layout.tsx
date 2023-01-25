import Cropper from "./components/cropper/cropper";
import Sidebar from "./components/sidebar/sidebar";
import styles from "./image-configurator-layout.module.scss";
import { Container } from "@mui/system";

const ImageConfiguratorLayout = () => (
  <Container>
    <div className={styles.container}>
      <Cropper />
      <Sidebar />
    </div>
  </Container>
);

export default ImageConfiguratorLayout;
