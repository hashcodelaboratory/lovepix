import { Configuration } from 'common/types/configuration'
import { ValidationContextType } from 'screens-content/validation-provider/validationProvider'
import { configurationsTable } from '../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { NextRouter } from 'next/router'
import { Pages } from 'constants/pages/urls'

// for this to work you need validation function from ValidationContext
export const addImageToConfigurator = async (
  current: Configuration | undefined,
  imageData: object,
  validation: ValidationContextType,
  router?: NextRouter
) => {
  const checkFunction = async () => {
    if (!current) return true
    if (!current.origin) return true
    return validation.validateFunction(
      'More than 1 image',
      'There is already an image in the configurator\nWould you like to replace it?',
      true
    )
  }
  let check = await checkFunction()
  if (!check) return
  if (!current) configurationsTable.add(imageData, CONFIGURATION_TABLE_KEY)
  else configurationsTable.update(CONFIGURATION_TABLE_KEY, imageData)
  router?.push(Pages.CONFIGURATOR)
}
