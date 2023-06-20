import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { StorageFolder } from 'common/firebase/storage/enums'
import { useTranslation } from 'next-i18next'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './add-product.module.scss'
import { FORM_SCHEMA } from './utils'
import {
  FullMetadata,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@firebase/storage'
import { database, storage } from 'common/firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import { Collections } from 'common/firebase/enums'
import { useQueryClient } from 'react-query'
import { PRODUCT_KEY } from 'common/api/use-products'
import { messages } from 'messages/messages'
import Image from 'next/image'

type FormAddProduct = {
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

  const onSubmit: SubmitHandler<FormAddProduct> = async (data) => {
    if (data) {
      addPhotoOnStorage(data)
    }
  }

  const uploadToStorage = async (file: File) => {
    const _name = `${StorageFolder.PRODUCTS}/${file.name}`
    const imageRef = ref(storage, _name)
    const { metadata } = await uploadBytes(imageRef, file)
    if (metadata) {
      const url = await getDownloadURL(ref(storage, _name))
      return {
        url: url,
        metadata: metadata,
      }
    }
  }

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

  const addPhotoOnStorage = async (data: FormAddProduct) => {
    if (image) {
      const res = await uploadToStorage(image)
      await uploadToFirestore(
        res?.metadata ?? ({} as FullMetadata),
        data,
        res?.url ?? ''
      ).then(() => {
        removeImage()
        reset()
      })
      await queryClient.invalidateQueries(PRODUCT_KEY)
    }
  }

  const uploadToFirestore = async (
    metadata: FullMetadata,
    data: FormAddProduct,
    url: string
  ) => {
    const { name } = metadata
    const docData = {
      title: data.title,
      price: data.price,
      description: data.description,
      count: data.count,
      image: url,
      path: name,
    }
    await setDoc(doc(database, Collections.PRODUCTS, `P${Date.now()}`), docData)
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
