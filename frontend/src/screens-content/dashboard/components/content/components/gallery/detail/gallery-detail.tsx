import styles from '../../../../../dashboard.module.scss'
import Image from 'next/image'
import { ImageLayout } from '../../../../../../home/enums/enums'
import { Chip, Stack, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import { ChangeEvent, useEffect, useState } from 'react'
import { doc, updateDoc } from '@firebase/firestore'
import { database } from '../../../../../../../common/firebase/config'
import { Collections } from '../../../../../../../common/firebase/enums'
import { localizationKey } from '../../../../../../../localization/localization-key'
import { useQueryClient } from 'react-query'
import { GALLERY_KEY } from '../../../../../../../common/api/use-gallery'
import { useDimensions } from '../../../../../../../common/api/use-dimensions'
import { useCategories } from '../../../../../../../common/api/use-categories'

type Row = {
  docId: string
  id: string
  contentType: string
  name: string
  size: number
  timeCreated: string
  url: string
  price: number
  categories: string[]
  dimensions: string[]
}

type GalleryDetailProps = {
  row?: Row
}

const GalleryDetail = ({ row }: GalleryDetailProps): JSX.Element => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data: dimensions = [] } = useDimensions()
  const { data: categories = [] } = useCategories()
  const [price, setPrice] = useState<number>()
  const [name, setName] = useState<string>()
  const [editedDimensions, setEditedDimensions] = useState<string[]>()
  const [editedCategories, setEditedCategories] = useState<string[]>()

  useEffect(() => {
    setEditedDimensions(row?.dimensions)
    setEditedCategories(row?.categories)
    setPrice(row?.price)
    setName(row?.name)
  }, [row])

  const onChangePrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPrice(Number(e.target.value))
  }

  const onChangeName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value)
  }

  const save = async () => {
    const docData = {
      price: price ?? row?.price,
      dimensions: editedDimensions,
      categories: editedCategories,
      name: name,
    }
    await updateDoc(
      doc(database, Collections.GALLERY, row?.docId ?? ''),
      docData
    )
    await queryClient.invalidateQueries(GALLERY_KEY)
  }

  const onClickDimension = (name: string) => {
    const variant = getDimensionVariant(name)
    if (variant === 'filled') {
      setEditedDimensions(
        (editedDimensions ?? row?.dimensions)?.filter(
          (dimension) => dimension !== name
        )
      )
    } else {
      setEditedDimensions([
        ...(editedDimensions ?? row?.dimensions ?? []),
        name,
      ])
    }
  }

  const getDimensionVariant = (name: string) => {
    return (editedDimensions ?? row?.dimensions)?.includes(name)
      ? 'filled'
      : 'outlined'
  }

  const onClickCategory = (name: string) => {
    const variant = getCategoryVariant(name)
    if (variant === 'filled') {
      setEditedCategories(
        (editedCategories ?? row?.categories)?.filter(
          (category) => category !== name
        )
      )
    } else {
      setEditedCategories([
        ...(editedCategories ?? row?.categories ?? []),
        name,
      ])
    }
  }

  const getCategoryVariant = (name: string) => {
    return (editedCategories ?? row?.categories)?.includes(name)
      ? 'filled'
      : 'outlined'
  }

  return (
    <>
      <div className={styles.galleryDetailBox}>
        <div className={styles.galleryDetailRow}>
          <Image
            className={styles.galleryDetailImage}
            src={row?.url ?? ''}
            layout={ImageLayout.FIXED}
            width={300}
            height={200}
            alt=''
          />
          <div className={styles.galleryDetailContainer}>
            <div className={styles.galleryDetailTextFieldTitle}>
              {t(localizationKey.name)}:
            </div>
            <TextField
              className={styles.galleryDetailTitle}
              size='small'
              defaultValue={row?.name}
              value={name}
              onChange={onChangeName}
              type='text'
              fullWidth
            />
            <div className={styles.galleryDetailColumn}>
              <div className={styles.galleryDetailDate}>
                {new Date(row?.timeCreated ?? '').toLocaleDateString()}{' '}
                {new Date(row?.timeCreated ?? '').toLocaleTimeString()}
              </div>
              <div className={styles.galleryDetailDate}>
                {row?.size && row.size / 1000} KB
              </div>
              <div className={styles.galleryDetailTextFieldTitle}>Cena:</div>
              <TextField
                className={styles.galleryDetailTextField}
                size='small'
                placeholder={row?.price.toString()}
                value={price}
                onChange={onChangePrice}
                type='number'
                inputProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.galleryDetailContainer}>
          <Stack direction='row' spacing={1} flexWrap='wrap' gap='8px'>
            {dimensions?.map(({ id, name }) => (
              <Chip
                key={id}
                label={name}
                color='primary'
                variant={getDimensionVariant(name)}
                clickable
                onClick={() => onClickDimension(name)}
                className={styles.defaultChip}
              />
            ))}
          </Stack>
        </div>
        <div className={styles.galleryDetailContainer}>
          <Stack direction='row' spacing={1} flexWrap='wrap' gap='8px'>
            {categories.map(({ id, name }) => (
              <Chip
                key={id}
                label={name}
                color='secondary'
                variant={getCategoryVariant(name)}
                clickable
                onClick={() => onClickCategory(name)}
                className={styles.defaultChip}
              />
            ))}
          </Stack>
        </div>
        <div className={styles.galleryDetailSaveWrapper}>
          <Button
            className={styles.galleryDetailSave}
            variant='outlined'
            color='success'
            onClick={save}
            disabled={!price || !name}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  )
}

export default GalleryDetail
