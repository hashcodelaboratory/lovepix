import { DashboardRoutes, Route } from 'common/enums/routes'
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
    link: DashboardRoutes.PRODUCTS,
  },
  {
    title: localizationKey.storage,
    link: '',
  },
  {
    title: localizationKey.dimensions,
    link: DashboardRoutes.DIMENSIONS,
  },
  {
    title: localizationKey.categories,
    link: DashboardRoutes.CATEGORIES,
  },
  {
    title: 'Kategórie e-shop',
    link: DashboardRoutes.CATEGORIES_ESHOP,
  },
  {
    title: localizationKey.code,
    link: DashboardRoutes.VOUCHERS,
  },
]
