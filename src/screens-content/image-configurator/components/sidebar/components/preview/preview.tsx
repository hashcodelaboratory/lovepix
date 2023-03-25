import styles from "../../../../image-configurator-layout.module.scss";
import Header from "../header/header";
import { CheckCircle, Delete, Filter1, Image } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import { configurationsTable } from "../../../../../../../database.config";
import { Configuration } from "../../../../../../common/types/configuration";

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
        <Delete style={{ width: 60, height: 60, margin: "auto" }} />
        {String(t(messages.removeImage))}
      </button>
    </>
  ) : (
    <Image
      color="disabled"
      style={{ width: 80, height: 80, margin: "auto" }}
    />
  );

  const icon = configuration?.origin ? <CheckCircle color='success' /> : <Filter1 />

  return (
    <div className={styles.preview}>
      <Header
        icon={icon}
        title={String(t(messages.yourPhoto))} success={!!configuration?.origin}
      />
      <div className={styles.imagePlaceholder}>{layout}</div>
    </div>
  );
};

export default Preview;
