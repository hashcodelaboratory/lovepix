import { GridColDef } from "@mui/x-data-grid";

export const getDimensionsColumns = (): GridColDef[] => [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: false,
  }
];
