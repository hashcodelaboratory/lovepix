import { TFunction, useTranslation } from 'next-i18next'
import { configurationsTable } from '../../../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { localizationKey } from 'localization/localization-key'
import { datatype } from 'common/types/data'
import { NextRouter } from 'next/router'
import { Pages } from 'constants/pages/urls'

const configurator_full_popup = (data: datatype, router: NextRouter) => {
  const gotoConfigurator = () => {
    router.push(Pages.CONFIGURATOR)
  }

  const changeConfiguratorImage = () => {
    configurationsTable.clear()
    configurationsTable.add(data, CONFIGURATION_TABLE_KEY)
    gotoConfigurator()
  }

  function confirmFunction() {
    if (
      confirm(
        'Vyzerá, že už v konfigurátori máte obrázok, chcely by ste ho odstrániť a vymeniť za tento ?'
      ) === true
    ) {
      changeConfiguratorImage()
      return
    } else {
      return
    }
  }
  confirmFunction()
}
export default configurator_full_popup
