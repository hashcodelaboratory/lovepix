import styles from "../../../../image-configurator-layout.module.scss";
import Header from "../header/header";
import { Delete, Filter1 } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import { configurationsTable } from "../../../../../../../database.config";
import { ImageLayout } from "../../../../../home/enums/enums";
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
      <Image alt="preview" src={configuration?.origin ?? ""} layout={ImageLayout.FILL} />
      <button className={styles.previewRemove} onClick={handleRemoveImage}>
        <Delete sx={{ mr: 1 }} />
        {String(t(messages.removeImage))}
      </button>
    </>
  ) : (
    <ImageIcon
      color="disabled"
      style={{ width: 80, height: 80, margin: "auto" }}
    />
  );

  return (
    <div className={styles.preview}>
      <Header icon={<Filter1 />} title={String(t(messages.yourPhoto))} />
      <div className={styles.imagePlaceholder}>{layout}</div>
    </div>
  );
};

export default Preview;
