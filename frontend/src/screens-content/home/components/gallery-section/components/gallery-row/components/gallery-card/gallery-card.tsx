import styles from '../../../../../../home.module.scss'
import { GalleryItem } from '../../../../../../../../common/types/gallery'
import { useTranslation } from 'next-i18next'
import { localizationKey } from '../../../../../../../../localization/localization-key'
import {
  AddGalleryType,
  addImageFromGallery,
} from '../../../../../../../../common/utils/add-file-from-gallery'
import { Configuration } from 'common/types/configuration'
import { ConfirmationModal } from 'screens-content/confirmation-modal/confirmation-modal'
import { Pages } from 'constants/pages/urls'
import { useState } from 'react'
import { canAddImage } from 'common/utils/add-image-to-configurator'
import { useRouter } from 'next/router'

type PreviewCardProps = {
  configuration: Configuration
  item?: GalleryItem
}

const GalleryCard = ({
  configuration,
  item,
}: PreviewCardProps): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [imageData, setImageData] = useState<AddGalleryType>()

  const add = async (path: string, id?: string) => {
    if (canAddImage(configuration)) {
      console.log(path)
      await addImageFromGallery(path, id)
      await router.push(t(Pages.CONFIGURATOR))
    } else {
      toggleModal()
      setImageData({ path: path, id: id })
    }
  }

  const toggleModal = () => setOpenModal(!openModal)

  const onConfirm = async () => {
    toggleModal()
    await addImageFromGallery(imageData!.path, imageData!.id)
    await router.push(t(Pages.CONFIGURATOR))
  }

  const onClose = () => toggleModal()

  return (
    <div className={styles.previewCard}>
      {item ? (
        <div
          className={styles.previewImageContainer}
          onClick={() => add(item?.fullPath ?? '', item?.id)}
        >
          <img
            className={styles.previewImageFromUrl}
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
      <ConfirmationModal
        title={t(localizationKey.imageInConfiguratorTitle)}
        description={t(localizationKey.imageInConfiguratorDescription)}
        link={{
          href: t(Pages.CONFIGURATOR),
          text: t(localizationKey.imageInConfiguratorLink),
        }}
        onConfirm={onConfirm}
        onClose={onClose}
        open={openModal}
      />
    </div>
  )
}

export default GalleryCard
