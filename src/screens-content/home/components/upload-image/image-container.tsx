import { WALLER_IMAGE_LIST } from "../../utils/image-upload";
import { TextAlign } from "../../enums/enums";
import { Grid } from "@mui/material";
import ImageCard from "./image-card";
import { Masonry } from "@mui/lab";
import DropzoneContainer from "./dropzone/dropzone-container";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { configurationsTable } from "../../../../../database.config";
import { handleDB } from "./utils";
import { Configuration } from "../../../../common/types/configuration";
import styles from '../../home.module.scss'

type ImageContainerProps = {
  configuration: Configuration;
}

const ImageContainer = ({ configuration }: ImageContainerProps) => {
  const router = useRouter();

  const IMAGE_LIST = WALLER_IMAGE_LIST.map(({ sourceUrl, title }) => (
      <div
        style={{ cursor: "pointer" }}
        key={uuidv4()}
        onClick={handleDB(sourceUrl, configuration, configurationsTable, router)}
      >
        <ImageCard sourceUrl={sourceUrl} title={title} />
      </div>
    ),
  );

  return (
    <div className={styles.home}>
      <DropzoneContainer configuration={configuration} />
      <Grid sm={12} textAlign={TextAlign.RIGHT} style={{ marginTop: "64px" }}>
        <Masonry columns={3} spacing={2}>
          {IMAGE_LIST}
          <button className={styles.galleryButton}>
            Gallery
          </button>
        </Masonry>
      </Grid>
    </div>
  );
};

export default ImageContainer;
