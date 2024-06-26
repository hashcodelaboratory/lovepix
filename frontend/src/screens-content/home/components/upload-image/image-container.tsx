import { TextAlign } from "../../enums/enums";
import { Grid } from "@mui/material";
import ImageCard from "./image-card";
import { Masonry } from "@mui/lab";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { configurationsTable } from "../../../../../database.config";
import { handleDB } from "./utils";
import { Configuration } from "../../../../common/types/configuration";
import styles from "../../home.module.scss";
import { GalleryItem } from "../../../../common/types/gallery";

type ImageContainerProps = {
  configuration: Configuration;
  galleryData?: GalleryItem[];
}

const ImageContainer = ({ configuration, galleryData }: ImageContainerProps) => {
  const router = useRouter();

  const IMAGE_LIST = galleryData?.map(({ url, name }, index) => (
      <div
        style={{ cursor: "pointer" }}
        key={uuidv4()}
        onClick={handleDB(url, configuration, configurationsTable, router)}
      >
        <ImageCard
          sourceUrl={url}
          title={name || (index + 1).toString()}
        />
      </div>
    ),
  );

  return (
    <div className={styles.home}>
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
