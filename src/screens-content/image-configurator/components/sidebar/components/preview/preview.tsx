import styles from '../../../../image-configurator-layout.module.scss';
import Header from "../header/header";
import {Filter1} from "@mui/icons-material";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../../messages/messages";

const Preview = () => {

  const { t } = useTranslation();

  return (
      <div className={styles.preview}>
        <Header icon={<Filter1 />} title={String(t(messages.yourPhoto))} />
      </div>
  )
}

export default Preview