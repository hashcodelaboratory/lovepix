import {useTranslation} from "next-i18next";
import {messages} from "../../../messages/messages";
import styles from '../home.module.scss';
import {Grid} from "@mui/material";
import Image from "next/image";
import {AlignItems, FlexWrap, TextAlign} from "../enums/enums";
import {UPLOAD_IMG, UPLOAD_IMG_GRID_STYLE} from "../utils/image-upload";

const UploadImage = () => {
    const { t } = useTranslation();

    const { printPhoto, uploadPhoto, uploadPhotoSubcontent } = messages;

    return(
        <Grid
            container
            className={styles.horizontalContainer}
            flexWrap={FlexWrap.NO_WRAP}
            alignItems={AlignItems.CENTER}
        >
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
            <Grid item lg={6} sm={6} sx={UPLOAD_IMG_GRID_STYLE}
                textAlign={TextAlign.RIGHT}
            >
                <Image alt="upload" src={UPLOAD_IMG}
                   width={500}
                   height={500}
               />
            </Grid>
        </Grid>
    )
}

export default UploadImage;