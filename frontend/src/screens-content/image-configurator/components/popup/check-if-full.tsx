import configurator_full_popup from './configurator-full-popup'
import { configurationsTable } from '../../../../../database.config'
import { CONFIGURATION_TABLE_KEY } from 'common/indexed-db/hooks/keys'
import { datatype } from 'common/types/data'
import { Configuration } from 'common/types/configuration'
import { NextRouter } from 'next/router'
import { Pages } from 'constants/pages/urls'

const check_if_full = (
  data: datatype,
  configuration: Configuration,
  router: NextRouter
) => {
  const gotoConfigurator = () => {
    router.push(Pages.CONFIGURATOR)
  }

  if (configuration == undefined) {
    configurationsTable.add(data, CONFIGURATION_TABLE_KEY)
    gotoConfigurator()
    return
  } else {
    return configurator_full_popup(data, router)
  }
}
export default check_if_full
