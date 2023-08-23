import { Configuration } from 'common/types/configuration'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ValidationContext } from 'screens-content/validation-provider/validationProvider'
import { configurationsTable } from '../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { Pages } from 'constants/pages/urls'
import { localizationKey } from 'localization/localization-key'

export const useAddImageToConfigurator = (
  configuratorData: Configuration | undefined
) => {
  const { t } = useTranslation()
  const router = useRouter()
  const validation = useContext(ValidationContext)

  let state: string = ''
  if (!configuratorData) state = 'NO_CONFIG'
  else if (!configuratorData.origin) state = 'NO_IMAGE'
  else state = 'FULL'

  const addImage = (imageData: object) => {
    const callback = (value: boolean) => {
      console.log(value)
      if (value) {
        configurationsTable.update(CONFIGURATION_TABLE_KEY, imageData)
        router.push(t(Pages.CONFIGURATOR))
      }
    }

    switch (state) {
      case 'NO_CONFIG':
        configurationsTable.add(imageData, CONFIGURATION_TABLE_KEY)
        router.push(t(Pages.CONFIGURATOR))
        break
      case 'NO_IMAGE':
        configurationsTable.update(CONFIGURATION_TABLE_KEY, imageData)
        router.push(t(Pages.CONFIGURATOR))
        break
      case 'FULL':
        validation.validateFunction(
          localizationKey.imageInConfiguratorTitle,
          localizationKey.imageInConfiguratorDescription,
          callback,
          true
        )
    }
  }

  return { addImage }
}
