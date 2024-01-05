import styles from '../profile.module.scss'
import { DataGrid } from '@mui/x-data-grid'
import { getColumns } from './components/columns/columns'

type OrderDetail = {
  id: string
  date: string
  totalPrice: number
  state: string
}

type OrdersProps = {
  data?: OrderDetail[]
}
const Orders = ({ data = [] }: OrdersProps) => {
  return (
    <>
      <h4>Už vybavené objednávky</h4>
      <DataGrid
        className={styles.contentTable}
        rows={data}
        columns={getColumns()}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
        // selectionModel={null}
        // onSelectionModelChange={selectionChanged}
        // onRowClick={onRowClick}
        autoHeight
      />
    </>
  )
}

export default Orders
