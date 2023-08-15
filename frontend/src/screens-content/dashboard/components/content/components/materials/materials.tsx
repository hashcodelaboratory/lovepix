import { localizationKey } from '../../../../../../localization/localization-key'
import styles from '../../../../dashboard.module.scss'
import {
  DataGrid,
  GridCallbackDetails,
  GridRowParams,
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
import { doc, updateDoc } from '@firebase/firestore'
import { database } from '../../../../../../common/firebase/config'
import { Collections } from '../../../../../../common/firebase/enums'
import { useSnackbar } from 'notistack'
import {
  MATERIALS_KEY,
  MaterialType,
  useMaterials,
} from 'common/api/use-materials'

const MaterialsLayout = (): JSX.Element => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { data: materials = [] } = useMaterials()

  const availableMaterials = materials
    .filter((material) => material.availability == true)
    .map((material) => material.id)

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

  const toggleButton = () => setDialogStatus(!dialogStatus)

  const uploadToFirestore = async (item: MaterialType, available: boolean) => {
    await updateDoc(doc(database, Collections.MATERIALS, item.id), {
      availability: available,
    })
    queryClient.invalidateQueries(MATERIALS_KEY)
    toggleButton()
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
  }, [availableMaterials])

  return (
    <div className={styles.contentContainer}>
      <div className={styles.rowContainer}>
        <DataGrid
          className={styles.contentTable}
          rows={data}
          columns={getMaterialsColumns(t(localizationKey.materials))}
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
