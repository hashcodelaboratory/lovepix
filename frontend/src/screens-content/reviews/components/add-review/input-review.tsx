import React from 'react'
import { Control, Controller, UseFormRegister, useForm } from 'react-hook-form'
import { FormReview } from './add-review'
import { TextField } from '@mui/material'
import { localizationKey } from 'localization/localization-key'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { FORM_SCHEMA_REVIEW } from '../utils'

type InputProps = {
  name: 'name' | 'email' | 'review'
  label: string
  register: UseFormRegister<FormReview>
  control: any
  errors: any
  placeholder: string
}

const InputReview = ({
  name,
  label,
  register,
  control,
  errors,
  placeholder,
}: InputProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <TextField
              placeholder={t(placeholder)}
              id={name}
              label={t(label)}
              fullWidth
              rows={4}
              {...field}
              {...register(name, { required: true })}
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
    </div>
  )
}

export default InputReview
