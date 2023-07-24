import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './add-product.module.scss'
import { addPhoto, addProductValues, FORM_SCHEMA } from './utils'
import { useQueryClient } from 'react-query'
import { localizationKey } from '../../../../../localization/localization-key'
import Image from 'next/image'
import { FormAddProduct } from 'common/types/form-add-product'
import { useCategoriesEshop } from 'common/api/use-categories-eshop'

type ControllerFieldType = {
  name: 'title' | 'price' | 'count' | 'description' | 'category'
  error?: string
}

const AddProduct = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const refImage = useRef<HTMLInputElement>(null)
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormAddProduct>({
    resolver: yupResolver(FORM_SCHEMA),
    defaultValues: addProductValues,
  })
  const [image, setImage] = useState<File | undefined>()
  const { data: categories } = useCategoriesEshop()

  const [category, setCategory] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }

  const FIELDS: ControllerFieldType[] = [
    {
      name: 'title',
      error: errors.title?.message,
    },
    {
      name: 'price',
      error: errors.price?.message,
    },
    { name: 'count', error: errors.count?.message },
    {
      name: 'description',
      error: errors.description?.message,
    },
  ]

  const fields = FIELDS.map(({ name, error }) => (
    <div key={name} className={styles.input}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <TextField
              placeholder={t(name)}
              id={name}
              label={t(name)}
              {...field}
              {...register(name, { required: true })}
              error={!!error}
              helperText={String(error ?? '')}
              variant='outlined'
              size='small'
              fullWidth
              sx={{
                '& .MuiInput-root': {
                  '&:before, :after, :hover:not(.Mui-disabled):before': {
                    borderBottom: 0,
                  },
                },
              }}
            />
          </div>
        )}
      />
    </div>
  ))

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (file) {
      setImage(file)
    }
  }

  const removeImage = () => {
    setImage(undefined)
    if (refImage.current) {
      refImage.current.value = ''
    }
  }

  const onSubmit: SubmitHandler<FormAddProduct> = async (data) => {
    if (data) {
      await addPhoto(data, image, queryClient)
      removeImage()
      reset()
    }
  }

  return (
    <div className={styles.addProductContainer}>
      <input
        type='file'
        id='avatar'
        name='avatar'
        accept='image/png, image/jpeg'
        onChange={onChange}
        className={styles.galleryDetailDropzone}
        ref={refImage}
      />
      {image && (
        <>
          <div>
            <Image
              loading='lazy'
              src={image ? URL.createObjectURL(image) : ''}
              width={300}
              height={300}
              alt='img'
              className={styles.imagePreview}
            />
          </div>
          <Button variant='outlined' onClick={removeImage}>
            {t(localizationKey.removeImage)}
          </Button>
        </>
      )}
      <form id='my-form' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={'category'}
          control={control}
          render={({ field }) => (
            <div>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-name-label'>
                  {t(messages.categories)}
                </InputLabel>
                <Select
                  label='category'
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  {...field}
                  {...register('category', { required: true })}
                  error={!!errors.category?.message}
                  value={category}
                  onChange={handleChange}
                  variant='outlined'
                >
                  {categories?.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
        />
        {fields}
        <Button
          type='submit'
          variant='outlined'
          id='my-form'
          className={styles.button}
        >
          {t(localizationKey.addNewProduct)}
        </Button>
      </form>
    </div>
  )
}

export default AddProduct
