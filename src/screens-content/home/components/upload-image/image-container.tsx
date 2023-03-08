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

type ImageContainerProps = {
  configuration: Configuration;
}

const ImageContainer = ({ configuration }: ImageContainerProps) => {
  const router = useRouter();

  return (
    <Grid sm={12} textAlign={TextAlign.RIGHT} style={{ marginTop: "64px" }}>
      <Masonry columns={3} spacing={4}>
        <DropzoneContainer configuration={configuration} />
        {WALLER_IMAGE_LIST.map(({ sourceUrl, title }) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              key={uuidv4()}
              onClick={handleDB(sourceUrl, configuration, configurationsTable, router)}
            >
              <ImageCard sourceUrl={sourceUrl} title={title} />
            </div>
          );
        })}
        <button style={{ height: "200px", borderRadius: "0.5rem" }}>
          Gallery
        </button>
      </Masonry>
    </Grid>
  );
};

export default ImageContainer;
