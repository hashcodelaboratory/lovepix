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
import { useState, useEffect } from 'react'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'
import { getMaterialsColumns } from '../utils/columns/materials-columns'
import { AddCircle, CheckBox } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { doc, setDoc, updateDoc } from '@firebase/firestore'
import { database } from '../../../../../../common/firebase/config'
import { Collections } from '../../../../../../common/firebase/enums'

import { MATERIALS_KEY, MaterialType, useMaterials } from 'common/api/use-materials'


import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Checkbox } from '@mui/material'

const MaterialsLayout = (): JSX.Element => {
  const { t } = useTranslation()
  // const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { data: materials = [] } = useMaterials()

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [detailRow, setDetailRow] = useState<GridRowParams>()

  const [materialsLabel, setmaterialsLabel] = useState<string>()

  const [open, setOpen] = useState(false)

  const data =
    materials?.map(
      ({ id, title }) =>
        ({
          id: id,
          title: title,
        } as MaterialType)
    ) ?? []
  
  const reset = () => {
    setSelectionModel([])
    setSelectedRows([])
  }

  const selectionChanged = (
    selectionModel: GridSelectionModel,
    // details: GridCallbackDetails
  ) => {
    setSelectionModel(selectionModel)
    setSelectedRows(selectionModel.map((item, index) => data[index].title))
  }

  const onRowClick = (details: GridRowParams) => {
    setDetailRow(details)
  }


  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  const uploadToFirestore = async ( item:MaterialType, available:boolean ) => {
    await updateDoc(
      doc(database, Collections.MATERIALS, item.id),
      {
        availability: available,
      }
    )
    queryClient.invalidateQueries(MATERIALS_KEY)
    handleClose()
  }
  const saveChanges = () => {
    data.map(item => selectionModel.includes(item.id) ? uploadToFirestore(item, true) : uploadToFirestore(item, false))
    handleClose()
  }


  return (
    <div className={styles.contentContainer}>
      <div className={styles.rowContainer}>
        <DataGrid
          className={styles.contentTable}
          rows={data}
          // columns={columns}
          columns={getMaterialsColumns(t(localizationKey.materials))}
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
          onClick={handleClickOpen}
        >
          {t(localizationKey.saveChanges)}
        </button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>
              Naozaj chcete uložiť vykonané zmeny?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Nie</Button>
            <Button onClick={saveChanges}>Áno</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default MaterialsLayout