import { Configuration } from 'common/types/configuration'
import { ImageAddType } from 'common/types/image-add-type'
import { configurationsTable } from '../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { Material } from '../enums/material'

export const canAddImage = (configuration?: Configuration) =>
  !!(!configuration || !configuration.origin)

export const addImageToConfigurator = (imageData: ImageAddType) => {
  configurationsTable.clear()
  configurationsTable.update(CONFIGURATION_TABLE_KEY, imageData)
}
