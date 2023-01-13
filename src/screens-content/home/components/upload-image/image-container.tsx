import { WALLER_IMAGE_LIST } from "../../utils/image-upload";
import { TextAlign } from "../../enums/enums";
import { Grid } from "@mui/material";
import ImageCard from "./image-card";
import { Masonry } from "@mui/lab";
import DropzoneContainer from "./dropzone/dropzone-container";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { CONFIGURATOR } from "constants/pages/urls";

const ImageContainer = () => {
  const router = useRouter();

  const handleConfiguration = (id: string) =>
    router.push({
      pathname: `/en${CONFIGURATOR}`,
      query: { gallery: id },
    });

  return (
    <Grid sm={12} textAlign={TextAlign.RIGHT} style={{ marginTop: "64px" }}>
      <Masonry columns={3} spacing={4}>
        <DropzoneContainer />
        {WALLER_IMAGE_LIST.map(({ sourceUrl, title, id }) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              key={uuidv4()}
              onClick={() => handleConfiguration(id)}
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
