import Cropper from "./components/cropper/cropper";
import Sidebar from "./components/sidebar/sidebar";
import styles from "./image-configurator-layout.module.scss";
import { Container } from "@mui/system";
import ImageConfiguratorContext, {
    ImageConfiguratorContextProps
} from "./image-configurator-context/image-configurator-context";
import {useContext, useState} from "react";
import AppContext from "../../app-context/app-context";

const ImageConfiguratorLayout = () => {
    const { state: { image: imageApp } } = useContext(AppContext);

    const [image, setImage] = useState<string | undefined>(imageApp.url);

    const PROVIDER_VALUE: ImageConfiguratorContextProps = {
        state: {
            image: image
        },
        stateAction: {
            setImage: setImage
        }
    }

  return (
      <ImageConfiguratorContext.Provider value={PROVIDER_VALUE}>
        <Container>
          <div className={styles.container}>
            <Cropper />
            <Sidebar />
          </div>
        </Container>
      </ImageConfiguratorContext.Provider>
  );
};

export default ImageConfiguratorLayout;
