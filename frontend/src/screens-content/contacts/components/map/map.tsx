import styles from "../../contacts.module.scss"
import {MAP_SOURCE} from "./constants";

export const Map = () => {
  return (
    <iframe src={MAP_SOURCE} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={styles.googleMap}></iframe>
  );
};