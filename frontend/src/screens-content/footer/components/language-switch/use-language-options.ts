import {LanguageIdentifier} from "./language-identifier";
import {LanguageData} from "./language-data";
import SK_FLAG from "../../../../assets/flag_sk.png";
import {localizationKey} from "../../../../localization/localization-key";
import EN_FLAG from "../../../../assets/flag_en.png";
import {useTranslation} from "next-i18next";
import {useMemo} from "react";

export const useLanguageOptions = () => {
  const {t, i18n} = useTranslation();

  return useMemo(() => new Map<LanguageIdentifier, LanguageData>([
    [LanguageIdentifier.SK, {
      flag: SK_FLAG,
      name: t(localizationKey.languageSwitch.sk)
    }],
    [LanguageIdentifier.EN, {
      flag: EN_FLAG,
      name: t(localizationKey.languageSwitch.en)
    }],
  ]), [t])
}