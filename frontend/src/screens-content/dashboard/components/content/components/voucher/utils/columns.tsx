import { GridColDef } from '@mui/x-data-grid'
import styles from '../../../../../dashboard.module.scss'

export const getColumns = (): GridColDef[] => [
  {
    field: 'code',
    headerName: 'Code',
    width: 120,
    editable: false,
  },
  {
    field: 'expiration',
    headerName: 'Expiration',
    width: 160,
    editable: false,
    renderCell: ({ value }) => <div className={styles.status}>{value}</div>,
  },
]
