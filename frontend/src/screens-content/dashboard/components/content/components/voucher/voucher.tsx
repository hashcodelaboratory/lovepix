import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { messages } from '../../../../../../messages/messages'
import styles from '../../../../dashboard.module.scss'
import {
  DataGrid,
  GridCallbackDetails,
  GridRowParams,
  GridSelectionModel,
} from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'next-i18next'
import { useContext, useState } from 'react'
import DashboardContext from '../../../../context/dashboard-context'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'
import { getDimensionsColumns } from '../utils/columns/dimensions-columns'
import { CategoryType } from '../../../../../../common/api/use-categories'
import { removeCategory } from '../../../../api/categories/removeCategory'
import { VoucherType } from '../../../../../../common/api/use-vouchers'
import VoucherDetail from './components/voucher-detail/voucher-detail'

const Voucher = (): JSX.Element => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const {
    state: { vouchers },
  } = useContext(DashboardContext)

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [detailRow, setDetailRow] = useState<GridRowParams>()

  const data =
    vouchers?.map(
      ({ name, id }) =>
        ({
          id: id,
          name: name,
        } as VoucherType)
    ) ?? []

  const reset = () => {
    setSelectionModel([])
    setSelectedRows([])
  }

  const removeData = () => {
    const result = removeCategory(selectedRows, queryClient)
    if (result === '') {
      enqueueSnackbar(
        String(t(messages.filesRemoved)),
        SNACKBAR_OPTIONS_SUCCESS
      )
      reset()
    } else {
      enqueueSnackbar(result, SNACKBAR_OPTIONS_ERROR)
    }
  }

  const selectionChanged = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails
  ) => {
    setSelectionModel(selectionModel)
    setSelectedRows(selectionModel.map((item, index) => data[index].name))
  }

  const onRowClick = (details: GridRowParams) => {
    setDetailRow(details)
  }

  const buttonText = `(${selectedRows.length}) ${String(t(messages.removeAll))}`

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <h3>{String(t(messages.code))}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.rowContainer}>
          <DataGrid
            className={styles.contentTable}
            rows={data}
            columns={getDimensionsColumns()}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={selectionModel}
            onSelectionModelChange={selectionChanged}
            onRowClick={onRowClick}
            autoHeight
          />
          <VoucherDetail />
        </div>
        <div className={styles.rowContainer}>
          <button
            className={styles.removeButton}
            onClick={removeData}
            disabled={selectedRows.length === 0}
          >
            {buttonText}
            <DeleteIcon sx={{ marginLeft: 1 }} />
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default Voucher
