import {Pages} from "constants/pages/urls"
import {localizationKey} from "./localization-key";

type Metadata = {
  titleKey: string,
  descriptionKey: string
}

export const metadata: Record<Pages, Metadata> = {
  [Pages.PROFILE]: {
    titleKey: localizationKey.metaTitleProfile,
    descriptionKey: localizationKey.metaDescriptionProfile
  },
  [Pages.ACCOUNT]: {
    titleKey: localizationKey.metaTitleAccount,
    descriptionKey: localizationKey.metaDescriptionAccount
  },
  [Pages.DASHBOARD]: {
    titleKey: localizationKey.metaTitleDashboard,
    descriptionKey: localizationKey.metaDescriptionDashboard
  },
  [Pages.DEBUG]: {
    titleKey: localizationKey.metaTitleDebug,
    descriptionKey: localizationKey.metaDescriptionDebug
  },
  [Pages.HOME]: {
    titleKey: localizationKey.metaTitleHome,
    descriptionKey: localizationKey.metaDescriptionIndex
  },
  [Pages.GALLERY]: {
    titleKey: localizationKey.metaTitleGallery,
    descriptionKey: localizationKey.metaDescriptionGallery
  },
  [Pages.MATERIALS]: {
    titleKey: localizationKey.metaTitleMaterials,
    descriptionKey: localizationKey.metaDescriptionMaterials
  },
  [Pages.ABOUT_US]: {
    titleKey: localizationKey.metaTitleAboutUs,
    descriptionKey: localizationKey.metaDescriptionAboutUs
  },
  [Pages.FOR_PARTNERS]: {
    titleKey: localizationKey.metaTitleForPartners,
    descriptionKey: localizationKey.metaDescriptionForPartners
  },
  [Pages.SHOPPING_CART]: {
    titleKey: localizationKey.metaTitleShoppingCart,
    descriptionKey: localizationKey.metaDescriptionShoppingCart
  },
  [Pages.CONFIGURATOR]: {
    titleKey: localizationKey.metaTitleConfigurator,
    descriptionKey: localizationKey.metaDescriptionConfigurator
  },
  [Pages.ESHOP]: {
    titleKey: localizationKey.metaTitleEShop,
    descriptionKey: localizationKey.metaDescriptionEShop
  },
  [Pages.THANKS]: {
    titleKey: localizationKey.metaTitleThankYou,
    descriptionKey: localizationKey.metaDescriptionThankYou
  },
  [Pages.OUR_CONTACTS]: {
    titleKey: localizationKey.metaTitleContact,
    descriptionKey: localizationKey.metaDescriptionContact
  },
  [Pages.COOKIES]: {
    titleKey: localizationKey.metaTitleCookies,
    descriptionKey: localizationKey.metaDescriptionCookies
  },
  [Pages.PRIVACY_POLICY]: {
    titleKey: localizationKey.metaTitlePrivacyPolicy,
    descriptionKey: localizationKey.metaDescriptionPrivacyPolicy
  },
  [Pages.CONDITIONS]: {
    titleKey: localizationKey.metaTitleConditions,
    descriptionKey: localizationKey.metaDescriptionConditions
  },
  [Pages.CONTACT]: {
    titleKey: localizationKey.metaTitleContact,
    descriptionKey: localizationKey.metaDescriptionContact
  },
  [Pages.DOWNLOAD]: {
    titleKey: localizationKey.metaTitleDownload,
    descriptionKey: localizationKey.metaDescriptionDownload
  },
  [Pages.BLOG]: {
    titleKey: localizationKey.metaTitleBlog,
    descriptionKey: localizationKey.metaDescriptionBlog
  },
  [Pages.SATISFACTION]: {
    titleKey: localizationKey.metaTitleSatisfaction,
    descriptionKey: localizationKey.metaDescriptionSatisfaction
  },
  [Pages.POSSIBILITIES]: {
    titleKey: localizationKey.metaTitlePossibilities,
    descriptionKey: localizationKey.metaDescriptionPossibilities
  },
  [Pages.PRODUCTION_TIME]: {
    titleKey: localizationKey.metaTitleProductionTime,
    descriptionKey: localizationKey.metaDescriptionProductionTime
  },
  [Pages.COMPLAINT]: {
    titleKey: localizationKey.metaTitleComplaint,
    descriptionKey: localizationKey.metaDescriptionComplaint
  }
}