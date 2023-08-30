import { Configuration } from 'common/types/configuration'
import { ImageAddType } from 'common/types/image-add-type'
import { configurationsTable } from '../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'

export const canAddImage = (configuration: Configuration | undefined) => {
  if (!configuration || !configuration.origin) {
    return false
  }
  return true
}

export const addImageToConfigurator = (imageData: ImageAddType) => {
  configurationsTable.clear()
  configurationsTable.add(imageData, CONFIGURATION_TABLE_KEY)
}
