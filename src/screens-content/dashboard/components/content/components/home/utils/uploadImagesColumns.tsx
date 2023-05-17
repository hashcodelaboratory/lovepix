import { GridColDef } from "@mui/x-data-grid";

export const getUploadImagesColumns = (): GridColDef[] => [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: false,
  },
];
