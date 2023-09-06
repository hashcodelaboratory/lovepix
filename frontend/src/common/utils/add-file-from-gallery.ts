import { getBlob, ref } from '@firebase/storage'
import { storage } from '../firebase/config'
import { configurationsTable } from '../../../database.config'
import { CONFIGURATION_TABLE_KEY } from '../indexed-db/hooks/keys'

export const addFileFromGallery = async (path: string, id?: string) => {
  const file = await getBlob(ref(storage, path))

  const fr = new FileReader()
  fr.readAsDataURL(file)

  fr.onload = () => {
    const data = {
      origin: fr.result as string,
      image: undefined,
      dimensionId: undefined,
      material: undefined,
      galleryItemId: id,
    }

    configurationsTable.put(data, CONFIGURATION_TABLE_KEY)
  }
}
