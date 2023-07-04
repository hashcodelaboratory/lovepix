import * as PagesUrls from './constants/pages/urls'
import * as PagesTitles from './constants/pages/titles'
import * as SettingsTitles from './constants/settings/titles'
import * as SettingsUrls from './constants/settings/urls'

const pages = [
  { title: PagesTitles.GALLERY, link: PagesUrls.GALLERY },
  { title: PagesTitles.ESHOP, link: PagesUrls.ESHOP },
  // TODO: uncomment in future usage
  // { title: PagesTitles.MATERIALS, link: PagesUrls.MATERIALS },
  // { title: PagesTitles.FOR_PARTNERS, link: PagesUrls.FOR_PARTNERS },
  // { title: PagesTitles.ABOUT_US, link: PagesUrls.ABOUT_US },
]

const settings = [
  // TODO: uncomment in future usage
  // { title: SettingsTitles.PROFILE, link: SettingsUrls.PROFILE },
  // { title: SettingsTitles.ACCOUNT, link: SettingsUrls.ACCOUNT },
  { title: SettingsTitles.DASHBOARD, link: SettingsUrls.DASHBOARD },
  { title: SettingsTitles.LOGOUT, link: '', callBack: true },
]

export { pages, settings }
