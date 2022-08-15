import {useTranslation} from "next-i18next";
import {messages} from "../../../messages/messages";
import styles from '../home.module.scss';

const UploadImage = () => {
    const { t } = useTranslation();

    const { printPhoto, uploadPhoto, uploadPhotoSubcontent } = messages;

    return(
        <>
            <h1 className={styles.title}>
                {String(t(printPhoto))}
            </h1>
            <button className={styles.uploadButton} >
                {String(t(uploadPhoto))}
            </button>
            <p className={styles.uploadPhotoSubcontent}>
                {String(t(uploadPhotoSubcontent))}
            </p>
        </>
    )
}

export default UploadImage;