import styles from '../../../../image-configurator-layout.module.scss';
import Header from "../header/header";
import {Filter3} from "@mui/icons-material";

const Material = () => {
  return(
      <div className={styles.containerPadding}>
          <div className={styles.material}>
              <Header icon={<Filter3 />} title={'3'}/>
          </div>
          <hr />
      </div>
  )
}

export default Material