import { GridColDef } from '@mui/x-data-grid'
import styles from '../../../../dashboard/dashboard.module.scss'

export const getColumns = (): GridColDef[] => [
  {
    field: 'date',
    headerName: 'Dátum',
    width: 120,
    editable: false,
  },
  {
    field: 'id',
    headerName: 'ID objednávky',
    width: 200,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Cena',
    width: 100,
    editable: false,
  },
  {
    field: 'state',
    headerName: 'Stav',
    width: 120,
    editable: false,
  },
  {
    field: 'invoice',
    headerName: 'Faktúra',
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
]
