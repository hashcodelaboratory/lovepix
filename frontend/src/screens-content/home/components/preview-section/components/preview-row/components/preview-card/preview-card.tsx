import styles from '../../../../../../home.module.scss'
import { GalleryItem } from '../../../../../../../../common/types/gallery'
import Image from 'next/image'
import { ImageLayout } from '../../../../../../enums/enums'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../../../../../localization/localization-key'
import { addFileFromGallery } from '../../../../../../../../common/utils/add-file-from-gallery'
import { useRouter } from 'next/router'
import { Pages } from '../../../../../../../../constants/pages/urls'

type PreviewCardProps = {
  item?: GalleryItem
}

const PreviewCard = ({ item }: PreviewCardProps): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()

  const add = async (path: string) => {
    await addFileFromGallery(path, item?.id)
    await router.push(Pages.CONFIGURATOR)
  }

  return (
    <div className={styles.previewCard}>
      {item ? (
        <div
          className={styles.previewImageContainer}
          onClick={() => add(item?.fullPath ?? '')}
        >
          <img
            alt={item?.name}
            src={item?.url ?? ''}
            style={{ width: 300, height: 300 }}
          />
          <button className={styles.previewImageLink}>
            {t(localizationKey.add)}
          </button>
        </div>
      ) : (
        <div className={styles.previewImage} />
      )}
      <div className={styles.previewImageDescription}>
        <p className={styles.previewTitle}>{item?.name}</p>
        <p className={styles.previewPrice}>Cena od {item?.price} €</p>
      </div>
    </div>
  )
}

export default PreviewCard
