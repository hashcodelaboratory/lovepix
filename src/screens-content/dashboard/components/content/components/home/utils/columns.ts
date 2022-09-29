import {GridColDef} from "@mui/x-data-grid";

export const UPLOADED_IMAGES_COLUMNS: GridColDef[] = [
    {
        field: 'bucket',
        headerName: 'Bucket',
        width: 250,
        editable: false,
    },
    {
        field: 'fullPath',
        headerName: 'Full path',
        type: 'string',
        width: 300,
        editable: false,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: false,
    }
];