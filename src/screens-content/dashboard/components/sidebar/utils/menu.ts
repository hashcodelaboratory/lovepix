import { messages } from '../../../../../messages/messages'

export const SIDEBAR_MENU_LIST: {
  title: string
  link: string
}[] = [
  {
    title: messages.home,
    link: '/dashboard',
  },
  {
    title: messages.orders,
    link: '',
  },
  {
    title: messages.products,
    link: '/dashboard/product',
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
