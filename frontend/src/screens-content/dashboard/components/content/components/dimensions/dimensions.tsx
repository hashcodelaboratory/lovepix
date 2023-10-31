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
  DimensionType,
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
import { removeDimensions } from '../../../../api/dimensions/removeDimensions'
import AddDimensionModal from './components/modal/add-dimension-modal'

const DimensionsLayout = (): JSX.Element => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { data: dimensions = [] } = useDimensions()

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [detailRow, setDetailRow] = useState<GridRowParams>()

  const [open, setOpen] = useState(false)

  const data =
    dimensions?.map(
      ({ id, name }) =>
        ({
          id: id,
          name: name,
          [`price${localizationKey.photoCanvasTitle}`]: 0,
          [`price${localizationKey.photoAcrylicTitle}`]: 0,
          [`price${localizationKey.photoAluminumTitle}`]: 0,
          [`price${localizationKey.photoPosterTitle}`]: 0,
        } as DimensionType)
    ) ?? []

  const reset = () => {
    setSelectionModel([])
    setSelectedRows([])
  }

  const removeData = () => {
    const result = removeDimensions(selectedRows, queryClient)
    if (result === '') {
      enqueueSnackbar(
        String(t(localizationKey.filesRemoved)),
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

  const buttonText = `(${selectedRows.length}) ${String(
    t(localizationKey.removeAll)
  )}`

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={styles.contentContainer}>
      <h3>{t(localizationKey.dimensions)}</h3>
      <div className={styles.rowContainer}>
        <DataGrid
          className={styles.contentTable}
          rows={data}
          columns={getDimensionsColumns(t)}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={selectionChanged}
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
        <button
          className={styles.removeButton}
          onClick={handleClickOpen}
          // disabled={selectedRows.length === 0}
        >
          Pridať
          <AddCircle sx={{ marginLeft: 1 }} />
        </button>
      </div>
      <AddDimensionModal isOpen={open} close={handleClose} />
    </div>
  )
}

export default DimensionsLayout
