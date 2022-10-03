import * as PagesUrls from "./constants/pages/urls";
import * as PagesTitles from "./constants/pages/titles";
import * as SettingsTitles from "./constants/settings/titles";
import * as SettingsUrls from "./constants/settings/urls";

const pages = [
  // {title: 'Configurator', link: '/configurator'},
  {title: PagesTitles.GALLERY, link: PagesUrls.GALLERY},
  {title: PagesTitles.MATERIALS, link: PagesUrls.MATERIALS},
  {title: PagesTitles.FOR_PARTNERS, link: PagesUrls.FOR_PARTNERS},
  {title: PagesTitles.ABOUT_US, link: PagesUrls.ABOUT_US},
  {title: PagesTitles.SHOPPING_CART, link: PagesUrls.SHOPPING_CART},
];

const settings = [
  {title: SettingsTitles.PROFILE, link: SettingsUrls.PROFILE},
  {title: SettingsTitles.ACCOUNT, link: SettingsUrls.ACCOUNT},
  {title: SettingsTitles.DASHBOARD, link: SettingsUrls.DASHBOARD},
  {title: SettingsTitles.LOGOUT, link: ''}
];

export { pages, settings }