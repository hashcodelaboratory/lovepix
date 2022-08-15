import {useTranslation} from "next-i18next";
import {messages} from "../../../messages/messages";
import styles from '../main.module.scss';

const UploadImagePart = () => {
    const { t } = useTranslation();

    return(
        <>
            <h1 className={styles.title}>
                {String(t(messages.printPhoto))}
            </h1>
            <button className={styles.uploadButton} >
                {String(t(messages.uploadPhoto))}
            </button>
            <p className={styles.uploadPhotoSubcontent}>
                {String(t(messages.uploadPhotoSubcontent))}
            </p>
        </>
    )
}

export default UploadImagePart;