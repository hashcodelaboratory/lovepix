import { Route } from 'common/enums/routes'
import { messages } from '../../../../../messages/messages'

export const SIDEBAR_MENU_LIST: {
  title: string
  link: string
}[] = [
  {
    title: messages.home,
    link: Route.DASHBOARD,
  },
  {
    title: messages.orders,
    link: '',
  },
  {
    title: messages.products,
    link: Route.DASHBOARD_PRODUCTS,
  },
  {
    title: messages.dimensions,
    link: '',
  },
  {
    title: messages.categories,
    link: '',
  },
  {
    title: messages.storage,
    link: '',
  },
]
