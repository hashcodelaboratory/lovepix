import { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { ImageLayout } from "../../../../../../home/enums/enums";
import styles from "../../../../../dashboard.module.scss";

export const getUploadImagesColumns = (): GridColDef[] => [
  {
    field: "url",
    headerName: "Preview",
    width: 80,
    editable: false,
    renderCell: (({ value }) => (
      <Image layout={ImageLayout.FIXED} width={40} height={40} src={value} />
    )),
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: false,
  },
  {
    field: "size",
    headerName: "Size",
    width: 100,
    editable: false,
    renderCell: (({ value }) => (
      <div className={styles.gallerySecondaryText}>{value / 1000} KB</div>
    )),
  },
  {
    field: "timeCreated",
    headerName: "Time created",
    width: 150,
    editable: false,
    renderCell: (({ value }) => {
      const date = new Date(value);
      const result = date.toDateString();
      return (
        <div className={styles.gallerySecondaryText}>{result}</div>
      )
    }),
  },
];
