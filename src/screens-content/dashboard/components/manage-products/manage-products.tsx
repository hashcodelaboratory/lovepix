import { DataGrid } from '@mui/x-data-grid'
import { useProducts } from 'common/api/use-products'
import React from 'react'
import { useQueryClient } from 'react-query'
import AddProduct from './add-product/add-product'
import styles from './manage-products.module.scss'
import { getProductsColumns } from './utils'

const ManageProducts = () => {
  const queryClient = useQueryClient()
  const { data } = useProducts()

  return (
    <div className={styles.manageProductsContainer}>
      <h3>Produkty</h3>
      <AddProduct />
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
