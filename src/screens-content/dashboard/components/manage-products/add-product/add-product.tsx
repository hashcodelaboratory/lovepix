import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './add-product.module.scss'
import { addPhoto, FORM_SCHEMA } from './utils'
import { useQueryClient } from 'react-query'
import { messages } from 'messages/messages'
import Image from 'next/image'

export type FormAddProduct = {
  title: string
  price: number | undefined
  count: number | undefined
  description: string
}

type ControllerFieldType = {
  name: 'title' | 'price' | 'count' | 'description'
  error?: string
}

const AddProduct = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const refImage = useRef<any>()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormAddProduct>({
    resolver: yupResolver(FORM_SCHEMA),
    defaultValues: {
      title: '',
      price: undefined,
      count: undefined,
      description: '',
    },
  })
  const [image, setImage] = useState<File | undefined>()

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
    refImage.current.value = ''
  }

  const onSubmit: SubmitHandler<FormAddProduct> = async (data) => {
    if (data) {
      addPhoto(data, image, queryClient).then(() => {
        removeImage()
        reset()
      })
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
            Remove image
          </Button>
        </>
      )}
      <form id='my-form' onSubmit={handleSubmit(onSubmit)}>
        {fields}
        <Button
          type='submit'
          variant='outlined'
          id='my-form'
          className={styles.button}
        >
          {t(messages.addNewProduct)}
        </Button>
      </form>
    </div>
  )
}

export default AddProduct
