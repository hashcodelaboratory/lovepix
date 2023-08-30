import { getBlob, ref } from '@firebase/storage'
import { storage } from '../firebase/config'
import { ImageAddType } from 'common/types/image-add-type'
import { addImageToConfigurator } from './add-image-to-configurator'

export type addGalleryType = {
  path: string
  id?: string
}

export const addImageFromGallery = async (path: string, id?: string) => {
  const file = await getBlob(ref(storage, path))
  const fr = new FileReader()
  fr.readAsDataURL(file)

  fr.onload = () => {
    const imageData: ImageAddType = {
      origin: fr.result as string,
      galleryItemId: id,
    }
    console.log(imageData)
    addImageToConfigurator(imageData)
  }
}
