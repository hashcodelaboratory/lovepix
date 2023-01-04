import styles from "../../../../image-configurator-layout.module.scss";
import Header from "../header/header";
import { Delete, Filter1 } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { useContext } from "react";
import AppContext from "../../../../../../app-context/app-context";
import { INITIAL_IMAGE } from "app-context/consts";
import Image from "next/image";
import ImageConfiguratorContext from "../../../../image-configurator-context/image-configurator-context";
import {useUpdateOrder} from "../../../../../home/api/order/useUpdateOrder";
import ImageIcon from '@mui/icons-material/Image';

const Preview = () => {
  const { t } = useTranslation();

  const { mutate: updateOrder } = useUpdateOrder();

  const {
    state: { image },
    stateAction: { setImage },
  } = useContext(AppContext);

  const { stateAction: { setImage: setCropped } } = useContext(ImageConfiguratorContext);

  const handleRemoveImage = () => {
    updateOrder({
      image: null
    })
    setImage(INITIAL_IMAGE);
    setCropped(undefined);
  };

  const layout = image?.url ?
      <>
        <Image
            alt="preview"
            src={image?.url ?? ""}
            layout={"fill"}
        />
        <button className={styles.previewRemove} onClick={handleRemoveImage}>
          <Delete sx={{ mr: 1 }} />
          {String(t(messages.removeImage))}
        </button>
      </> :
      <ImageIcon color="disabled" style={{ width: 80, height: 80, margin: "auto" }} />;

  return (
    <div className={styles.preview}>
      <Header icon={<Filter1 />} title={String(t(messages.yourPhoto))} />
      <div className={styles.imagePlaceholder}>
        {layout}
      </div>
    </div>
  );
};

export default Preview;
