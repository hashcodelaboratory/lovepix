import styles from "../../../../image-configurator-layout.module.scss";
import Header from "../header/header";
import { Delete, Filter1 } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { useContext } from "react";
import AppContext from "../../../../../../app-context/app-context";
import { INITIAL_IMAGE } from "app-context/consts";
import {ImageLayout} from "../../../../../home/enums/enums";
import Image from "next/image";

const Preview = () => {
  const { t } = useTranslation();

  const {
    state: { image },
    stateAction: { setImage },
  } = useContext(AppContext);

  const handleRemoveImage = () => {
    setImage(INITIAL_IMAGE);
  };

  return (
    <div className={styles.preview}>
      <Header icon={<Filter1 />} title={String(t(messages.yourPhoto))} />
      <div className={styles.imagePlaceholder}>
        <Image
              alt="preview"
              src={image?.url ?? ""}
              width={50}
              height={80}
              layout={ImageLayout.FIXED}
          />
        <p style={{ textAlign: "center", width: "100%" }} >{image?.name}</p>
        <button className={styles.previewRemove} onClick={handleRemoveImage}>
          <Delete sx={{ mr: 1 }} />
          {String(t(messages.removeImage))}
        </button>
      </div>
    </div>
  );
};

export default Preview;
