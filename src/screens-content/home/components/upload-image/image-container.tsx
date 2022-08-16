import {UPLOAD_IMG, UPLOAD_IMG_GRID_STYLE} from "../../utils/image-upload";
import {TextAlign} from "../../enums/enums";
import Image from "next/image";
import {Grid} from "@mui/material";

const ImageContainer = () => (
    <Grid item lg={6} sm={6} sx={UPLOAD_IMG_GRID_STYLE} textAlign={TextAlign.RIGHT}>
        <Image alt="upload" src={UPLOAD_IMG} width={500} height={500} />
    </Grid>
)

export default ImageContainer