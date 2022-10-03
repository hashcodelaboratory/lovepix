import {Group} from "@mantine/core";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import styles from "../../../home.module.scss";
import {DROPZONE_STYLE, UPLOAD_IMAGES} from "./utils";
import DropzoneIdle from "./dropzone-idle";
import {FileRejection} from "react-dropzone";
import Icon from "@icons/icon";
import {IconType} from "@icons/enums";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {storage} from "../../../../../../utils/firebase/config";
import {useSnackbar} from "notistack";
import {SNACKBAR_OPTIONS_ERROR, SNACKBAR_OPTIONS_SUCCESS} from "../../../../../snackbar/config";
import {messages} from "../../../../../messages/messages";
import {useTranslation} from "next-i18next";
import {useContext} from "react";
import AppContext from "../../../../../app-context/app-context";
import {ImageStatus} from "../../../../../app-context/imageStatus";

const DropzoneContainer = () => {

    const { t } = useTranslation();

    const { printPhoto } = messages;

    const { enqueueSnackbar } = useSnackbar();

    const { stateAction: { setImageUrl, setImageStatus } } = useContext(AppContext);

    const onDrop = (files: File[]) => {
        const file = files[0];
        const uploadURL = `${UPLOAD_IMAGES}/${Date.now()}`;

        const storageRef = ref(storage, uploadURL);

        uploadBytes(storageRef, file).then(snapshot => {
            enqueueSnackbar(String(t(messages.fileUploaded)), SNACKBAR_OPTIONS_SUCCESS);

            getDownloadURL(ref(storage, `${UPLOAD_IMAGES}/${snapshot.metadata.name}`)).then(url => {
                setImageUrl(url);
                setImageStatus(ImageStatus.UPLOADED);
            });
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
            multiple={false}
        >
            <Group position="center" spacing="xl" className={styles.dropzoneGroup}>
                <h1 className={styles.title}>
                    {String(t(printPhoto))}
                </h1>
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