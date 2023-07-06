import styles from "../../../../home.module.scss";
import PreviewCard from "./components/preview-card/preview-card";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GalleryItem } from "../../../../../../common/types/gallery";
import { useTranslation } from "react-i18next";
import { messages } from "../../../../../../messages/messages";
import { useRouter } from "next/router";
import { GALLERY } from "../../../../../../constants/pages/urls";

type PreviewRowProps = {
  galleryData?: GalleryItem[];
  title: string;
}

const PreviewRow = ({ galleryData, title }: PreviewRowProps): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  const included = galleryData?.filter(data => data.categories.includes(title));

  const cards = included?.map((item) => (
    <PreviewCard key={item.id} item={item} />
  )).slice(0, 3);

  const dummy =
    <>
      <PreviewCard />
      <PreviewCard />
      <PreviewCard />
    </>;

  const redirect = async () => {
    await router.push(GALLERY);
  }

  return (
    <div className={styles.previewRow}>
      <div className={styles.previewTitleRow}>
        <h3>{title}</h3>
        <button className={styles.previewTitleRowButton}>
          <p onClick={redirect} className={styles.previewTitleRowButtonText}>{t(messages.showMore)}</p>
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