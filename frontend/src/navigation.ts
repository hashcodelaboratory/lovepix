import { Pages } from 'constants/pages/urls'
import * as PagesTitles from './constants/pages/titles'
import * as SettingsTitles from './constants/settings/titles'

const pages = [
  { title: PagesTitles.GALLERY, link: Pages.GALLERY },
  { title: PagesTitles.ESHOP, link: Pages.ESHOP },
  { title: PagesTitles.MATERIALS, link: Pages.MATERIALS },
  // TODO: uncomment in future usage
  // { title: PagesTitles.FOR_PARTNERS, link: Pages.FOR_PARTNERS },
  // { title: PagesTitles.ABOUT_US, link: Pages.ABOUT_US },
]

const settings = [
  // TODO: uncomment in future usage
  // { title: SettingsTitles.PROFILE, link: Pages.PROFILE },
  // { title: SettingsTitles.ACCOUNT, link: Pages.ACCOUNT },
  { title: SettingsTitles.DASHBOARD, link: Pages.DASHBOARD },
  { title: SettingsTitles.LOGOUT, link: undefined, callBack: true },
]

const menuItems = [
  { title: PagesTitles.CONFIGURATOR, link: Pages.CONFIGURATOR },
  { title: PagesTitles.GALLERY, link: Pages.GALLERY },
  { title: PagesTitles.ESHOP, link: Pages.ESHOP },
  { title: PagesTitles.ABOUT_US, link: Pages.ABOUT_US },
  { title: PagesTitles.CONTACT, link: Pages.CONTACT },
]

const appBarLeftItems = [{ title: PagesTitles.GALLERY, link: Pages.GALLERY }]

const appBarRightItems = [
  { title: PagesTitles.ESHOP, link: Pages.ESHOP },
  { title: PagesTitles.ABOUT_US, link: Pages.ABOUT_US },
  { title: PagesTitles.CONTACT, link: Pages.CONTACT },
]

export { pages, settings, menuItems, appBarLeftItems, appBarRightItems }
