import { Pages } from 'constants/pages/urls'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const useNavigation = () => {
  const { push } = useRouter()
  const { t } = useTranslation()
  const navigateToConfigurator = () => push(t(Pages.CONFIGURATOR))

  return {
    navigateToConfigurator,
  }
}

export default useNavigation
