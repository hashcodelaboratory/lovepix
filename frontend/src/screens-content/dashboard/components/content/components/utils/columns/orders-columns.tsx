import { GridColDef } from '@mui/x-data-grid'
import styles from '../../../../../dashboard.module.scss'

// Note: any used for translation type
export const getOrdersColumns = (t: any): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    width: 120,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.ordersTableHeader}>{field}</div>
    ),
    renderCell: ({ value }) => (
      <div className={styles.ordersTableCell}>{value}</div>
    ),
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 120,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{t(field)}</div>
    ),
    renderCell: ({ value }) => <div className={styles.status}>{value}</div>,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{t(field)}</div>
    ),
    renderCell: ({ value }) => <div className={styles.tableCell}>{value}</div>,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 220,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{t(field)}</div>
    ),
    renderCell: ({ value }) => <div className={styles.tableCell}>{value}</div>,
  },
  {
    field: 'phone',
    headerName: 'Kontakt',
    width: 140,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{t(field)}</div>
    ),
    renderCell: ({ value }) => (
      <div className={styles.ordersTableCell}>{value}</div>
    ),
  },
  {
    field: 'payment',
    headerName: 'Platba',
    width: 180,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{t(field)}</div>
    ),
    renderCell: ({ value }) => (
      <div className={styles.ordersTableCell}>{t(value.toLowerCase())}</div>
    ),
  },
  {
    field: 'address',
    headerName: 'Adresa',
    width: 400,
    editable: false,
    renderHeader: ({ field }) => (
      <div className={styles.tableHeader}>{t(field)}</div>
    ),
    renderCell: ({ value }) => <div>{value}</div>,
  },
]
