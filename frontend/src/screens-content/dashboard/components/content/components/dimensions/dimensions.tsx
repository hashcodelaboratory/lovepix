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
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { doc, setDoc } from '@firebase/firestore'
import { database } from '../../../../../../common/firebase/config'
import { Collections } from '../../../../../../common/firebase/enums'
import { removeDimensions } from '../../../../api/dimensions/removeDimensions'

const DimensionsLayout = (): JSX.Element => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { data: dimensions = [] } = useDimensions()

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [detailRow, setDetailRow] = useState<GridRowParams>()

  const [open, setOpen] = useState(false)
  const [dimensionLabel, setDimensionLabel] = useState<string>()

  const data =
    dimensions?.map(
      ({ id, name }) =>
        ({
          id: id,
          name: name,
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

  const uploadToFirestore = async () => {
    await setDoc(
      doc(database, Collections.DIMENSIONS, `DIM-${dimensionLabel?.trim()}`),
      {
        name: dimensionLabel,
      }
    )
    queryClient.invalidateQueries(DIMENSIONS_KEY)
    handleClose()
  }

  return (
    <div className={styles.contentContainer}>
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
          ADD
          <AddCircle sx={{ marginLeft: 1 }} />
        </button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t(localizationKey.dimensions)}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pridajte rozmer, ktory chcete pouzivat v aplikacii
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Rozmer'
              value={dimensionLabel}
              type='text'
              fullWidth
              variant='standard'
              onChange={(e) => {
                setDimensionLabel(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={uploadToFirestore}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default DimensionsLayout
