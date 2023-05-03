import styles from "../../../../home.module.scss";
import PreviewCard from "./components/preview-card/preview-card";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PreviewRow = (): JSX.Element => {
  return (
    <div className={styles.previewRow}>
      <div className={styles.previewTitleRow}>
        <h3>Category title</h3>
        <button className={styles.previewTitleRowButton}>
          <p className={styles.previewTitleRowButtonText}>Zobrazit viac</p>
          <ArrowForwardIcon sx={{ width: 16 }} />
        </button>
      </div>
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