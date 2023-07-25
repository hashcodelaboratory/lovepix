import { ChangeEvent } from 'react'
import { UPLOADED_IMAGES_KEY } from '../../../../../api/gallery/useUploadedImages'
import { useQueryClient } from 'react-query'
import {
  uploadToFirestore,
  uploadToStorage,
} from '../../../../../api/gallery/addUploadedImage'
import { FullMetadata } from '@firebase/storage'
import styles from '../../../../../dashboard.module.scss'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { useDimensions } from '../../../../../../../common/api/use-dimensions'
import { useCategories } from '../../../../../../../common/api/use-categories'

const UploaderLayout = (): JSX.Element => {
  const { data: dimensions = [] } = useDimensions()
  const { data: categories = [] } = useCategories()

  const dim = dimensions.map(({ name }) => name)
  const cat = categories.map(({ name }) => name)

  const queryClient = useQueryClient()

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (file) {
      const res = await uploadToStorage(file)
      await uploadToFirestore(
        res?.metadata ?? ({} as FullMetadata),
        res?.url ?? '',
        [...dim],
        [...cat]
      )
      await queryClient.invalidateQueries(UPLOADED_IMAGES_KEY)
      e.target.value = ''
    }
  }

  return (
    <div className={styles.galleryDetailDropzoneContainer}>
      <input
        type='file'
        id='avatar'
        name='avatar'
        accept='image/png, image/jpeg'
        onChange={onChange}
        className={styles.galleryDetailDropzone}
      />
      <InsertDriveFileIcon className={styles.galleryDetailDropzoneIcon} />
    </div>
  )
}

export default UploaderLayout
