import { useTranslation } from "next-i18next";
import { useState } from "react";
import Image, { StaticImageData } from 'next/image'
import flag_sk from '../../../../assets/flag_sk.png'
import flag_en from '../../../../assets/flag_en.png'
import styles from "./language.module.scss"
import { Box, Menu, MenuItem } from "@mui/material";
import ArrowDown from "../../../../assets/icons/arrowDown"
import {ImageLayout} from "../../../home/enums/enums";
import {localizationKey} from "../../../../localization/localization-key";
import { useRouter } from "next/router";

const LanguageSwitch = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const menuClick = () => {
    setAnchorEl(document.getElementById("lang-select"));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemClick = (new_lang: string) => {
    handleClose();
    if(i18n.language !== new_lang) router.push("#",new_lang,{locale: new_lang})
  }

  const {t, i18n} = useTranslation();
  
  type langInfo = {
    flag: StaticImageData,
    name: string
  }

  const languages = new Map<string, langInfo>([
    ["sk", {flag: flag_sk, name: "Slovenský"}],
    ["en", {flag: flag_en, name: "English"}],
  ])

  const lang_code:string = languages.has(i18n.language)? i18n.language : "sk";
  const flag:StaticImageData | string = languages.get(lang_code)?.flag ?? "";

  return (
    <>
      <Box
        id="lang-select" 
        sx={{cursor: "pointer", display: "flex", alignItems: "center", alignContent: "center", margin: "0 0.9em 0 0.5em"}} 
        aria-controls='lang-menu'
        aria-haspopup="true"
        aria-expanded={open}
        onClick={menuClick}>
        <Image
          src={flag}
          layout={ImageLayout.FIXED}
          width={32}
          height={32}
          alt=""
        />
        <p style={{fontSize: "12px", fontWeight:"300", marginLeft: "1em", marginBlock: "0em"}}>{t(localizationKey.changeLanguage)}</p>
        <div style={{display:"grid", alignItems:"center", marginLeft:"0.4em"}}>
        <ArrowDown height={5} width={7}></ArrowDown>
        </div>
      </Box>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        disableAutoFocusItem={true}
      >
      {Array.from(languages).map(item => 
        <MenuItem selected={false} autoFocus={false} data-lang={item[0]} className={styles.langItem} onClick={() => {itemClick(item[0])}}>
            <Image
              src={item[1].flag}
              alt=''
              width={32}
              height={32}
              layout={ImageLayout.FIXED}/>
          <p>{item[1].name}</p>
        </MenuItem>)}
      </Menu>
    </>
  )
}

export default LanguageSwitch;