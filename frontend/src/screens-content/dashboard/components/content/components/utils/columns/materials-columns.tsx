import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Checkbox } from '@mui/material'
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid"

function RenderCheckBox() {

    return (
      <Checkbox />
    );
  }

export const getMaterialsColumns = (title:string): GridColDef[] => [
    {
        field: "title",
        headerName: title,
        width: 200,
        editable: false,
    },
    // {
    //     field: "available",
    //     headerName: "Available",
    //     width: 150,
    //     renderCell: RenderCheckBox
    //   },
      {
        headerName: 'Available2',
        ...GRID_CHECKBOX_SELECTION_COL_DEF
      },
];