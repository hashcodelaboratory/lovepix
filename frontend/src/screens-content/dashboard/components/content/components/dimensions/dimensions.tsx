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
import { useState } from 'react'
import {
  DIMENSIONS_KEY,
  useDimensions,
} from '../../../../../../common/api/use-dimensions'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'
import { getDimensionsColumns } from '../utils/columns/dimensions-columns'
import { AddCircle } from '@mui/icons-material'
import { removeDimensions } from '../../../../api/dimensions/remove-dimensions'
import AddDimensionModal from './components/modal/add-dimension-modal'
import { useUpdateDimension } from '../../../../api/dimensions/update-dimension'

const DimensionsLayout = (): JSX.Element => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { data: dimensions = [] } = useDimensions()
  const { mutate: updateDimension } = useUpdateDimension({
    onSuccess: (res) => {
      if (res.error) {
        enqueueSnackbar(res.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        enqueueSnackbar(
          String(t(localizationKey.added)),
          SNACKBAR_OPTIONS_SUCCESS
        )
        queryClient.invalidateQueries(DIMENSIONS_KEY)
        close()
      }
    },
  })

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [detailRow, setDetailRow] = useState<GridRowParams>()

  const [open, setOpen] = useState(false)

  const reset = () => {
    setSelectionModel([])
    setSelectedRows([])
  }

  const removeData = async () => {
    try {
      await removeDimensions(selectedRows, queryClient)
      enqueueSnackbar(
        String(t(localizationKey.filesRemoved)),
        SNACKBAR_OPTIONS_SUCCESS
      )
      reset()
    } catch (error) {
      enqueueSnackbar((error as Error).message, SNACKBAR_OPTIONS_ERROR)
    }
  }

  const selectionChanged = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails
  ) => {
    setSelectionModel(selectionModel)
    setSelectedRows(selectionModel.map((item, index) => dimensions[index].name))
  }

  const onRowClick = (details: GridRowParams) => {
    setDetailRow(details)
  }

  const buttonText = `(${selectedRows.length}) ${String(
    t(localizationKey.removeAll)
  )}`

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onCellEditCommit = (params: any) => {
    updateDimension({
      id: params.id.toString(),
      price: {
        ...params.row.price,
        [params.field.replace('price.', '')]: Number(params.value),
      },
    })
  }

  return (
    <div className={styles.contentContainer}>
      <h3>{t(localizationKey.dimensions)}</h3>
      <div className={styles.rowContainer}>
        <DataGrid
          className={styles.contentTable}
          rows={dimensions}
          columns={getDimensionsColumns(t)}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={selectionChanged}
          onCellEditCommit={onCellEditCommit}
          onRowClick={onRowClick}
          autoHeight
        />
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
        <button className={styles.removeButton} onClick={handleClickOpen}>
          {t(localizationKey.add)}
          <AddCircle sx={{ marginLeft: 1 }} />
        </button>
      </div>
      <AddDimensionModal isOpen={open} close={handleClose} />
    </div>
  )
}

export default DimensionsLayout
