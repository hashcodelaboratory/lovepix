import styles from "../../../../image-configurator-layout.module.scss";
import Header from "../header/header";
import { Delete, Filter1 } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../messages/messages";
import Image from "next/image";
import ImageIcon from '@mui/icons-material/Image';
import {useLiveQuery} from "dexie-react-hooks";
import {configurationsTable} from "../../../../../../../database.config";

const Preview = () => {
    const data = useLiveQuery(
        () => configurationsTable.get('conf'),
        []
    );

  const { t } = useTranslation();

  const handleRemoveImage = () => {
    // TODO: clean db
  };

  const layout = data?.origin ?
      <>
        <Image
            alt="preview"
            src={data?.origin ?? ""}
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
