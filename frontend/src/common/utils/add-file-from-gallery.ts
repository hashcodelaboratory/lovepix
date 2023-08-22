import { getBlob, ref } from '@firebase/storage'
import { storage } from '../firebase/config'
import { addImageToConfigurator } from './add-image-to-configurator'
import { ValidationContextType } from 'screens-content/validation-provider/validationProvider'
import { NextRouter } from 'next/router'
import { Configuration } from 'common/types/configuration'
import { Pages } from 'constants/pages/urls'
import { TFunction } from 'next-i18next'

export const addFileFromGallery = async (
  path: string,
  configuration: Configuration,
  validation: ValidationContextType,
  t?: any,
  router?: NextRouter,
  id?: string
) => {
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

    addImageToConfigurator(configuration, data, validation, t, router)
  }
}
