import {UPLOAD_IMG_GRID_STYLE, WALLER_IMAGE_LIST} from "../../utils/image-upload";
import {TextAlign} from "../../enums/enums";
import {Grid} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import styles from "../../home.module.scss";
import { v4 as uuidv4 } from 'uuid';
import {imageSource, imageSourceSet} from "./utils";

const ImageContainer = () => (
    <Grid sm={12} sx={UPLOAD_IMG_GRID_STYLE} textAlign={TextAlign.RIGHT}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {WALLER_IMAGE_LIST.map(({sourceUrl, title}) => (
          <ImageListItem key={uuidv4()}>
            <img
              src={imageSource(sourceUrl)}
              srcSet={imageSourceSet(sourceUrl)}
              alt={title}
              loading="lazy"
              className={styles.roundedImage}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  )

export default ImageContainer