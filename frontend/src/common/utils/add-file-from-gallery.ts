import { getBlob, ref } from '@firebase/storage'
import { storage } from '../firebase/config'
import { ImageAddType } from 'common/types/image-add-type'
import { addImageToConfigurator } from './add-image-to-configurator'
import { getNormalizedFile } from '../../utils/get-normailized-file'
import { isIosSafari } from '../../utils/is-ios-safari'

export type AddGalleryType = {
  path: string
  id?: string
}

export const addImageFromGallery = async (path: string, id?: string) => {
  const file = await getBlob(ref(storage, path))
  const fr = new FileReader()
  // issue reference: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/CreatingContentforSafarioniPhone/CreatingContentforSafarioniPhone.html
  if (isIosSafari()) {
    const normalizedFile = await getNormalizedFile(file)

    fr.readAsDataURL(normalizedFile)
  } else {
    fr.readAsDataURL(file)
  }

  fr.onload = () => {
    const imageData: ImageAddType = {
      origin: fr.result as string,
      galleryItemId: id,
    }
    addImageToConfigurator(imageData)
  }
}
