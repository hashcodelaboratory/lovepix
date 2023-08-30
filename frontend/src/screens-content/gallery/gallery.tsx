import Container from '@mui/material/Container'
import { useGallery } from '../../common/api/use-gallery'
import Image from 'next/image'
import { ImageLayout } from '../home/enums/enums'
import styles from './gallery.module.scss'
import { useCategories } from '../../common/api/use-categories'
import { Chip } from '@mui/material'
import { useEffect, useState } from 'react'
import { localizationKey } from '../../localization/localization-key'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import {
  addGalleryType,
  addImageFromGallery,
} from '../../common/utils/add-file-from-gallery'
import { useGalleryQuery } from './use-gallery-query'
import { Configuration } from 'common/types/configuration'
import { canAddImage } from 'common/utils/add-image-to-configurator'
import { ConfirmationModal } from 'screens-content/confirmation-modal/confirmation-modal'
import { Pages } from 'constants/pages/urls'

const GalleryLayout = ({
  configuration,
}: {
  configuration: Configuration
}): JSX.Element => {
  const { t } = useTranslation()
  const queryGallery = useGalleryQuery()
  const { data: gallery } = useGallery()
  const { data: categories } = useCategories()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [imageData, setImageData] = useState<addGalleryType>()
  const [searchedCategories, setSearchedCategories] = useState<string[]>([])

  const filtered = gallery?.filter((image) =>
    searchedCategories?.some((r) => image.categories.includes(r))
  )

  useEffect(() => {
    if (!queryGallery) {
      setSearchedCategories((categories ?? []).map(({ name }) => name))

      return
    }

    setSearchedCategories([queryGallery])
  }, [queryGallery, categories])

  const onClickCategory = (name: string) => {
    const variant = getCategoryVariant(name)
    if (variant === 'filled') {
      setSearchedCategories(
        searchedCategories.filter((category) => category !== name)
      )
    } else {
      setSearchedCategories([...searchedCategories, name])
    }
  }

  const getCategoryVariant = (name: string) => {
    const isPartOfFilter = searchedCategories?.includes(name) ?? false

    return isPartOfFilter ? 'filled' : 'outlined'
  }

  const add = async (path: string, id: string) => {
    if (canAddImage(configuration)) {
      await addImageFromGallery(path, id)
      router.push(t(Pages.CONFIGURATOR))
      return
    }
    setModalOpen(true)
    setImageData({ path: path, id: id })
  }

  const modalActionTrue = async () => {
    setModalOpen(false)
    if (!!imageData) {
      await addImageFromGallery(imageData.path, imageData.id)
      router.push(t(Pages.CONFIGURATOR))
    }
  }

  const modalActionFalse = () => {
    setModalOpen(false)
  }

  return (
    <Container>
      <h1 className={styles.galleryTitle}>Galéria</h1>
      <p className={styles.gallerySubtitle}>{t(localizationKey.galleryInfo)}</p>
      <div className={styles.galleryCategoryRow}>
        {categories?.map(({ id, name }) => (
          <Chip
            key={id}
            label={name}
            variant={getCategoryVariant(name)}
            clickable
            onClick={() => onClickCategory(name)}
            className={`${styles.galleryChip} ${
              getCategoryVariant(name) === 'outlined' ? '' : styles.clicked
            }`}
          />
        ))}
      </div>
      <div className={styles.galleryRow}>
        {filtered?.map((image) => (
          <div
            key={image.id}
            className={styles.previewImageContainer}
            onClick={() => add(image.fullPath, image.id)}
          >
            <Image
              src={image?.url}
              layout={ImageLayout.INTRINSIC}
              width={380}
              height={320}
              className={styles.galleryImage}
              alt=''
            />
            <button className={styles.previewImageLink}>
              {t(localizationKey.add)}
            </button>
          </div>
        ))}
      </div>
      <ConfirmationModal
        title={t(localizationKey.imageInConfiguratorTitle)}
        description={t(localizationKey.imageInConfiguratorDescription)}
        link={{
          href: t(Pages.CONFIGURATOR),
          text: t(localizationKey.imageInConfiguratorLink),
        }}
        defaultReturn={true}
        actionTrue={modalActionTrue}
        actionFalse={modalActionFalse}
        open={modalOpen}
      />
    </Container>
  )
}

export default GalleryLayout
