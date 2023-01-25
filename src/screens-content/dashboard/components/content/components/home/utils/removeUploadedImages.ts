import { ref, deleteObject, listAll } from '@firebase/storage'
import { storage } from '../../../../../../../common/firebase/config'
import { UPLOADED_IMAGES_KEY } from '../../../../../api/uploadedImages'
import { QueryClient } from 'react-query'
import { StorageFolder } from '../../../../../../../common/firebase/storage/enums'

export const removeUploadedImages = (
  selectedRows: string[],
  queryClient: QueryClient
): string => {
  selectedRows.forEach((row) => {
    const desertRef = ref(storage, `${StorageFolder.ORDERS}/${row}`)

    listAll(desertRef).then((promise) => {
      promise.items.forEach((item) => {
        deleteObject(ref(storage, item.fullPath))
          .then(() => {
            queryClient.invalidateQueries(UPLOADED_IMAGES_KEY)
          })
          .catch((err) => {
            return err
          })
      })
    })
  })
  return ''
}
