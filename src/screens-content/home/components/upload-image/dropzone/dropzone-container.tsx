import { Group } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import styles from "../../../home.module.scss";
import { DROPZONE_STYLE } from "./utils";
import DropzoneIdle from "./dropzone-idle";
import { FileRejection } from "react-dropzone";
import Icon from "@icons/icon";
import { IconType } from "@icons/enums";
import { useSnackbar } from "notistack";
import {
  SNACKBAR_OPTIONS_ERROR,
} from "../../../../../snackbar/config";
import { messages } from "../../../../../messages/messages";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CONFIGURATOR } from "constants/pages/urls";
import {useLiveQuery} from "dexie-react-hooks";
import {configurationsTable} from "../../../../../../database.config";

const DropzoneContainer = () => {
  const data = useLiveQuery(
      () => configurationsTable.get('conf'),
      []
  );

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

  const router = useRouter();

  const onDrop = async (files: File[]) => {
    const file = files[0];

    const fr = new FileReader();
    fr.readAsDataURL(file);

    fr.onload = () => {
      const data = {
        origin: fr.result as string,
        image: undefined,
        dimensionId: undefined,
        material: undefined
      };

      configurationsTable.add(data, 'conf');
    }
  };

  const onReject = (files: FileRejection[]) => {
    enqueueSnackbar(String(t(messages.fileRejected)), SNACKBAR_OPTIONS_ERROR);
  };

  const handleCleanImage = async () => {
    // TODO: clean db
  };

  const handleContinueConfiguration = () => {
    router.push(CONFIGURATOR);
  };

  return (
    <>
      {data?.origin ? (
        <Group
          position='center'
          spacing='xs'
          className={styles.dropzoneGroupFaked}
        >
          <Image
              unoptimized
            priority
            src={data?.origin ?? ""}
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
            onClick={handleContinueConfiguration}
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
