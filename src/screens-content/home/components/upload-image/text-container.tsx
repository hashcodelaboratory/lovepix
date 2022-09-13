import styles from "../../home.module.scss";
import {Grid} from "@mui/material";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../messages/messages";
import DropzoneContainer from "./dropzone/dropzone-container";
import {useContext} from "react";
import AppContext from "../../../../app-context/app-context";
import Image from "next/image";

const TextContainer = () => {
    const { t } = useTranslation();

    const { state } = useContext(AppContext);
    const { uploadedImageUrl } = state;

    const { printPhoto } = messages;

    const content = uploadedImageUrl ?
        <Image
            alt="preview"
            className={styles.imageInDropzone}
            src={uploadedImageUrl}
            width={200}
            height={100}
            layout="responsive"
        /> : <DropzoneContainer />;

    return(
        <Grid item lg={6} sm={6}>
            <h1 className={styles.title}>
                {String(t(printPhoto))}
            </h1>
            {content}
        </Grid>
    )
}

export default TextContainer