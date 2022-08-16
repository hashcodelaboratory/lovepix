import {UPLOAD_IMG_GRID_STYLE, WALLER_IMAGE_LIST} from "../../utils/image-upload";
import {TextAlign} from "../../enums/enums";
import {Grid} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const ImageContainer = () => (
    <Grid item lg={6} sm={6} sx={UPLOAD_IMG_GRID_STYLE} textAlign={TextAlign.RIGHT}>
        <ImageList variant="masonry" cols={3} gap={8}>
            {WALLER_IMAGE_LIST.map(({img, title}) => (
                <ImageListItem key={img}>
                    <picture>
                        <source srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`} type="image/webp" />
                        <img
                            src={`${img}?w=248&fit=crop&auto=format`}
                            alt={title}
                            loading="lazy"
                        />
                    </picture>
                </ImageListItem>
            ))}
        </ImageList>
    </Grid>
)

export default ImageContainer