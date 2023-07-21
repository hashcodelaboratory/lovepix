import { Button, Rating, TextField, Typography } from '@mui/material'
import { messages } from 'messages/messages'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export type FormReview = {
  name: string
  email: string
  review: string
  rating: number
}

const AddReview = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState<number | null>(null)
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormReview>({
    //resolver: yupResolver(FORM_SCHEMA),
  })

  const onSubmit: SubmitHandler<FormReview> = async (data) => {
    console.log(data)
  }

  return (
    <div style={{ margin: 'auto', justifyContent: 'center', maxWidth: 350 }}>
      <Typography variant='h5' marginBottom={'20px'}>
        Pridajte vašu recenziu
      </Typography>
      <form id='my-form' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={'name'}
          control={control}
          render={({ field }) => (
            <div>
              <TextField
                placeholder={t(messages.name)}
                id={'name'}
                label={t(messages.name)}
                {...field}
                fullWidth
                {...register('name', { required: true })}
                error={!!errors.name?.message}
                //helperText={String(error ?? '')}
                variant='outlined'
                size='small'
                sx={{
                  backgroundColor: 'white',
                  marginBottom: '10px',
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
        <Controller
          name={'email'}
          control={control}
          render={({ field }) => (
            <div>
              <TextField
                placeholder={t(messages.email)}
                id={'email'}
                label={t(messages.email)}
                {...field}
                {...register('email', { required: true })}
                error={!!errors.email?.message}
                fullWidth
                //helperText={String(error ?? '')}
                variant='outlined'
                size='small'
                sx={{
                  marginBottom: '10px',
                  backgroundColor: 'white',
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
        <div style={{ marginBottom: 10 }}>
          <Rating
            name='simple-controlled'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
          />
        </div>
        <Controller
          name={'review'}
          control={control}
          render={({ field }) => (
            <div>
              <TextField
                placeholder={'Sem napíšte svoju recenziu :)'}
                id={'review'}
                label={'Recenzia'}
                multiline
                fullWidth
                rows={4}
                {...field}
                {...register('review', { required: true })}
                error={!!errors.review?.message}
                //helperText={String(error ?? '')}
                variant='outlined'
                size='small'
                sx={{
                  marginBottom: '10px',
                  backgroundColor: 'white',
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

        <Button
          type='submit'
          variant='outlined'
          id='my-form'
          style={{
            backgroundColor: '#EC1A40',
            outline: 'none',
            color: 'white',
          }}
        >
          Pridať recenziu
        </Button>
      </form>
    </div>
  )
}

export default AddReview
