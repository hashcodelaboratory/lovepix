import Container from '@mui/material/Container'
import {useGallery} from '../../common/api/use-gallery'
import Image from 'next/image'
import {ImageLayout} from '../home/enums/enums'
import styles from './gallery.module.scss'
import {useCategories} from '../../common/api/use-categories'
import {Chip} from '@mui/material'
import {useEffect, useState} from 'react'
import {localizationKey} from '../../localization/localization-key'
import {useTranslation} from 'react-i18next'
import {useRouter} from 'next/router'
import {addFileFromGallery} from '../../common/utils/add-file-from-gallery'
import {Pages} from "../../constants/pages/urls";

const GalleryLayout = (): JSX.Element => {
  const {t} = useTranslation()
  const router = useRouter()

  const {data: gallery} = useGallery()
  const {data: categories} = useCategories()

  const [searchedCategories, setSearchedCategories] = useState<string[]>()

  const filtered = gallery?.filter((image) =>
    searchedCategories?.some((r) => image.categories.includes(r))
  )

  useEffect(() => {
    setSearchedCategories(categories?.map(({name}) => name))
  }, [categories])

  const onClickCategory = (name: string) => {
    const variant = getCategoryVariant(name)
    if (variant === 'filled') {
      setSearchedCategories(
        searchedCategories?.filter((category) => category !== name)
      )
    } else {
      setSearchedCategories([...(searchedCategories ?? []), name])
    }
  }

  const getCategoryVariant = (name: string) => {
    return searchedCategories?.includes(name) ? 'filled' : 'outlined'
  }

  const add = async (path: string, id: string) => {
    await addFileFromGallery(path, id)
    await router.push(Pages.CONFIGURATOR)
  }

  return (
    <Container>
      <div className={styles.galleryCategoryRow}>
        {categories?.map(({id, name}) => (
          <Chip
            key={id}
            label={t(name)}
            color='primary'
            variant={getCategoryVariant(name)}
            clickable
            onClick={() => onClickCategory(name)}
            className={styles.galleryChip}
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
    </Container>
  )
}

export default GalleryLayout
