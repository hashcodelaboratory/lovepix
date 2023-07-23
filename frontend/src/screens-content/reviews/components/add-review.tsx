import { yupResolver } from '@hookform/resolvers/yup'
import {
  Backdrop,
  Button,
  CircularProgress,
  Rating,
  TextField,
  Typography,
} from '@mui/material'
import { useAddReview } from 'common/api/add-review'
import { REVIEWS_KEY } from 'common/api/use-reviews'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from 'snackbar/config'
import { FORM_SCHEMA_REVIEW } from './utils'
import { localizationKey } from 'localization/localization-key'

export type FormReview = {
  name: string
  email: string
  review: string
}

const AddReview = () => {
  const { t } = useTranslation()
  const [rating, setRating] = useState<number | null>(null)
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormReview>({
    resolver: yupResolver(FORM_SCHEMA_REVIEW),
  })
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate: addReview, isLoading } = useAddReview({
    onSuccess: () => {
      enqueueSnackbar(
        String(t(localizationKey.thankYouForYourReview)),
        SNACKBAR_OPTIONS_SUCCESS
      )
      queryClient.invalidateQueries(REVIEWS_KEY)
      reset()
      setRating(null)
    },
    onError: () => {
      enqueueSnackbar(
        String(t(localizationKey.errorMessageReview)),
        SNACKBAR_OPTIONS_ERROR
      )
      queryClient.invalidateQueries(REVIEWS_KEY)
    },
  })

  const onSubmit: SubmitHandler<FormReview> = async (data) => {
    if (data) {
      await addReview({ data, rating })
    }
  }

  return (
    <div
      style={{
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: 350,
        marginBottom: 20,
      }}
    >
      <Typography variant='h5' marginBottom={'20px'}>
        {String(t(localizationKey.addYourReview))}
      </Typography>
      <form id='my-form' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={'name'}
          control={control}
          render={({ field }) => (
            <div>
              <TextField
                placeholder={String(t(localizationKey.name))}
                id={'name'}
                label={String(t(localizationKey.name))}
                {...field}
                fullWidth
                {...register('name', { required: true })}
                error={!!errors.name?.message}
                helperText={String(errors.name?.message ?? '')}
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
                placeholder={t(localizationKey.email)}
                id={'email'}
                label={t(localizationKey.email)}
                {...field}
                {...register('email', { required: true })}
                error={!!errors.email?.message}
                fullWidth
                helperText={String(errors.email?.message ?? '')}
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
        <div
          style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}
        >
          <span>{t(localizationKey.rating)}:</span>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue)
            }}
          />
        </div>
        <Controller
          name={'review'}
          control={control}
          render={({ field }) => (
            <div>
              <TextField
                placeholder={t(localizationKey.writeYourReviewHere)}
                id={'review'}
                label={'Recenzia'}
                multiline
                fullWidth
                rows={4}
                {...field}
                {...register('review', { required: true })}
                error={!!errors.review?.message}
                helperText={String(errors.review?.message ?? '')}
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
          {t(localizationKey.addReview)}
        </Button>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default AddReview
