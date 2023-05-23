import styles from "../../../../../dashboard.module.scss";
import Image from "next/image";
import { ImageLayout } from "../../../../../../home/enums/enums";
import { Chip, Stack, TextField } from "@mui/material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../../messages/messages";
import Button from "@mui/material/Button";
import { useContext } from "react";
import DashboardContext from "../../../../../context/dashboard-context";

type Row = {
  id: string;
  contentType: string;
  name: string;
  size: number;
  timeCreated: string;
  url: string;
}

type GalleryDetailProps = {
  row?: Row;
}

const GalleryDetail = ({ row }: GalleryDetailProps): JSX.Element => {
  const { t } = useTranslation();

  const {
    state: { dimensions },
  } = useContext(DashboardContext);

  return (
    <>
      <div className={styles.galleryDetailBox}>
        <div className={styles.galleryDetailRow}>
          <Image
            className={styles.galleryDetailImage}
            src={row?.url ?? ""}
            layout={ImageLayout.FIXED}
            width={300}
            height={200}
          />
          <div className={styles.galleryDetailContainer}>
            <div className={styles.galleryDetailTitle}>{row?.name}</div>
            <div className={styles.galleryDetailColumn}>
              <div className={styles.galleryDetailDate}>
                {new Date(row?.timeCreated ?? "").toLocaleDateString()}
                {" "}
                {new Date(row?.timeCreated ?? "").toLocaleTimeString()}
              </div>
              <div className={styles.galleryDetailDate}>
                {row?.size && row.size / 1000} KB
              </div>
              <TextField className={styles.galleryDetailTextField} size="small" label={t(messages.price)} defaultValue={"-"} />
            </div>
          </div>
        </div>
        <div className={styles.galleryDetailContainer}>
          <Stack direction="row" spacing={1}>
            {dimensions?.map(({ id, name }) =>
              <Chip key={id} label={name} color="primary" clickable />
            )}
          </Stack>
        </div>
        <div className={styles.galleryDetailContainer}>
          <Stack direction="row" spacing={1}>
            <Chip label="20 x 20" color="secondary" clickable />
            <Chip label="20 x 20" color="secondary" variant="outlined" clickable />
            <Chip label="20 x 20" color="secondary" variant="outlined" clickable />
            <Chip label="20 x 20" color="secondary" variant="outlined" clickable />
          </Stack>
        </div>
        <Button
          className={styles.galleryDetailSave}
          sx={{
            ':hover': {
              bgcolor: 'success.main', // theme.palette.primary.main
              color: 'white',
            },
          }}
          variant="outlined"
          color="success"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default GalleryDetail;