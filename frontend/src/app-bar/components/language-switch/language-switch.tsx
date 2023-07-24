import { Box, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import Image, { StaticImageData } from 'next/image'
import { ImageLayout } from '../../../screens-content/home/enums/enums'
import styles from '../../responsive-app-bar.module.scss'
import flag_sk from '../../../assets/flag-sk.png'
import flag_en from '../../../assets/flag-en.png'
import Link from "next/link";
import * as PagesUrls from '../../../constants/pages/urls'

const LanguageSwitch = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(document.getElementById("lang-flag"));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {i18n} = useTranslation();
  
  const languages = new Map<string, StaticImageData>([
    ["sk", flag_sk],
    ["en", flag_en],
  ])

  const lang_code:string = languages.has(i18n.language)? i18n.language : "sk";
  const flag:StaticImageData = languages.get(lang_code)!;

  return (
    <>
      <Box sx={{cursor: "pointer", display: "flex", alignItems: "center", alignContent: "center", marginLeft: "0.6em"}} 
        aria-controls='lang-menu'
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}>
        <Image
          id="lang-flag"
          src={flag}
          layout={ImageLayout.FIXED}
          width={32}
          height={32}
          alt=''
          className={styles.langIcon}
          style={{display: "inline-block"}}
        />
        <div className={styles.langArrow}></div>
      </Box>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableAutoFocusItem={true}
        PaperProps={{
          style: {
            maxHeight: 200,
          },
        }}
      >
      {Array.from(languages).filter(item => i18n.language !== item[0]).map(item => 
        <MenuItem sx={{padding: "3px 8px"}} selected={false} autoFocus={false}>
          <Link href={"#"} locale={item[0]}>
            <Image
              src={item[1]}
              layout={ImageLayout.FIXED}
              width={32}
              height={32}
              alt=''
              className={styles.icon}/>
          </Link>
        </MenuItem>)}
      </Menu>
    </>
  )
}

export default LanguageSwitch;