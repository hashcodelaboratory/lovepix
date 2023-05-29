import styles from "../../../../../../home.module.scss";
import { GalleryItem } from "../../../../../../../../common/types/gallery";
import Image from "next/image";
import { ImageLayout } from "../../../../../../enums/enums";

type PreviewCardProps = {
  item?: GalleryItem;
}

const PreviewCard = ({ item }: PreviewCardProps): JSX.Element => {
  return (
    <div className={styles.previewCard}>
      {item ?
        <Image
          alt={item?.name}
          src={item?.url ?? ''}
          layout={ImageLayout.INTRINSIC}
          width={400}
          height={400}
        /> :
        <div className={styles.previewImage} />
      }
      <div className={styles.previewImageDescription}>
        <p className={styles.previewTitle}>{item?.name}</p>
        <p className={styles.previewPrice}>Cena od {item?.price} €</p>
      </div>
    </div>
  );
};

export default PreviewCard;