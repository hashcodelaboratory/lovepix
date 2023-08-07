import { GridColDef } from "@mui/x-data-grid"
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid"

export const getMaterialsColumns = (title:string): GridColDef[] => [
    {
        field: "title",
        headerName: title,
        width: 200,
        editable: false,
    },
    {
        hideable: false,
        headerName: 'Available',
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        cellClassName: 'MuiDataGrid-cellCheckbox',
        headerClassName: 'MuiDataGrid-columnHeaderCheckbox',
    },
];