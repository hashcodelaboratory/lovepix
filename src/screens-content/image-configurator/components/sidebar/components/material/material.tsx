import styles from '../../../../image-configurator-layout.module.scss';
import Header from "../header/header";
import {Filter3} from "@mui/icons-material";
import {messages} from "../../../../../../messages/messages";
import {useTranslation} from "next-i18next";

const Material = () => {

    const { t } = useTranslation();

  return(
      <div className={styles.containerPadding}>
          <div className={styles.material}>
              <Header icon={<Filter3 />} title={String(t(messages.chooseMaterial))}/>
          </div>
          <hr />
      </div>
  )
}

export default Material