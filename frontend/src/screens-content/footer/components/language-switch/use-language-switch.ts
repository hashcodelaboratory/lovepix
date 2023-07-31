import {useMemo, useState} from "react";
import {LANGUAGE_SWITCH_IDENTIFIER} from "./language-switch";
import {LanguageIdentifier} from "./language-identifier";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useLanguageOptions} from "./use-language-options";

export const useLanguageSwitch = () => {
  const {i18n} = useTranslation();
  const languages = useLanguageOptions()
  const router = useRouter();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const openSwitch = () => setAnchor(document.getElementById(LANGUAGE_SWITCH_IDENTIFIER));

  const closeSwitch = () => setAnchor(null);

  const isOpen = useMemo(() => !!anchor, [anchor]);

  const flag = useMemo(() => {
    const i18nLanguage = i18n.language as LanguageIdentifier
    const languageIdentifier: LanguageIdentifier = languages.has(i18nLanguage) ? i18nLanguage : LanguageIdentifier.SK;
    return languages.get(languageIdentifier)!
  }, [i18n.language, languages])

  const onChange = (locale: LanguageIdentifier) => () => {
    closeSwitch();

    if (i18n.language === locale) {
      return
    }

    const pathname = router.pathname
    router.replace(pathname, pathname, { locale })
  }


  return {
    anchor,
    flag,
    isOpen,
    openSwitch,
    closeSwitch,
    onChange
  }
}