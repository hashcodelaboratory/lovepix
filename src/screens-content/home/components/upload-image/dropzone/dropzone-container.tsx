import { Group } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import styles from "../../../home.module.scss";
import { DROPZONE_STYLE, UPLOAD_IMAGES } from "./utils";
import DropzoneIdle from "./dropzone-idle";
import { FileRejection } from "react-dropzone";
import Icon from "@icons/icon";
import { IconType } from "@icons/enums";
import { ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../../../../../utils/firebase/config";
import { useSnackbar } from "notistack";
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from "../../../../../snackbar/config";
import { messages } from "../../../../../messages/messages";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useState } from "react";

import { Button, Typography } from "@mui/material";

const DropzoneContainer = () => {
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

  const [imageUrl, setImageUrl] = useState<string>();

  const onDrop = (files: File[]) => {
    const file = files[0];
    const url = `${UPLOAD_IMAGES}/${Date.now()}`;

    const imageUrl = URL.createObjectURL(file);

    setImageUrl(imageUrl);

    const storageRef = ref(storage, url);

    uploadBytes(storageRef, file).then((snapshot) => {
      enqueueSnackbar(
        String(t(messages.fileUploaded)),
        SNACKBAR_OPTIONS_SUCCESS
      );
    });
  };

  const onReject = (files: FileRejection[]) => {
    enqueueSnackbar(String(t(messages.fileRejected)), SNACKBAR_OPTIONS_ERROR);
  };

  const handleCleanImage = () => {
    setImageUrl(undefined);
  };

  const handleContineConfiguration = () => {
    // TODO continue with configuration
  };

  return (
    <>
      {imageUrl ? (
        <Group
          position="center"
          spacing="xs"
          className={styles.dropzoneGroupFaked}
        >
          <Image
            src={imageUrl || ""}
            alt="Processing image"
            objectFit="cover"
            height={150}
            width={300}
            className={styles.imagePreview}
          />
          <Typography>{String(t(processingOrder))}</Typography>
          <Typography>{String(t(doYouWant))}</Typography>
          <Button
            variant="text"
            className={styles.uploadButton}
            onClick={handleContineConfiguration}
          >
            {String(t(continueInConfiguration))}
          </Button>
          <Typography>{String(t(or))}</Typography>
          <Button
            className={styles.uploadButton}
            onClick={handleCleanImage}
            variant="text"
          >
            {String(t(uploadNewPicture))}
          </Button>
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
