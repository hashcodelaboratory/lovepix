import { GridColDef } from '@mui/x-data-grid'
import styles from '../../../../../dashboard.module.scss'

export const getColumns = (): GridColDef[] => [
  {
    field: 'code',
    headerName: 'Kód',
    width: 120,
    editable: false,
  },
  {
    field: 'expiration',
    headerName: 'Dátum expirácie',
    width: 160,
    editable: false,
    renderCell: ({ value }) => {
      const isValid = new Date(value).getTime() > Date.now()

      return (
        <div className={styles[isValid ? 'status' : 'statusError']}>
          {value}
        </div>
      )
    },
  },
  {
    field: 'limit',
    headerName: 'Limit použitia',
    width: 120,
    editable: false,
  },
]
