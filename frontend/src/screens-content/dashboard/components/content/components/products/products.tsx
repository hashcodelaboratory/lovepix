import { DataGrid } from '@mui/x-data-grid'
import {
  PRODUCTS_KEY,
  useProducts,
} from '../../../../../../common/api/use-products'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import AddProduct from './add-product/add-product'
import styles from './products.module.scss'
import { getProductsColumns } from './utils/table-columns'
import { useUpdateProduct } from '../../../../../../common/api/edit-product'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useCategoriesEshop } from '../../../../../../common/api/use-categories-eshop'

const ProductsLayout = () => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { data } = useProducts()
  const { data: categories } = useCategoriesEshop()

  const [_row, setRow] = useState<any>()

  const { mutate: updateProduct } = useUpdateProduct({
    onSuccess: async (res) => {
      if (res.error) {
        enqueueSnackbar(res.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        enqueueSnackbar(String('Upravené'), SNACKBAR_OPTIONS_SUCCESS)
        await queryClient.invalidateQueries(PRODUCTS_KEY)
        close()
      }
    },
  })

  const onCellEditCommit = async (params: any) => {
    const { row, value, field } = params

    const actualRow = row ?? _row

    await updateProduct({
      id: actualRow.id,
      data: {
        ...actualRow,
        [field.replace('data.', '')]: value,
      },
    })
  }

  const onCellEditStart = (params: any) => {
    setRow(params.row)
  }

  return (
    <div className={styles.manageProductsContainer}>
      <h3>Produkty</h3>
      <DataGrid
        className={styles.contentTable}
        rows={data ?? []}
        columns={getProductsColumns(queryClient, categories)}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
        autoHeight
        onCellEditCommit={onCellEditCommit}
        onCellEditStart={onCellEditStart}
      />
      <h3>Nový produkt</h3>
      <AddProduct />
    </div>
  )
}

export default ProductsLayout
