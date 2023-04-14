import { Container } from "@mui/system";
import styles from "./image-configurator-layout.module.scss";
import Sidebar from "./components/sidebar/sidebar";
import CropperComponent from "./components/cropper/cropper";
import { Configuration } from "../../common/types/configuration";
import { useState } from "react";
import ImageConfiguratorContext from "./image-configurator-context/image-configurator-context";

type ImageConfiguratorLayoutProps = {
  configuration: Configuration;
}

const ImageConfiguratorLayout = ({ configuration }: ImageConfiguratorLayoutProps) => {
  const [cropper, setCropper] = useState<any>();
  const value = {
    state: {
      cropper
    },
    stateAction: {
      setCropper
    }
  }

  return (
    <ImageConfiguratorContext.Provider value={value}>
      <Container>
        <div className={styles.container}>
          <CropperComponent configuration={configuration} />
          <Sidebar configuration={configuration} />
        </div>
      </Container>
    </ImageConfiguratorContext.Provider>
  );
};

export default ImageConfiguratorLayout;
