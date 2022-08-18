import {Group} from "@mantine/core";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import styles from "../../../home.module.scss";
import Icons from "@icons/icons";
import {DROPZONE_STYLE} from "./utils";
import DropzoneIdle from "./dropzone-idle";
import {FileRejection} from "react-dropzone";

const DropzoneContainer = () => {

    const onDrop = (files: File[]) => {
        // TODO: implement onDrop functionality
    }

    const onReject = (files: FileRejection[]) => {
        // TODO: implement onReject functionality
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
                    {Icons.uploadPhoto}
                </Dropzone.Accept>
                <Dropzone.Reject>
                    {Icons.uploadPhoto}
                </Dropzone.Reject>

                <DropzoneIdle />
            </Group>
        </Dropzone>
    )
}

export default DropzoneContainer;