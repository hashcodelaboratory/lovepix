import {Group} from "@mantine/core";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import IconUploadPhoto from "@icons/icon-upload-photo";
import styles from "../../home.module.scss";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../messages/messages";

const DropzoneContainer = () => {

    const { t } = useTranslation();

    const { uploadPhoto, uploadPhotoSubcontent } = messages;

    return(
        <Dropzone
            onDrop={(files) => console.log('accepted files', files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            sx={{
                minHeight: 120,
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Group position="center" spacing="xl" style={{ minHeight: 120, pointerEvents: 'none' }}>
                <Dropzone.Accept>
                    <IconUploadPhoto width={100} height={100}/>
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconUploadPhoto width={100} height={100}/>
                </Dropzone.Reject>

                <div>
                    <button className={styles.uploadButton} >
                        {String(t(uploadPhoto))}
                    </button>
                    <p className={styles.uploadPhotoSubcontent}>
                        {String(t(uploadPhotoSubcontent))}
                    </p>
                </div>
            </Group>
        </Dropzone>
    )
}

export default DropzoneContainer;