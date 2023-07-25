import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { localizationKey } from '../../../../../../localization/localization-key'
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
import { useSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'
import {
  VOUCHERS_KEY,
  VoucherType,
} from '../../../../../../common/api/use-vouchers'
import VoucherDetail from './components/voucher-detail/voucher-detail'
import { getColumns } from './utils/columns'
import { useRemoveVouchers } from '../../../../api/vouchers/remove-vouchers'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'

const Voucher = (): JSX.Element => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const {
    state: { vouchers },
  } = useContext(DashboardContext)

  const { mutate: removeVouchers } = useRemoveVouchers({
    onSuccess: () => {
      enqueueSnackbar(
        String(t(localizationKey.filesRemoved)),
        SNACKBAR_OPTIONS_SUCCESS
      )
      reset()
      queryClient.invalidateQueries(VOUCHERS_KEY)
    },
    onError: (e) => {
      enqueueSnackbar(e, SNACKBAR_OPTIONS_ERROR)
    },
  })

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [detailRow, setDetailRow] = useState<GridRowParams>()

  const data =
    vouchers?.map(
      ({ code, id, expiration }) =>
        ({
          id,
          code,
          expiration,
        } as VoucherType)
    ) ?? []

  const reset = () => {
    setSelectionModel([])
    setSelectedRows([])
  }

  const removeData = () => {
    removeVouchers({ ids: selectedRows })
  }

  const selectionChanged = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails
  ) => {
    setSelectionModel(selectionModel)
    setSelectedRows(selectionModel.map((item, index) => data[index].id))
  }

  const onRowClick = (details: GridRowParams) => {
    setDetailRow(details)
  }

  const buttonText = `(${selectedRows.length}) ${String(
    t(localizationKey.removeAll)
  )}`

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <h3>{String(t(localizationKey.code))}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.rowContainer}>
          <DataGrid
            className={styles.contentTable}
            rows={data}
            columns={getColumns()}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={selectionModel}
            onSelectionModelChange={selectionChanged}
            onRowClick={onRowClick}
            autoHeight
          />
          <VoucherDetail detail={detailRow?.row} />
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
