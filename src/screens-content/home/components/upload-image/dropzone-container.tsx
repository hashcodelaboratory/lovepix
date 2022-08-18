import {Group} from "@mantine/core";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import styles from "../../home.module.scss";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../messages/messages";
import Icons from "@icons/icons";

const DropzoneContainer = () => {

    const { t } = useTranslation();

    const { uploadPhoto, uploadPhotoSubcontent } = messages;

    return(
        <Dropzone
            onDrop={(files) => console.log('accepted files', files)}
            onReject={(files) => console.log('rejected files', files)}
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
                    {Icons.uploadPhoto}
                </Dropzone.Accept>
                <Dropzone.Reject>
                    {Icons.uploadPhoto}
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