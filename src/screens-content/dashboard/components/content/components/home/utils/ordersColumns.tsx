import { GridColDef } from "@mui/x-data-grid";
import styles from "../../../../../dashboard.module.scss";

export const ORDERS_COLUMNS: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{field}</div>
    ),
    renderCell: ({ value }) => <div className={styles.tableCell}>{value}</div>,
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{field}</div>
    ),
    renderCell: ({ value }) => <div className={styles.status}>{value}</div>,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{field}</div>
    ),
    renderCell: ({ value }) => <div className={styles.tableCell}>{value}</div>,
  },
];