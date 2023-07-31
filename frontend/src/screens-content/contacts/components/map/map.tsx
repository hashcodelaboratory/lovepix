import styles from "../../contacts.module.scss"
import {MAP_SOURCE} from "./constants";
import { useTranslation } from "next-i18next";

export const Map = () => {
  const { i18n } = useTranslation()

  // setting the google maps language to the user language
  const lang = i18n.language ?? "sk"
  const MAP_LINK = MAP_SOURCE + `1s${lang}!2s${lang}`
  return (
    <iframe src={MAP_LINK} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={styles.googleMap}></iframe>
  )
};