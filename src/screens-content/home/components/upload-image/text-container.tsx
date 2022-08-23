import styles from "../../home.module.scss";
import {Grid} from "@mui/material";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../messages/messages";
import DropzoneContainer from "./dropzone/dropzone-container";

const TextContainer = () => {
    const { t } = useTranslation();

    const { printPhoto } = messages;

    return(
        <Grid item lg={6} sm={6}>
            <h1 className={styles.title}>
                {String(t(printPhoto))}
            </h1>
            <DropzoneContainer />
        </Grid>
    )
}

export default TextContainer