import {useTranslation} from "next-i18next";
import {messages} from "../../../messages/messages";
import styles from '../home.module.scss';
import {Grid} from "@mui/material";
import Image from "next/image";
import {AlignItems, FlexWrap, TextAlign} from "../enums/enums";

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
            <Grid item lg={6} sm={6} sx={{ display: { xs: "none", sm: "block", md: "block", lg: "block", xl: "block" } }}
                textAlign={TextAlign.RIGHT}
            >
                <Image alt="upload" src="https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/home-page%2Fmain_banner.png?alt=media&token=dd65465a-f6a5-479e-8ea1-891dc07d86a2"
                   width={500}
                   height={500}
               />
            </Grid>
        </Grid>
    )
}

export default UploadImage;