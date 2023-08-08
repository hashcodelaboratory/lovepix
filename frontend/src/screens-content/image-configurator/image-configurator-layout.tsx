import { Container } from "@mui/system";
import styles from "./image-configurator-layout.module.scss";
import Sidebar from "./components/sidebar/sidebar";
import CropperComponent from "./components/cropper/cropper";
import { Configuration } from "../../common/types/configuration";
import { useEffect, useState } from "react";
import ImageConfiguratorContext from "./image-configurator-context/image-configurator-context";
import { configurationsTable } from "../../../database.config";
import { useConfiguratorQuery } from "./use-configurator-query";
import { CONFIGURATION_TABLE_KEY } from "common/indexed-db/hooks/keys";

type ImageConfiguratorLayoutProps = {
  configuration: Configuration;
}

const ImageConfiguratorLayout = ({ configuration }: ImageConfiguratorLayoutProps) => {
  const [cropper, setCropper] = useState<any>()
  const value = {
    state: {
      cropper
    },
    stateAction: {
      setCropper
    }
  }

  const query = useConfiguratorQuery()
  useEffect(() => {
    if(!query?.material) return
    configurationsTable.update(CONFIGURATION_TABLE_KEY, query)
  },[query])

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
