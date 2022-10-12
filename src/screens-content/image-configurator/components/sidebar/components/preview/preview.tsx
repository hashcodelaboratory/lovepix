import styles from '../../../../image-configurator-layout.module.scss';
import Header from "../header/header";
import {Filter1} from "@mui/icons-material";

const Preview = () => {
  return (
      <div className={styles.preview}>
        <Header icon={<Filter1 />} title={"1"} />
      </div>
  )
}

export default Preview