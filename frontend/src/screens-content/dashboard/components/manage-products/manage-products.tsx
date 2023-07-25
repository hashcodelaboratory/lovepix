import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useQueryClient } from 'react-query'
import AddProduct from './add-product/add-product'
import styles from './manage-products.module.scss'
import { getProductsColumns } from './table-columns'
import { useProducts } from 'common/api/use-products'

const ManageProducts = () => {
  const queryClient = useQueryClient()
  const { data } = useProducts()

  return (
    <div className={styles.manageProductsContainer}>
      <h3>Produkty</h3>
      <div className={styles.addProductContainer}>
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
        <AddProduct />
      </div>
    </div>
  )
}

export default ManageProducts
