import styles from "../../home.module.scss";
import {Grid} from "@mui/material";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../messages/messages";

const TextContainer = () => {
    const { t } = useTranslation();

    const { printPhoto, uploadPhoto, uploadPhotoSubcontent } = messages;

    return(
        <Grid item lg={6} sm={6}>
            <h1 className={styles.title}>
                {String(t(printPhoto))}
            </h1>
            <button className={styles.uploadButton} >
                {String(t(uploadPhoto))}
            </button>
            <p className={styles.uploadPhotoSubcontent}>
                {String(t(uploadPhotoSubcontent))}
            </p>
        </Grid>
    )
}

export default TextContainer