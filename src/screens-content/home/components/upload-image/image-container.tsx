import { WALLER_IMAGE_LIST } from "../../utils/image-upload";
import { TextAlign } from "../../enums/enums";
import { Grid } from "@mui/material";
import ImageCard from "./image-card";
import { Masonry } from "@mui/lab";
import DropzoneContainer from "./dropzone/dropzone-container";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { CONFIGURATOR } from "constants/pages/urls";
import { configurationsTable } from "../../../../../database.config";
import { useLiveQuery } from "dexie-react-hooks";

const ImageContainer = () => {
  const router = useRouter();

  const data = useLiveQuery(() => configurationsTable.get("conf"), []);

  const handleConfiguration = async (sourceUrl: string) => () => {
    const res = await fetch(sourceUrl ?? "");

    const file = await res.blob();

    const fr = new FileReader();

    fr.readAsDataURL(file);

    fr.onload = () => {
      const dataPayload = {
        origin: fr.result as string,
        image: undefined,
        dimensionId: undefined,
        material: undefined,
      };

      data
        ? configurationsTable.update("conf", dataPayload)
        : configurationsTable.add(dataPayload, "conf");
    };

    router.push({
      pathname: CONFIGURATOR,
    });
  };

  return (
    <Grid sm={12} textAlign={TextAlign.RIGHT} style={{ marginTop: "64px" }}>
      <Masonry columns={3} spacing={4}>
        <DropzoneContainer />
        {WALLER_IMAGE_LIST.map(({ sourceUrl, title, id }) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              key={uuidv4()}
              onClick={handleConfiguration(sourceUrl)}
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
