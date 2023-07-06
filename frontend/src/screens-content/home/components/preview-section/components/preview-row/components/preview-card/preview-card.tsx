import styles from "../../../../../../home.module.scss";
import { GalleryItem } from "../../../../../../../../common/types/gallery";
import Image from "next/image";
import { ImageLayout } from "../../../../../../enums/enums";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../../../messages/messages";
import { addFileFromGallery } from "../../../../../../../../common/utils/add-file-from-gallery";
import { CONFIGURATOR } from "../../../../../../../../constants/pages/urls";
import { useRouter } from "next/router";

type PreviewCardProps = {
  item?: GalleryItem;
}

const PreviewCard = ({ item }: PreviewCardProps): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter()

  const add = async (path: string) => {
    await addFileFromGallery(path)
    await router.push(CONFIGURATOR)
  }

  return (
    <div className={styles.previewCard}>
      {item ?
        <div className={styles.previewImageContainer} onClick={() => add(item?.fullPath ?? '')}>
          <Image
            alt={item?.name}
            src={item?.url ?? ""}
            layout={ImageLayout.INTRINSIC}
            width={400}
            height={300}
            className={styles.previewImageFromUrl}
          />
          <button className={styles.previewImageLink}>{t(messages.add)}</button>
        </div> :
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