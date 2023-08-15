import { DataGrid, GridRowParams, GridSelectionModel } from '@mui/x-data-grid'
import styles from '../../../../dashboard.module.scss'
import { useState } from 'react'
import { getUploadImagesColumns } from '../utils/columns/upload-images-columns'
import { localizationKey } from '../../../../../../localization/localization-key'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from '../../../../../../snackbar/config'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import { removeUploadedImages } from '../../../../api/gallery/removeUploadedImages'
import GalleryDetail from './detail/gallery-detail'
import { UPLOADED_IMAGES_KEY } from '../../../../api/gallery/useUploadedImages'
import {
  GALLERY_KEY,
  useGallery,
} from '../../../../../../common/api/use-gallery'
import UploaderLayout from './uploader/uploader'

const UploadImagesTable = () => {
  const { data: galleryImages } = useGallery()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [detailRow, setDetailRow] = useState<GridRowParams>()

  const data =
    galleryImages?.map(
      (
        {
          id,
          name,
          url,
          size,
          timeCreated,
          contentType,
          price,
          categories,
          dimensions,
          fullPath,
        },
        index
      ) => ({
        id: index,
        name: name,
        url: url,
        size: size,
        timeCreated: timeCreated,
        contentType: contentType,
        price: price,
        docId: id,
        categories: categories,
        dimensions: dimensions,
        fullPath: fullPath,
      })
    ) ?? []

  const reset = () => {
    setSelectionModel([])
    setSelectedRows([])
  }

  const removeData = async () => {
    const result = removeUploadedImages(selectedRows)
    if (result === '') {
      await queryClient.invalidateQueries(UPLOADED_IMAGES_KEY)
      enqueueSnackbar(
        String(t(localizationKey.filesRemoved)),
        SNACKBAR_OPTIONS_SUCCESS
      )
      reset()
    } else {
      enqueueSnackbar(result, SNACKBAR_OPTIONS_ERROR)
    }
    await queryClient.invalidateQueries(GALLERY_KEY)
  }

  const selectionChanged = (selectionModel: GridSelectionModel) => {
    setSelectionModel(selectionModel)
    setSelectedRows(selectionModel.map((item) => data[item as number].fullPath))
  }

  const buttonText = `(${selectedRows.length}) ${String(
    t(localizationKey.removeAll)
  )}`

  const onRowClick = (details: GridRowParams) => {
    setDetailRow(details)
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.rowContainer}>
        <DataGrid
          className={styles.contentTable}
          rows={data}
          columns={getUploadImagesColumns()}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={selectionChanged}
          onRowClick={onRowClick}
          autoHeight
        />
        <div>
          <GalleryDetail row={detailRow?.row} />
          <UploaderLayout />
        </div>
      </div>
      <button
        className={styles.removeButton}
        onClick={removeData}
        disabled={selectedRows.length === 0}
      >
        {buttonText}
        <DeleteIcon sx={{ marginLeft: 1 }} />
      </button>
    </div>
  )
}

export default UploadImagesTable
