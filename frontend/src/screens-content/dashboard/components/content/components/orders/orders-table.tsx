import Box from '@mui/material/Box'
import {
  DataGrid,
  GridCallbackDetails,
  GridRowParams,
  GridSelectionModel,
} from '@mui/x-data-grid'
import styles from '../../../../dashboard.module.scss'
import { useEffect, useState } from 'react'
import { localizationKey } from '../../../../../../localization/localization-key'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import { getOrdersColumns } from '../utils/columns/orders-columns'
import { removeOrders } from '../../../../api/orders/remove-orders'
import OrderDetail from './order-detail/order-detail'
import { Order } from '../../../../../../common/types/order'
import { useOrders } from '../../../../api/orders/use-orders'
import delivery from '../../../../../shopping-cart/components/summary/delivery/delivery'

export const dataGridStyle = {
  boxShadow: 2,
  '& .MuiDataGrid-row:hover': {
    cursor: 'pointer',
    backgroundColor: '#f5f5f5 !important',
  },
  '& .MuiDataGrid-row.Mui-selected': {
    cursor: 'pointer',
    backgroundColor: '#f5f5f5 !important',
  },
}

const OrdersTable = () => {
  const { data: orders = [] } = useOrders()

  const { enqueueSnackbar } = useSnackbar()

  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])

  const data = orders
    .sort((a: Order, b: Order) => (a.date < b.date ? 1 : -1))
    .map(({ id, date, form, delivery, payment }) => ({
      id: id,
      date: new Date(date).toLocaleDateString() ?? '',
      name: `${form?.firstName} ${form?.lastName}`,
      email: form?.email,
      phone: form?.phone,
      payment: payment,
      address: `${form?.address}, ${form?.city} ${form?.postalCode}`,
      delivery: delivery,
    }))

  const [order, setOrder] = useState<Order>()

  // Note: Initially set first order as default
  useEffect(() => {
    setOrder(orders[0])
  }, [orders])

  const removeData = async () => {
    try {
      await removeOrders(selectedRows, queryClient)
      enqueueSnackbar(
        String(t(localizationKey.filesRemoved)),
        SNACKBAR_OPTIONS_SUCCESS
      )
    } catch (error) {
      enqueueSnackbar((error as Error).message, SNACKBAR_OPTIONS_ERROR)
    }
  }

  const changeOrderId = (e: GridRowParams) => {
    setOrder(orders.find(({ id }) => id === e.id.toString()))
  }

  const selectionChanged = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails
  ) => {
    setSelectionModel(selectionModel)
    setSelectedRows(selectionModel.map((item, index) => data[index].id))
  }

  const buttonText = String(t(localizationKey.removeAll))

  return (
    <div className={styles.ordersContainer}>
      <h1>Objednávky</h1>
      <Box className={styles.ordersTableSidepanel}>
        <DataGrid
          className={styles.ordersTable}
          rows={data ?? []}
          columns={getOrdersColumns(t)}
          autoPageSize
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={selectionChanged}
          disableSelectionOnClick
          sx={dataGridStyle}
          onRowClick={changeOrderId}
        />
      </Box>
      <h1>Detail objednávky</h1>
      <Box className={styles.ordersTableMainpanel}>
        <OrderDetail order={order} />
      </Box>
      <button
        className={styles.removeButton}
        onClick={removeData}
        disabled={!selectedRows?.length}
      >
        {selectedRows ? `(${selectedRows.length}) ` : ''}
        {buttonText}
        <DeleteIcon sx={{ marginLeft: 1 }} />
      </button>
    </div>
  )
}

export default OrdersTable
