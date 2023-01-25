import {
  DataGrid,
  GridCallbackDetails,
  GridSelectionModel,
} from '@mui/x-data-grid'
import styles from '../../../../dashboard.module.scss'
import { useContext, useState } from 'react'
import DashboardContext from '../../../../context/dashboard-context'
import { UPLOADED_IMAGES_COLUMNS } from './utils/columns'
import { messages } from '../../../../../../messages/messages'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import { removeUploadedImages } from './utils/removeUploadedImages'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const StorageTable = () => {
  const {
    state: { uploadedImages },
  } = useContext(DashboardContext)

  const { enqueueSnackbar } = useSnackbar()

  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])

  const data = uploadedImages.map(({ bucket, name, fullPath }, index) => ({
    id: index + 1,
    bucket: bucket,
    order: name,
  }))

  const reset = () => {
    setSelectionModel([])
    setSelectedRows([])
  }

  const removeData = () => {
    const result = removeUploadedImages(selectedRows, queryClient)
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
    setSelectedRows(selectionModel.map((item, index) => data[index].order))
  }

  const buttonText = `(${selectedRows.length}) ${String(t(messages.removeAll))}`

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <h1>{String(t(messages.storage))}</h1>
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid
          className={styles.contentTable}
          rows={data}
          columns={UPLOADED_IMAGES_COLUMNS}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={selectionChanged}
          autoHeight
        />
        <button
          className={styles.removeButton}
          onClick={removeData}
          disabled={selectedRows.length === 0}
        >
          {buttonText}
          <DeleteIcon sx={{ marginLeft: 1 }} />
        </button>
      </AccordionDetails>
    </Accordion>
  )
}

export default StorageTable
