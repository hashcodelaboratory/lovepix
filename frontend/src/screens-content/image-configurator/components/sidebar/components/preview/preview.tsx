import styles from "../../../../image-configurator-layout.module.scss";
import { CheckCircle, Delete, Filter1, Image as ImageIcon } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { configurationsTable } from "../../../../../../../database.config";
import { Configuration } from "../../../../../../common/types/configuration";

const IMAGE_WIDTH = 30;
const REMOVE_IMAGE_WIDTH = 20;

type PreviewProps = {
  configuration: Configuration;
}

const Preview = ({ configuration }: PreviewProps) => {

  const { t } = useTranslation();

  const handleRemoveImage = () => {
    configurationsTable.clear();
  };

  const layout = configuration?.origin ? (
    <>
      <button className={styles.previewRemove} onClick={handleRemoveImage}>
        <Delete style={{ width: REMOVE_IMAGE_WIDTH, height: REMOVE_IMAGE_WIDTH, margin: "auto" }} />
        {String(t(messages.removeImage))}
      </button>
    </>
  ) : (
    <ImageIcon
      color="disabled"
      style={{ width: IMAGE_WIDTH, height: IMAGE_WIDTH, margin: "auto" }}
    />
  );

  const icon = configuration?.origin ? <CheckCircle color="success" /> : <Filter1 />;

  return (
    <div className={styles.preview}>
      <div className={styles.header}>
        {icon}
        <h3 className={styles.headerTitle}
            style={{ color: !!configuration?.origin ? "green" : "black" }}
        >
          {String(t(messages.yourPhoto))}
        </h3>
      </div>
      <div className={styles.previewImagePlaceholder}>{layout}</div>
    </div>
  );
};


export default Preview;
