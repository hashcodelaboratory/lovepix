import { getBlob, ref } from '@firebase/storage'
import { storage } from '../firebase/config'
import { useAddImageToConfigurator } from './add-image-to-configurator'
import { Configuration, ImageUpdateType } from 'common/types/configuration'

export const useAddFileFromGallery = (configuration: Configuration) => {
  const { addImage } = useAddImageToConfigurator(configuration)
  const addToGallery = async (path: string, id?: string) => {
    const file = await getBlob(ref(storage, path))
    const fr = new FileReader()
    fr.readAsDataURL(file)

    fr.onload = () => {
      const imageData: ImageUpdateType = {
        origin: fr.result as string,
        galleryItemId: id,
      }

      addImage(imageData)
    }
  }

  return { addToGallery }
}
