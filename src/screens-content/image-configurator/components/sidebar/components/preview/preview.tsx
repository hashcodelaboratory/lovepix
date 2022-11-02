import styles from "../../../../image-configurator-layout.module.scss";
import Header from "../header/header";
import { Delete, Filter1 } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { useContext } from "react";
import AppContext from "../../../../../../app-context/app-context";
import { INITIAL_IMAGE } from "app-context/consts";

const Preview = () => {
  const { t } = useTranslation();

  const {
    state: { image },
    stateAction: { setImage },
  } = useContext(AppContext);

  return (
    <div className={styles.preview}>
      <Header icon={<Filter1 />} title={String(t(messages.yourPhoto))} />
      <div className={styles.imagePlaceholder}>
        <div
          style={{
            width: 50,
            height: 80,
            backgroundColor: "gray",
            marginRight: 20,
          }}
        />
        <p>{image?.name}</p>
        <button
          className={styles.previewRemove}
          onClick={() => setImage(INITIAL_IMAGE)}
        >
          <Delete sx={{ mr: 1 }} />
          {String(t(messages.removeImage))}
        </button>
      </div>
    </div>
  );
};

export default Preview;
