import {useTranslation} from "next-i18next";
import Image from 'next/image'
import styles from "./language-switch.module.scss"
import {Box, Menu, MenuItem, styled} from "@mui/material";
import IconArrowDown from "@icons/icon-arrow-down"
import {ImageLayout} from "../../../home/enums/enums";
import {localizationKey} from "../../../../localization/localization-key";
import {useLanguageOptions} from "./use-language-options";
import {useLanguageSwitch} from "./use-language-switch";
import {useMemo} from "react";

export const LANGUAGE_SWITCH_IDENTIFIER = 'language-switch'
const LANGUAGE_SWITCH_MENU_IDENTIFIER = 'language-switch-menu'

const LanguageSwitchContainer = styled(Box)({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  alignContent: "center",
  margin: "0 0.9em 0 0.5em"
})

const LanguageSwitchLabel = styled('p')({
  fontSize: "12px",
  fontWeight: "300",
  marginLeft: "1em",
  marginBlock: "0em"
})

const LanguageSwitchIconContainer = styled('div')({
  display: "grid",
  alignItems: "center",
  marginLeft: "0.4em"
})

const MENU_ANCHOR_ORIGIN = {
  vertical: "top" as const,
  horizontal: "right" as const,
}

const MENU_TRANSFORM_ORIGIN = {
  vertical: "bottom" as const,
  horizontal: "right" as const,
}

const LanguageSwitch = () => {
  const {t, i18n} = useTranslation();
  const languages = useLanguageOptions()
  const {
    anchor,
    flag: {flag, name},
    isOpen,
    openSwitch,
    closeSwitch,
    onChange
  } = useLanguageSwitch()

  const menuItems = useMemo(
    () => Array.from(languages).map(([identifier, {flag, name}]) =>
      <MenuItem
        key={identifier}
        selected={false}
        autoFocus={false}
        data-lang={identifier}
        className={styles.langItem}
        onClick={onChange(identifier)}
      >
        <Image
          src={flag}
          alt={name}
          width={32}
          height={32}
          layout={ImageLayout.FIXED}
        />
        <p>
          {name}
        </p>
      </MenuItem>)
    , [languages, onChange]
  )

  return (
    <>
      <LanguageSwitchContainer
        id={LANGUAGE_SWITCH_IDENTIFIER}
        aria-controls={LANGUAGE_SWITCH_MENU_IDENTIFIER}
        aria-haspopup
        aria-expanded={isOpen}
        onClick={openSwitch}>
        <Image
          src={flag}
          layout={ImageLayout.FIXED}
          width={32}
          height={32}
          alt={name}
        />
        <LanguageSwitchLabel>{t(localizationKey.changeLanguage)}</LanguageSwitchLabel>
        <LanguageSwitchIconContainer>
          <IconArrowDown height={5} width={7}/>
        </LanguageSwitchIconContainer>
      </LanguageSwitchContainer>
      <Menu
        id={LANGUAGE_SWITCH_MENU_IDENTIFIER}
        anchorEl={anchor}
        open={isOpen}
        onClose={closeSwitch}
        anchorOrigin={MENU_ANCHOR_ORIGIN}
        transformOrigin={MENU_TRANSFORM_ORIGIN}
        disableAutoFocusItem={true}
      >
        {menuItems}
      </Menu>
    </>
  )
}

export default LanguageSwitch;