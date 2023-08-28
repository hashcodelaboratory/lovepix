import { getBlob, ref } from '@firebase/storage'
import { storage } from '../firebase/config'
import { useAddImageToConfigurator } from './add-image-to-configurator'
import { Configuration } from 'common/types/configuration'
import { ImageData } from 'common/types/Imagedata'

export const useAddFileFromGallery = (configuration: Configuration) => {
  const { addImage } = useAddImageToConfigurator(configuration)
  const addToGallery = async (path: string, id?: string) => {
    const file = await getBlob(ref(storage, path))
    const fr = new FileReader()
    fr.readAsDataURL(file)

    fr.onload = () => {
      const imageData: ImageData = {
        origin: fr.result as string,
        galleryItemId: id,
      }

      addImage(imageData)
    }
  }

  return { addToGallery }
}
