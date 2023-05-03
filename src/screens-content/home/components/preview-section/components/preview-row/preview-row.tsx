import styles from "../../../../home.module.scss";
import PreviewCard from "./components/preview-card/preview-card";

const PreviewRow = (): JSX.Element => {
  return (
    <div className={styles.previewRow}>
      <h3>Category title</h3>
      <hr />
      <div className={styles.previewImageRow}>
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
      </div>
    </div>
  );
};

export default PreviewRow;