import Header from "../header/header";
import {Filter2} from "@mui/icons-material";
import styles from '../../../../image-configurator-layout.module.scss';

const Dimension = () => {
  return(
      <div className={styles.containerPadding}>
          <div className={styles.dimension}>
              <Header icon={<Filter2 />} title={'2'} />
          </div>
          <hr />
      </div>
  )
}

export default Dimension