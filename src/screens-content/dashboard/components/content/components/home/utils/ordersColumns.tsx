import {GridColDef} from "@mui/x-data-grid";
import styles from "../../../../../dashboard.module.scss";

export const ORDERS_COLUMNS: GridColDef[] = [
    {
        field: 'orderID',
        headerName: 'Order ID',
        width: 150,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        editable: false,
        renderCell: ({ value }) => <div className={styles.status}>{value}</div>
    },
    {
        field: 'url',
        headerName: 'URL',
        type: 'string',
        width: 300,
        editable: false,
    },
];