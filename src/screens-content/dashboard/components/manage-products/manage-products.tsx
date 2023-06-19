import { DataGrid } from '@mui/x-data-grid'
import { useProducts } from 'common/api/use-products'
import React from 'react'
import { useQueryClient } from 'react-query'
import styles from './manage-products.module.scss'
import { getProductsColumns } from './utils'

const ManageProducts = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useProducts()

  return (
    <div className={styles.manageProductsContainer}>
      <h3>Produkty</h3>
      <div>
        <DataGrid
          className={styles.contentTable}
          rows={data ?? []}
          columns={getProductsColumns(queryClient)}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  )
}

export default ManageProducts
