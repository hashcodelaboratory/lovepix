import Box from '@mui/material/Box'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import styles from '../../../../dashboard.module.scss'
import { useContext, useEffect, useState } from 'react'
import DashboardContext from '../../../../context/dashboard-context'
import { messages } from '../../../../../../messages/messages'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import { getOrdersColumns } from '../utils/columns/ordersColumns'
import { removeOrders } from '../../../../api/orders/removeOrders'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OrderDetail from './order-detail/order-detail'
import { Order } from '../../../../../../common/types/order'

const OrdersTable = () => {
  const {
    state: { orders },
  } = useContext(DashboardContext)

  const { enqueueSnackbar } = useSnackbar()

  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const data = orders.map(({ id, date, form }) => ({
    id: id,
    date: new Date(date).toLocaleDateString() ?? '',
    name: `${form?.firstName} ${form?.lastName}`,
  }))

  const [order, setOrder] = useState<Order>()

  // Note: Initially set first order as default
  useEffect(() => {
    setOrder(orders[0])
  }, [orders])

  const removeData = () => {
    const result = removeOrders(
      orders.map(({ id }) => id),
      queryClient
    )
    if (result === '') {
      enqueueSnackbar(
        String(t(messages.filesRemoved)),
        SNACKBAR_OPTIONS_SUCCESS
      )
    } else {
      enqueueSnackbar(result, SNACKBAR_OPTIONS_ERROR)
    }
  }

  const changeOrderId = (e: GridCellParams) => {
    setOrder(orders.find(({ id }) => id === e.id.toString()))
  }

  const buttonText = String(t(messages.removeAll))

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <h1>{String(t(messages.orders))}</h1>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex' }}>
        <Box className={styles.ordersTableSidepanel}>
          <DataGrid
            className={styles.contentTable}
            rows={data ?? []}
            columns={getOrdersColumns(t)}
            autoPageSize
            onCellClick={changeOrderId}
          />
        </Box>
        <Box className={styles.ordersTableMainpanel}>
          <OrderDetail order={order} />
        </Box>
      </AccordionDetails>
      <button className={styles.removeButton} onClick={removeData}>
        {buttonText}
        <DeleteIcon sx={{ marginLeft: 1 }} />
      </button>
    </Accordion>
  )
}

export default OrdersTable
