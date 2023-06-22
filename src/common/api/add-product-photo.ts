import { StorageFolder } from 'common/firebase/storage/enums'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { storage } from 'common/firebase/config'

export const uploadToStorage = async (file: File) => {
  const _name = `${StorageFolder.PRODUCTS}/${file.name}`
  const imageRef = ref(storage, _name)
  const { metadata } = await uploadBytes(imageRef, file)
  if (metadata) {
    const url = await getDownloadURL(ref(storage, _name))
    return {
      url: url,
      metadata: metadata,
    }
  }
}
