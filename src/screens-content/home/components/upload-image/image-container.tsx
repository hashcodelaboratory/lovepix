import {WALLER_IMAGE_LIST} from "../../utils/image-upload";
import {TextAlign} from "../../enums/enums";
import {Grid} from "@mui/material";
import ImageCard from "./image-card";
import {Masonry} from "@mui/lab";
import DropzoneContainer from "./dropzone/dropzone-container";

const ImageContainer = () => (
  <Grid sm={12} textAlign={TextAlign.RIGHT} style={{marginTop: '64px'}}>
    <Masonry columns={3} spacing={4}>
      <DropzoneContainer/>
      {WALLER_IMAGE_LIST.map(({sourceUrl, title}) => (
        <ImageCard sourceUrl={sourceUrl} title={title}/>
      ))}
      <button style={{ height: '200px', borderRadius: '0.5rem' }}>
        Gallery
      </button>
    </Masonry>
  </Grid>
)

export default ImageContainer