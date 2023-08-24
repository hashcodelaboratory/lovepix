import { localizationKey } from '../../../../../../localization/localization-key'
import styles from '../../../../dashboard.module.scss'
import {
  DataGrid,
  GridCallbackDetails,
  GridSelectionModel,
} from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { getMaterialsColumns } from '../utils/columns/materials-columns'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import { useSnackbar } from 'notistack'
import {
  MATERIALS_KEY,
  MaterialType,
  useMaterials,
} from 'common/api/use-materials'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useEditMaterial } from '../../../../api/materials/edit-material'

const MaterialsLayout = (): JSX.Element => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { data: materials = [] } = useMaterials()

  const availableMaterials = materials
    .filter((material) => material.availability == true)
    .map((material) => material.id)

  const { mutate: editMaterial } = useEditMaterial({
    onSuccess: (res) => {
      if (res.error) {
        enqueueSnackbar(res.error, SNACKBAR_OPTIONS_ERROR)
      } else {
        enqueueSnackbar(
          String(t(localizationKey.added)),
          SNACKBAR_OPTIONS_SUCCESS
        )
        toggleButton()
        queryClient.invalidateQueries(MATERIALS_KEY)
      }
    },
  })

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] =
    useState<GridSelectionModel>(availableMaterials)

  const [dialogStatus, setDialogStatus] = useState(false)

  const data =
    materials?.map(
      ({ id, title }) =>
        ({
          id: id,
          title: title,
        } as MaterialType)
    ) ?? []

  const selectionChanged = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails
  ) => {
    setSelectionModel(selectionModel)
    setSelectedRows(selectionModel.map((item, index) => data[index].title))
  }

  const toggleButton = () => setDialogStatus((prevState) => !prevState)

  const uploadToFirestore = async (item: MaterialType, available: boolean) => {
    editMaterial({ id: item.id, availability: available })
  }
  const saveChanges = () => {
    data.map((item) =>
      selectionModel.includes(item.id)
        ? uploadToFirestore(item, true)
        : uploadToFirestore(item, false)
    )
    toggleButton()
  }

  useEffect(() => {
    if (selectionModel.length == 0) {
      setSelectionModel(availableMaterials)
    }
  }, [availableMaterials, selectionModel.length])

  return (
    <div className={styles.contentContainer}>
      <div className={styles.rowContainer}>
        <DataGrid
          className={styles.contentTable}
          rows={data}
          columns={getMaterialsColumns(t)}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={selectionChanged}
          autoHeight
        />
      </div>

      <div className={styles.rowContainer}>
        <button className={styles.removeButton} onClick={toggleButton}>
          {t(localizationKey.saveChanges)}
        </button>
        <Dialog open={dialogStatus} onClose={toggleButton}>
          <DialogContent>
            <DialogContentText>
              {t(localizationKey.changeValidation)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleButton}>{t(localizationKey.no)}</Button>
            <Button onClick={saveChanges}>{t(localizationKey.yes)}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default MaterialsLayout
