import { GridColDef } from "@mui/x-data-grid";
import styles from "../../../../../dashboard.module.scss";

// Note: any used for translation type
export const getOrdersColumns = (t: any): GridColDef[] => [
  {
    field: "id",
    headerName: "ID",
    width: 120,
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
      <div className={styles.tableHeader}>{t(field)}</div>
    ),
    renderCell: ({ value }) => <div className={styles.status}>{value}</div>,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{t(field)}</div>
    ),
    renderCell: ({ value }) => <div className={styles.tableCell}>{value}</div>,
  },
];