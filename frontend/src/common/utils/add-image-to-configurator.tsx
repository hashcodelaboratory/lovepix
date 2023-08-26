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

enum CONFIG_STATE {
  NO_CONFIG,
  NO_IMAGE,
  FULL,
}

export const useAddImageToConfigurator = (
  configuratorData: Configuration | undefined
) => {
  const { t } = useTranslation()
  const router = useRouter()
  const confirmation = useContext(ConfirmationDialogContext)

  let configState: CONFIG_STATE
  if (!configuratorData) {
    configState = CONFIG_STATE.NO_CONFIG
  } else if (!configuratorData.origin) {
    configState = CONFIG_STATE.NO_IMAGE
  } else {
    configState = CONFIG_STATE.FULL
  }

  const addImage = (imageData: object) => {
    const callback = (value: boolean) => {
      if (value) {
        configurationsTable.update(CONFIGURATION_TABLE_KEY, imageData)
        router.push(t(Pages.CONFIGURATOR))
      }
    }

    switch (configState) {
      case CONFIG_STATE.NO_CONFIG:
        configurationsTable.add(imageData, CONFIGURATION_TABLE_KEY)
        router.push(t(Pages.CONFIGURATOR))
        break
      case CONFIG_STATE.NO_IMAGE:
        configurationsTable.update(CONFIGURATION_TABLE_KEY, imageData)
        router.push(t(Pages.CONFIGURATOR))
        break
      case CONFIG_STATE.FULL:
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
