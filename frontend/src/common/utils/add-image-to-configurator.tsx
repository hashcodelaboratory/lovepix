import { Configuration } from 'common/types/configuration'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ConfirmationDialogContext } from 'screens-content/confirmation-dialog-provider/confirmationDialogProvider'
import { configurationsTable } from '../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { Pages } from 'constants/pages/urls'
import { localizationKey } from 'localization/localization-key'
import Link from 'next/link'

export const useAddImageToConfigurator = (
  configuratorData: Configuration | undefined
) => {
  const { t } = useTranslation()
  const router = useRouter()
  const confirmation = useContext(ConfirmationDialogContext)

  let state: string = ''
  if (!configuratorData) state = 'NO_CONFIG'
  else if (!configuratorData.origin) state = 'NO_IMAGE'
  else state = 'FULL'
  console.log(configuratorData)
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
        confirmation.confirmFunction(
          t(localizationKey.imageInConfiguratorTitle),
          <>
            {t(localizationKey.imageInConfiguratorDescription)}
            {
              <Link href={t(Pages.CONFIGURATOR)}>
                {t(localizationKey.imageInConfiguratorLink)}
              </Link>
            }
            .
          </>,
          callback,
          true
        )
    }
  }

  return { addImage }
}
