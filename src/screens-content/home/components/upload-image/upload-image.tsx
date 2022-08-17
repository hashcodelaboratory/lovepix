import styles from '../../home.module.scss';
import {Grid} from "@mui/material";
import {AlignItems, FlexWrap} from "../../enums/enums";
import TextContainer from "./text-container";
import ImageContainer from "./image-container";

const UploadImage = () => (
    <Grid
        container
        className={styles.horizontalContainer}
        flexWrap={FlexWrap.NO_WRAP}
        alignItems={AlignItems.CENTER}
        spacing={4}
    >
        <TextContainer />
        <ImageContainer />
    </Grid>
)

export default UploadImage;