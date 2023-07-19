import { GridColDef } from '@mui/x-data-grid'

export const getColumns = (): GridColDef[] => [
  {
    field: 'code',
    headerName: 'Code',
    width: 200,
    editable: false,
  },
]
