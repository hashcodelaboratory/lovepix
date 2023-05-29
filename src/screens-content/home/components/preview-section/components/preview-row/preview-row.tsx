import styles from "../../../../home.module.scss";
import PreviewCard from "./components/preview-card/preview-card";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GalleryItem } from "../../../../../../common/types/gallery";

type PreviewRowProps = {
  galleryData?: GalleryItem[];
  title: string
}

const PreviewRow = ({ galleryData, title }: PreviewRowProps): JSX.Element => {
  const cards = galleryData?.map((item) => item.categories.includes(title) && (
    <PreviewCard key={item.id} item={item} />
  )).slice(0, 3);

  const dummy =
    <>
      <PreviewCard />
      <PreviewCard />
      <PreviewCard />
    </>

  return (
    <div className={styles.previewRow}>
      <div className={styles.previewTitleRow}>
        <h3>{title}</h3>
        <button className={styles.previewTitleRowButton}>
          <p className={styles.previewTitleRowButtonText}>Zobrazit viac</p>
          <ArrowForwardIcon sx={{ width: 16 }} />
        </button>
      </div>
      <hr />
      <div className={styles.previewImageRow}>
        {cards ?? dummy}
      </div>
    </div>
  );
};

export default PreviewRow;