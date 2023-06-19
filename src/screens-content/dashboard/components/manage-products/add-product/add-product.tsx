import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './add-product.module.scss'
import { FORM_SCHEMA } from './utils'

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
              placeholder={name}
              id={name}
              label={name}
              {...field}
              {...register(name, { required: true })}
              error={!!error}
              helperText={String(error ?? '')}
              variant='outlined'
              size='small'
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
    console.log('fdsafas', data)
  }

  return (
    <div className={styles.addProductContainer}>
      <span className={styles.title}> AddProduct</span>
      <form id='my-form' onSubmit={handleSubmit(onSubmit)}>
        {fields}
        <Button
          type='submit'
          variant='outlined'
          id='my-form'
          className={styles.button}
        >
          Add new product
        </Button>
      </form>
    </div>
  )
}

export default AddProduct
