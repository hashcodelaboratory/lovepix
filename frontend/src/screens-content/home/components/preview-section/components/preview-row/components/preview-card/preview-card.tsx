import styles from '../../../../../../home.module.scss'
import { GalleryItem } from '../../../../../../../../common/types/gallery'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../../../../../localization/localization-key'
import { useAddFileFromGallery } from '../../../../../../../../common/utils/add-file-from-gallery'
import { Configuration } from 'common/types/configuration'

type PreviewCardProps = {
  configuration: Configuration
  item?: GalleryItem
}

const PreviewCard = ({
  configuration,
  item,
}: PreviewCardProps): JSX.Element => {
  const { t } = useTranslation()
  const { addToGallery } = useAddFileFromGallery(configuration)

  const add = async (path: string) => {
    await addToGallery(path, item?.id)
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
            style={{ width: 300, height: 300, objectFit: 'cover' }}
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
