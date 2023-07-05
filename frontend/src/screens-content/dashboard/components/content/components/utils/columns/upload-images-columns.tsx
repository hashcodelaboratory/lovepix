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
      <Image layout={ImageLayout.FIXED} width={40} height={40} src={value} alt="" />
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
    field: "contentType",
    headerName: "Content Type",
    width: 120,
    editable: false,
    renderCell: (({ value }) => (
      <div className={styles.gallerySecondaryText}>{value}</div>
    )),
  },
  {
    field: "timeCreated",
    headerName: "Time created",
    width: 120,
    editable: false,
    renderCell: (({ value }) => {
      const date = new Date(value);
      const result = date.toLocaleDateString();
      return (
        <div className={styles.galleryDate}>{result}</div>
      )
    }),
  },
  {
    field: "price",
    headerName: "Price",
    width: 80,
    editable: false,
    renderCell: (({ value }) => (
      <div className={styles.gallerySecondaryText}>{value} €</div>
    )),
  },
];
