import styles from "../../contacts.module.scss"
import {MAP_SOURCE} from "./constants";

const Map = (): JSX.Element => {
  return (
    <iframe src={MAP_SOURCE} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={styles.googleMap}></iframe>
  );
};

export default Map;