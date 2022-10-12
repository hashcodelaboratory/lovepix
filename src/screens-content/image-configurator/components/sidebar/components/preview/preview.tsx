import styles from '../../../../image-configurator-layout.module.scss';
import Header from "../header/header";
import {Close, Filter1} from "@mui/icons-material";
import {useTranslation} from "next-i18next";
import {messages} from "../../../../../../messages/messages";

const Preview = () => {

  const { t } = useTranslation();

  return (
      <div className={styles.preview}>
        <Header icon={<Filter1 />} title={String(t(messages.yourPhoto))} />
          <div className={styles.imagePlaceholder}>
              <div style={{ width: 50, height: 80, backgroundColor: "gray", marginRight: 20 }} />
              <p>title.png</p>
              <button className={styles.previewRemove}>
                  <Close sx={{ mr: 1 }} />
                  {String(t(messages.removeImage))}
              </button>
          </div>
      </div>
  )
}

export default Preview