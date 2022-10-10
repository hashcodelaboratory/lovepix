import { Group } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import styles from "../../../home.module.scss";
import { DROPZONE_STYLE, UPLOAD_IMAGES } from "./utils";
import DropzoneIdle from "./dropzone-idle";
import { FileRejection } from "react-dropzone";
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
import Image from "next/image";
import { Typography } from "@mui/material";
import {useCreateOrder} from "../../../api/order/useCreateOrder";

const DropzoneContainer = () => {

    const { mutate: createOrder } = useCreateOrder();

    const { t } = useTranslation();

    const {
        printPhoto,
        processingOrder,
        doYouWant,
        or,
        uploadNewPicture,
        continueInConfiguration,
    } = messages;

    const { enqueueSnackbar } = useSnackbar();

    const { state: { image: { url } }, stateAction: { setImage } } = useContext(AppContext);

    const onDrop = async (files: File[]) => {
        const file = files[0];
        const uploadURL = `${UPLOAD_IMAGES}/${Date.now()}`;

        const storageRef = ref(storage, uploadURL);

        const { metadata : { name } } = await uploadBytes(storageRef, file);
        if (name) {
            enqueueSnackbar(String(t(messages.fileUploaded)), SNACKBAR_OPTIONS_SUCCESS);
            const url = await getDownloadURL(ref(storage, `${UPLOAD_IMAGES}/${name}`));
            const data = {
                url: url,
                status: ImageStatus.CONFIGURED, // TODO: change to UPLOADED when cropper will be developed
                size: 1,
                name: name
            }
            setImage(data);
            createOrder({image: data});
        }
    }

    const onReject = (files: FileRejection[]) => {
        enqueueSnackbar(String(t(messages.fileRejected)), SNACKBAR_OPTIONS_ERROR);
    }

    const handleCleanImage = () => {
        setImage({
            url: undefined,
            status: ImageStatus.DEFAULT,
            size: 0,
            name: undefined
        });
    };

    const handleContineConfiguration = () => {
        // TODO: continue with configuration in cropper
    };

  return (
    <>
      {url ? (
        <Group
          position="center"
          spacing="xs"
          className={styles.dropzoneGroupFaked}
        >
          <Image
            src={url || ""}
            alt="Processing image"
            objectFit="cover"
            height={150}
            width={300}
            className={styles.imagePreview}
            priority
          />
          <Typography>{String(t(processingOrder))}</Typography>
          <Typography>{String(t(doYouWant))}</Typography>
          <button
            className={styles.uploadButton}
            onClick={handleContineConfiguration}
          >
            {String(t(continueInConfiguration))}
          </button>
          <Typography>{String(t(or))}</Typography>
          <button className={styles.uploadButton} onClick={handleCleanImage}>
            {String(t(uploadNewPicture))}
          </button>
        </Group>
      ) : (
        <Dropzone
          onDrop={(files) => onDrop(files)}
          onReject={(files) => onReject(files)}
          accept={IMAGE_MIME_TYPE}
          sx={DROPZONE_STYLE}
          multiple={false}
        >
          <Group
            position="center"
            spacing="xl"
            className={styles.dropzoneGroup}
          >
            <h1 className={styles.title}>{String(t(printPhoto))}</h1>
            <Dropzone.Accept>
              <Icon icon={IconType.UPLOAD_PHOTO} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Icon icon={IconType.UPLOAD_PHOTO} />
            </Dropzone.Reject>

            <DropzoneIdle />
          </Group>
        </Dropzone>
      )}
    </>
  );
};

export default DropzoneContainer;