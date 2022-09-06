import {Group} from "@mantine/core";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import styles from "../../../home.module.scss";
import {DROPZONE_STYLE, UPLOAD_IMAGES} from "./utils";
import DropzoneIdle from "./dropzone-idle";
import {FileRejection} from "react-dropzone";
import Icon from "@icons/icon";
import {IconType} from "@icons/enums";
import {ref, uploadBytes} from "@firebase/storage";
import {storage} from "../../../../../../utils/firebase/config";
import {useSnackbar} from "notistack";
import {SNACKBAR_OPTIONS_ERROR, SNACKBAR_OPTIONS_SUCCESS} from "../../../../../snackbar/config";
import {messages} from "../../../../../messages/messages";
import {useTranslation} from "next-i18next";

const DropzoneContainer = () => {

    const { t } = useTranslation();

    const { enqueueSnackbar } = useSnackbar();

    const onDrop = (files: File[]) => {
        const file = files[0];
        const url = `${UPLOAD_IMAGES}/${Date.now()}`;

        const storageRef = ref(storage, url);

        uploadBytes(storageRef, file).then(snapshot => {
            enqueueSnackbar(String(t(messages.fileUploaded)), SNACKBAR_OPTIONS_SUCCESS);
        });
    }

    const onReject = (files: FileRejection[]) => {
        enqueueSnackbar(String(t(messages.fileRejected)), SNACKBAR_OPTIONS_ERROR);
    }

    return(
        <Dropzone
            onDrop={(files) => onDrop(files)}
            onReject={(files) => onReject(files)}
            accept={IMAGE_MIME_TYPE}
            sx={DROPZONE_STYLE}
        >
            <Group position="center" spacing="xl" className={styles.dropzoneGroup}>
                <Dropzone.Accept>
                    <Icon icon={IconType.UPLOAD_PHOTO} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <Icon icon={IconType.UPLOAD_PHOTO} />
                </Dropzone.Reject>

                <DropzoneIdle />
            </Group>
        </Dropzone>
    )
}

export default DropzoneContainer;