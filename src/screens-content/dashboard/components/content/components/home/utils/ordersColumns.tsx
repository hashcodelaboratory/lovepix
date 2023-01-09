import {GridColDef} from "@mui/x-data-grid";
import styles from "../../../../../dashboard.module.scss";

export const ORDERS_COLUMNS: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        editable: false,
        filterable: true
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: false,
        renderCell: ({ value }) => <div className={styles.status}>{value}</div>
    },
    {
        field: 'delivery',
        headerName: 'Delivery',
        type: 'string',
        width: 200,
        editable: false,
    },
    {
        field: 'payment',
        headerName: 'Payment',
        type: 'string',
        width: 200,
        editable: false,
    },
];