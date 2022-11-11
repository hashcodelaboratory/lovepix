import Header from "../header/header";
import {Filter2} from "@mui/icons-material";
import styles from '../../../../image-configurator-layout.module.scss';
import {messages} from "../../../../../../messages/messages";
import {useTranslation} from "next-i18next";
import DimensionContent from "./components/dimension-content/dimension-content";

const Dimension = () => {

  const { t } = useTranslation();

  return(
      <div className={styles.containerPadding}>
          <div className={styles.dimension}>
              <Header icon={<Filter2 />} title={String(t(messages.chooseDimension))} />
              <DimensionContent />
          </div>
          <hr />
      </div>
  )
}

export default Dimension