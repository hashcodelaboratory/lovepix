import { Route } from 'common/enums/routes'
import { localizationKey } from '../../../../../localization/localization-key'

export const SIDEBAR_MENU_LIST: {
  title: string
  link: string
}[] = [
  {
    title: localizationKey.home,
    link: Route.DASHBOARD,
  },
  {
    title: localizationKey.orders,
    link: '',
  },
  {
    title: localizationKey.products,
    link: Route.DASHBOARD_PRODUCTS,
  },
  {
    title: localizationKey.dimensions,
    link: '',
  },
  {
    title: localizationKey.categories,
    link: '',
  },
  {
    title: localizationKey.storage,
    link: '',
  },
]
