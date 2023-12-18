import styles from '../profile.module.scss'
import { getDimensionsColumns } from '../../dashboard/components/content/components/utils/columns/dimensions-columns'
import { DataGrid } from '@mui/x-data-grid'
import { getColumns } from './components/columns/columns'

const Orders = () => {
  return (
    <>
      <h4>Už vybavené objednávky</h4>
      <DataGrid
        className={styles.contentTable}
        rows={[]}
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
