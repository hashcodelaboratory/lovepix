import { Pages } from 'constants/pages/urls'
import { localizationKey } from './localization-key'

type Metadata = {
  titleKey: string
  descriptionKey: string
}

export const metadata: Record<Pages, Metadata> = {
  [Pages.PROFILE]: {
    titleKey: localizationKey.metaTitleProfile,
    descriptionKey: localizationKey.metaDescriptionProfile,
  },
  [Pages.ACCOUNT]: {
    titleKey: localizationKey.metaTitleAccount,
    descriptionKey: localizationKey.metaDescriptionAccount,
  },
  [Pages.DASHBOARD]: {
    titleKey: localizationKey.metaTitleDashboard,
    descriptionKey: localizationKey.metaDescriptionDashboard,
  },
  [Pages.DEBUG]: {
    titleKey: localizationKey.metaTitleDebug,
    descriptionKey: localizationKey.metaDescriptionDebug,
  },
  [Pages.HOME]: {
    titleKey: localizationKey.metaTitleHome,
    descriptionKey: localizationKey.metaDescriptionIndex,
  },
  [Pages.GALLERY]: {
    titleKey: localizationKey.metaTitleGallery,
    descriptionKey: localizationKey.metaDescriptionGallery,
  },
  [Pages.MATERIALS]: {
    titleKey: localizationKey.metaTitleMaterials,
    descriptionKey: localizationKey.metaDescriptionMaterials,
  },
  [Pages.ABOUT_US]: {
    titleKey: localizationKey.metaTitleAboutUs,
    descriptionKey: localizationKey.metaDescriptionAboutUs,
  },
  [Pages.FOR_PARTNERS]: {
    titleKey: localizationKey.metaTitleForPartners,
    descriptionKey: localizationKey.metaDescriptionForPartners,
  },
  [Pages.SHOPPING_CART]: {
    titleKey: localizationKey.metaTitleShoppingCart,
    descriptionKey: localizationKey.metaDescriptionShoppingCart,
  },
  [Pages.CONFIGURATOR]: {
    titleKey: localizationKey.metaTitleConfigurator,
    descriptionKey: localizationKey.metaDescriptionConfigurator,
  },
  [Pages.ESHOP]: {
    titleKey: localizationKey.metaTitleEShop,
    descriptionKey: localizationKey.metaDescriptionEShop,
  },
  [Pages.THANKS]: {
    titleKey: localizationKey.metaTitleThankYou,
    descriptionKey: localizationKey.metaDescriptionThankYou,
  },
  [Pages.COOKIES]: {
    titleKey: localizationKey.metaTitleCookies,
    descriptionKey: localizationKey.metaDescriptionCookies,
  },
  [Pages.PRIVACY_POLICY]: {
    titleKey: localizationKey.metaTitlePrivacyPolicy,
    descriptionKey: localizationKey.metaDescriptionPrivacyPolicy,
  },
  [Pages.CONDITIONS]: {
    titleKey: localizationKey.metaTitleConditions,
    descriptionKey: localizationKey.metaDescriptionConditions,
  },
  [Pages.CONTACT]: {
    titleKey: localizationKey.metaTitleContact,
    descriptionKey: localizationKey.metaDescriptionContact,
  },
  [Pages.DOWNLOAD]: {
    titleKey: localizationKey.metaTitleDownload,
    descriptionKey: localizationKey.metaDescriptionDownload,
  },
  [Pages.BLOG]: {
    titleKey: localizationKey.metaTitleBlog,
    descriptionKey: localizationKey.metaDescriptionBlog,
  },
  [Pages.PRODUCTION_TIME]: {
    titleKey: localizationKey.metaTitleProductionTime,
    descriptionKey: localizationKey.metaDescriptionProductionTime,
  },
  [Pages.REVIEWS]: {
    titleKey: localizationKey.metaTitleReview,
    descriptionKey: localizationKey.metaDescriptionReview,
  },
  [Pages.ACRYLIC_PHOTO]: {
    titleKey: localizationKey.metaTitleAcrylicPhoto,
    descriptionKey: localizationKey.metaDescriptionAcrylicPhoto,
  },
  [Pages.COMPLAINTS_AND_RETURNS]: {
    titleKey: localizationKey.metaTitleComplaintsAndReturns,
    descriptionKey: localizationKey.metaDescriptionComplaintsAndReturns,
  },
  [Pages.DELIVERY_OPTIONS_AND_PRICES]: {
    titleKey: localizationKey.metaTitleDeliveryOptionsAndPrices,
    descriptionKey: localizationKey.metaDescriptionDeliveryOptionsAndPrices,
  },
  [Pages.FOR_DOWNLOAD]: {
    titleKey: localizationKey.metaTitleForDownload,
    descriptionKey: localizationKey.metaDescriptionForDownload,
  },
  [Pages.ORDER_AND_PAYMENT_OPTIONS]: {
    titleKey: localizationKey.metaTitleOrderAndPaymentOptions,
    descriptionKey: localizationKey.metaDescriptionOrderAndPaymentOptions,
  },
  [Pages.OUR_STORY]: {
    titleKey: localizationKey.metaTitleOurStory,
    descriptionKey: localizationKey.metaDescriptionOurStory,
  },
  [Pages.PHOTO_ON_CANVAS]: {
    titleKey: localizationKey.metaTitlePhotoOnCanvas,
    descriptionKey: localizationKey.metaDescriptionPhotoOnCanvas,
  },
  [Pages.POSTER_PHOTO]: {
    titleKey: localizationKey.metaTitlePosterPhoto,
    descriptionKey: localizationKey.metaDescriptionPosterPhoto,
  },
  [Pages.PRICING]: {
    titleKey: localizationKey.metaTitlePricing,
    descriptionKey: localizationKey.metaDescriptionPricing,
  },
  [Pages.SATISFACTION_GUARANTEE]: {
    titleKey: localizationKey.metaTitleSatisfactionGuarantee,
    descriptionKey: localizationKey.metaDescriptionSatisfactionGuarantee,
  },
}
