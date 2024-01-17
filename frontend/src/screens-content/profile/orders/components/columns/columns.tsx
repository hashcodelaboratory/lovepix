import { GridColDef } from '@mui/x-data-grid'
import styles from '../../../profile.module.scss'

export const getColumns = (): GridColDef[] => [
  {
    field: 'date',
    headerName: 'Dátum',
    headerClassName: 'hideRightSeparator',
    width: 120,
    editable: false,
    renderCell: ({ value }) => <div style={{ color: 'silver' }}>{value}</div>,
    disableColumnMenu: true,
  },
  {
    field: 'id',
    headerName: 'ID objednávky',
    headerClassName: 'hideRightSeparator',
    width: 160,
    editable: false,
    renderCell: ({ value }) => <div style={{ fontWeight: 200 }}>{value}</div>,
    disableColumnMenu: true,
  },
  {
    field: 'totalPrice',
    headerName: 'Cena',
    headerClassName: 'hideRightSeparator',
    width: 100,
    editable: false,
    renderCell: ({ value }) => (
      <div style={{ fontWeight: 'bold' }}>{value} €</div>
    ),
    disableColumnMenu: true,
  },
  {
    field: 'state',
    headerName: 'Stav',
    headerClassName: 'hideRightSeparator',
    width: 220,
    editable: false,
    disableColumnMenu: true,
  },
  // {
  //   field: 'invoice',
  //   headerName: 'Faktúra',
  //   width: 160,
  //   editable: false,
  //   renderCell: ({ value }) => {
  //     const isValid = new Date(value).getTime() > Date.now()
  //
  //     return (
  //       <div className={styles[isValid ? 'status' : 'statusError']}>
  //         {value}
  //       </div>
  //     )
  //   },
  // },
]
