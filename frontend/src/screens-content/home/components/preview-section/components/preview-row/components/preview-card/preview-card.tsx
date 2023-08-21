import styles from '../../../../../../home.module.scss'
import { GalleryItem } from '../../../../../../../../common/types/gallery'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../../../../../localization/localization-key'
import { addFileFromGallery } from '../../../../../../../../common/utils/add-file-from-gallery'
import { useRouter } from 'next/router'
import { Pages } from '../../../../../../../../constants/pages/urls'
import { Configuration } from 'common/types/configuration'
import { ValidationContextType } from 'screens-content/validation-provider/validationProvider'

type PreviewCardProps = {
  configuration: Configuration
  validation: ValidationContextType
  item?: GalleryItem
}

const PreviewCard = ({
  configuration,
  validation,
  item,
}: PreviewCardProps): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()

  const add = async (path: string) => {
    await addFileFromGallery(path, configuration, validation, router, item?.id)
    await router.push(t(Pages.CONFIGURATOR))
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
