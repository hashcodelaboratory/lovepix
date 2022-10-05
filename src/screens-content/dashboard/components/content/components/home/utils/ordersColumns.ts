import {GridColDef} from "@mui/x-data-grid";

export const ORDERS_COLUMNS: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 250,
        editable: false,
    },
    {
        field: 'url',
        headerName: 'URL',
        type: 'string',
        width: 300,
        editable: false,
    },
];