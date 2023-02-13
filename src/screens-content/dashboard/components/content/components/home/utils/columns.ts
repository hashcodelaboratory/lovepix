import { GridColDef } from '@mui/x-data-grid'

export const UPLOADED_IMAGES_COLUMNS: GridColDef[] = [
  {
    field: 'bucket',
    headerName: 'Bucket',
    width: 250,
    editable: false,
  },
  {
    field: 'order',
    headerName: 'Order',
    width: 150,
    editable: false,
  },
]
