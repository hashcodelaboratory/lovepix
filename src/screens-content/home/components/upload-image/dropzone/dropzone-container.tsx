import { Group } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import styles from "../../../home.module.scss";
import { DROPZONE_STYLE, UPLOAD_IMAGES } from "./utils";
import DropzoneIdle from "./dropzone-idle";
import { FileRejection } from "react-dropzone";
import Icon from "@icons/icon";
import { IconType } from "@icons/enums";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../../../../../utils/firebase/config";
import { useSnackbar } from "notistack";
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from "../../../../../snackbar/config";
import { messages } from "../../../../../messages/messages";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import AppContext from "../../../../../app-context/app-context";
import { ImageStatus } from "../../../../../app-context/enums";
import Image from "next/image";
import { Typography } from "@mui/material";
import { useCreateOrder } from "../../../api/order/useCreateOrder";
import { useUpdateOrder } from "../../../api/order/useUpdateOrder";
import { INITIAL_IMAGE } from "../../../../../app-context/consts";
import { useRouter } from "next/router";
import { CONFIGURATOR } from "constants/pages/urls";
import {useOrder} from "../../../api/order/useOrder";

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

  const {
    state: { image },
    stateAction: { setImage },
  } = useContext(AppContext);

  const { mutate: updateOrder } = useUpdateOrder();
  const { data: order } = useOrder();

  const router = useRouter();

  const onDrop = async (files: File[]) => {
    const file = files[0];
    const uploadURL = `${UPLOAD_IMAGES}/${order?.id}/ORIGIN-${Date.now()}`;

    const storageRef = ref(storage, uploadURL);

    const {
      metadata: { name },
    } = await uploadBytes(storageRef, file);
    if (name) {
      enqueueSnackbar(
        String(t(messages.fileUploaded)),
        SNACKBAR_OPTIONS_SUCCESS
      );
      const url = await getDownloadURL(
        ref(storage, `${UPLOAD_IMAGES}/${order?.id}/${name}`)
      );
      const data = {
        url: url,
        status: ImageStatus.UPLOADED,
        size: 1,
        name: name
      };
      setImage(data);

      order ? updateOrder({ image: data }) : createOrder({ image: data });
    }
  };

  const onReject = (files: FileRejection[]) => {
    enqueueSnackbar(String(t(messages.fileRejected)), SNACKBAR_OPTIONS_ERROR);
  };

  const handleCleanImage = async () => {
    await updateOrder({
      image: null,
    });
    setImage(INITIAL_IMAGE);
    // setCropped(undefined);
  };

  const handleContineConfiguration = () => {
    router.push(`/en${CONFIGURATOR}`);
  };

  return (
    <>
      {image?.url ? (
        <Group
          position='center'
          spacing='xs'
          className={styles.dropzoneGroupFaked}
        >
          <Image
            priority
            src={image?.url || ""}
            alt='Processing image'
            objectFit='cover'
            height={150}
            width={300}
            className={styles.imagePreview}
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
            position='center'
            spacing='xl'
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
